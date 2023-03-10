import { useState } from 'react';
import { useMutation, UseMutationOptions } from 'react-query';

import { useAragon } from '../../context';
import { NewDaoParams, NewDaoStatus } from './types';

export function useNewDao(newDaoParams: NewDaoParams, options?: UseMutationOptions) {
  // State
  const [daoAddress, setDaoAddress] = useState<string | null>(null);
  const [daoTxHash, setDaoTxHash] = useState<string | null>(null);
  const [creationStatus, setCreationStatus] = useState<NewDaoStatus>(NewDaoStatus.IDLE);
  const { baseClient: client } = useAragon();

  // Async function to create dao
  const createDao = async () => {
    try {
      // Update the creation status and pin metadata
      setCreationStatus(NewDaoStatus.PINNING_METADATA);
      const metadataUri = await client?.methods.pinMetadata(newDaoParams.daoMetadata);

      // Get the dao creation iterator
      const steps = client?.methods.createDao({ metadataUri, ...newDaoParams });

      // Set the txHash and update creation status
      setDaoTxHash((await steps.next()).value.txHash);
      setCreationStatus(NewDaoStatus.CREATING_DAO);

      // Set the daoAddress and update creation status
      setDaoAddress((await steps.next()).value.address);
      setCreationStatus(NewDaoStatus.SUCCESS);
    } catch (err) {
      setCreationStatus(NewDaoStatus.ERROR);
      console.error(err);
    }
  };

  return {
    // State variables
    daoAddress,
    daoTxHash,
    creationStatus,
    // pass the async function to useMutation and spread the mutation & options
    ...useMutation({
      mutationKey: ['newDao', newDaoParams],
      mutationFn: createDao,
      ...options,
    }),
  };
}
