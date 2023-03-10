import { useReducer } from 'react';
import { useMutation, UseMutationOptions } from 'react-query';
import { DaoCreationSteps } from '@aragon/sdk-client';

import { useAragon } from '../../context';
import { NewDaoState, NewDaoParams, NewDaoStatus } from './types';

const initialState: NewDaoState = {
  daoAddress: null,
  daoTxHash: null,
  creationStatus: NewDaoStatus.IDLE,
};

export function useNewDao(newDaoParams: NewDaoParams, options?: UseMutationOptions) {
  const { baseClient: client } = useAragon();
  const [state, dispatch] = useReducer((state: NewDaoState, update: Partial<NewDaoState>) => {
    return { ...state, ...update };
  }, initialState);

  const createDao = async () => {
    dispatch({ creationStatus: NewDaoStatus.PINNING_METADATA });
    const metadataUri = await client?.methods.pinMetadata(newDaoParams.daoMetadata)!;

    for await (const step of client?.methods?.createDao({ metadataUri, ...newDaoParams })!) {
      try {
        switch (step.key) {
          case DaoCreationSteps.CREATING:
            dispatch({
              daoTxHash: step.txHash,
              creationStatus: NewDaoStatus.CREATING_DAO,
            });
            break;
          case DaoCreationSteps.DONE:
            dispatch({ creationStatus: NewDaoStatus.SUCCESS, daoAddress: step.address });
            break;
        }
      } catch (err) {
        dispatch({ creationStatus: NewDaoStatus.ERROR });
        console.error(err);
      }
    }
  };

  return {
    ...state,
    ...useMutation({
      mutationKey: ['newDao', newDaoParams],
      mutationFn: createDao,
      ...options,
    }),
  };
}
