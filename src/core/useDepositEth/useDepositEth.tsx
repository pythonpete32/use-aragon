import { useState } from 'react';
import { Client } from '@aragon/sdk-client';
import { DaoDepositSteps, DepositEthParams } from '@aragon/sdk-client/dist/interfaces';
import { useMutation, UseMutationOptions } from 'react-query';

import { useAragon } from '../../context';

enum DepositEthStatus {
  IDLE = 'idle',
  DEPOSITING = 'depositing',
  CONFIRMING = 'confirming',
  SUCCESS = 'success',
  ERROR = 'error',
}

export function useDepositEth(
  depositParams: DepositEthParams,
  options?: UseMutationOptions<unknown, unknown, void, unknown>
) {
  const { baseClient: client } = useAragon();
  const [depositTxid, setDepositTxid] = useState<string | null>(null);
  const [depositStatus, setDepositStatus] = useState<DepositEthStatus>(DepositEthStatus.IDLE);

  const deposit = async (client: Client, depositParams: DepositEthParams) => {
    const steps = client.methods.deposit(depositParams);
    setDepositStatus(DepositEthStatus.DEPOSITING);
    for await (const step of steps) {
      try {
        switch (step.key) {
          case DaoDepositSteps.DEPOSITING:
            console.log({ depositStatus, step });
            setDepositTxid(step.txHash);
            setDepositStatus(DepositEthStatus.CONFIRMING);
            console.log(step.txHash);
            break;
          case DaoDepositSteps.DONE:
            setDepositStatus(DepositEthStatus.SUCCESS);
            console.log({ depositStatus, step });
            break;
        }
      } catch (err) {
        setDepositStatus(DepositEthStatus.ERROR);
        console.error(err);
      }
    }
  };

  return {
    depositTxid,
    depositStatus,
    ...useMutation({
      mutationKey: ['depositEth', depositParams.daoAddressOrEns],
      mutationFn: async () => await deposit(client, depositParams),
      ...options,
    }),
  };
}
