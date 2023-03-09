import { useReducer } from 'react';
import { Client } from '@aragon/sdk-client';
import { DaoDepositSteps, DepositParams } from '@aragon/sdk-client';
import { useMutation, UseMutationOptions } from 'react-query';

import { useAragon } from '../../context';

export enum DepositERC20Status {
  IDLE = 'idle',
  DEPOSITING = 'depositing',
  CHECKING_ALLOWANCE = 'checkingAllowance',
  CONFIRMING_ALLOWANCE_UPDATE = 'confirmingAllowanceUpdate',
  CONFIRMING_DEPOSIT = 'confirmingDeposit',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface DepositERC20State {
  allowance: bigint | null;
  updateAllowanceTxid: string | null;
  depositTxid: string | null;
  depositStatus: DepositERC20Status;
}

const initialState: DepositERC20State = {
  allowance: null,
  updateAllowanceTxid: null,
  depositTxid: null,
  depositStatus: DepositERC20Status.IDLE,
};

function reducer(state: DepositERC20State, update: Partial<DepositERC20State>) {
  return { ...state, ...update };
}

export function useDepositERC20(depositParams: DepositParams, options?: UseMutationOptions) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { baseClient: client } = useAragon();

  const deposit = async (client: Client, depositParams: DepositParams) => {
    const steps = client.methods.deposit(depositParams);
    dispatch({ depositStatus: DepositERC20Status.DEPOSITING });
    for await (const step of steps) {
      try {
        switch (step.key) {
          case DaoDepositSteps.CHECKED_ALLOWANCE:
            dispatch({
              allowance: step.allowance,
              depositStatus: DepositERC20Status.CHECKING_ALLOWANCE,
            });
            // console.log({ state, step });
            break;
          case DaoDepositSteps.UPDATING_ALLOWANCE:
            dispatch({
              depositTxid: step.txHash,
              depositStatus: DepositERC20Status.CONFIRMING_ALLOWANCE_UPDATE,
            });
            // console.log({ state, step });
            break;
          case DaoDepositSteps.UPDATED_ALLOWANCE:
            dispatch({
              allowance: step.allowance,
            });
            // console.log({ state, step });
            break;
          case DaoDepositSteps.DEPOSITING:
            dispatch({
              depositTxid: step.txHash,
              depositStatus: DepositERC20Status.CONFIRMING_DEPOSIT,
            });
            // console.log({ state, step });
            break;
          case DaoDepositSteps.DONE:
            dispatch({ depositStatus: DepositERC20Status.SUCCESS });
            // console.log({ state, step });
            break;
        }
      } catch (err) {
        dispatch({ depositStatus: DepositERC20Status.ERROR });
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
