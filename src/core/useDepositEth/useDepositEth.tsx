import { Client } from '@aragon/sdk-client';
import { DepositParams } from '@aragon/sdk-client';
import { useState } from 'react';
import { useMutation, UseMutationOptions } from 'react-query';

import { useAragon } from '../../context';
import { DepositEthStatus } from './types';

export function useDepositEth(depositParams: DepositParams, options?: UseMutationOptions) {
  const [depositTxid, setDepositTxid] = useState<string | null>(null);
  const [depositStatus, setDepositStatus] = useState<DepositEthStatus>(DepositEthStatus.IDLE);

  const { baseClient: client } = useAragon();

  const deposit = async (client: Client, depositParams: DepositParams) => {
    try {
      const steps = client.methods.deposit(depositParams);
      setDepositStatus(DepositEthStatus.WAITING_FOR_SIGNER);

      setDepositTxid((await steps?.next()).value.txHash);
      setDepositStatus(DepositEthStatus.CONFIRMING);

      await steps?.next();
      setDepositStatus(DepositEthStatus.SUCCESS);
    } catch (err) {
      setDepositStatus(DepositEthStatus.ERROR);
      console.error(err);
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
