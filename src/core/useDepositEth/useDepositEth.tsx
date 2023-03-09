import { Client } from '@aragon/sdk-client';
import { DaoDepositSteps, DepositEthParams } from '@aragon/sdk-client/dist/interfaces';
import { useReducer } from 'react';
import { useMutation, UseMutationOptions } from 'react-query';

import { useAragon } from '../../context';

export enum DepositEthStatus {
  IDLE = 'idle',
  DEPOSITING = 'depositing',
  CONFIRMING = 'confirming',
  SUCCESS = 'success',
  ERROR = 'error',
}

const initialState: DepositState = {
  depositTxid: null,
  depositStatus: DepositEthStatus.IDLE,
};

interface DepositState {
  depositTxid: string | null;
  depositStatus: DepositEthStatus;
}

function reducer(state: DepositState, update: Partial<DepositState>) {
  return { ...state, ...update };
}

export function useDepositEth(depositParams: DepositEthParams, options?: UseMutationOptions) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { baseClient: client } = useAragon();

  const deposit = async (client: Client, depositParams: DepositEthParams) => {
    const steps = client.methods.deposit(depositParams);
    dispatch({ depositStatus: DepositEthStatus.DEPOSITING });
    for await (const step of steps) {
      try {
        switch (step.key) {
          case DaoDepositSteps.DEPOSITING:
            dispatch({ depositTxid: step.txHash, depositStatus: DepositEthStatus.CONFIRMING });
            // console.log({ state, step });
            break;
          case DaoDepositSteps.DONE:
            dispatch({ depositStatus: DepositEthStatus.SUCCESS });
            // console.log({ state, step });
            break;
        }
      } catch (err) {
        dispatch({ depositStatus: DepositEthStatus.ERROR });
        console.error(err);
      }
    }
  };

  return {
    ...state,
    ...useMutation({
      mutationKey: ['depositEth', depositParams.daoAddressOrEns],
      mutationFn: async () => await deposit(client, depositParams),
      ...options,
    }),
  };
}
