import { useState } from 'react';
import { useMutation, UseMutationOptions } from 'react-query';
import { CreateMajorityVotingProposalParams, ProposalMetadata } from '@aragon/sdk-client';

import { useAragon } from '../../context';
import { NewProposalStatus } from './types';

export function useNewProposal(
  proposalMetadata: ProposalMetadata,
  proposalParams: Omit<CreateMajorityVotingProposalParams, 'metadataUri'>,
  options?: UseMutationOptions
) {
  // 0. Hooks state
  const [proposalId, setProposalId] = useState<string | null>(null);
  const [proposalTxHash, setProposalTxHash] = useState<string | null>(null);
  const [proposalStatus, setProposalStatus] = useState<NewProposalStatus>(NewProposalStatus.IDLE);
  const { tokenVotingClient: client } = useAragon();

  // 1. Async function to create a proposal
  const createProposal = async () => {
    try {
      // 1.1. Set proposal status to PINNING_METADATA
      setProposalStatus(NewProposalStatus.PINNING_METADATA);
      const metadataUri = await client?.methods.pinMetadata(proposalMetadata);
      console.log('metadataUri', metadataUri);

      // 1.3. Get the proposal creation iterator
      const steps = client?.methods.createProposal({ ...proposalParams, metadataUri });

      // 1.3.1. Set the txHash
      setProposalTxHash((await steps?.next()).value.txHash);
      setProposalStatus(NewProposalStatus.CREATING_PROPOSAL);

      // 1.3.2. Set the proposalId
      setProposalId((await steps?.next()).value.proposalId);
      setProposalStatus(NewProposalStatus.SUCCESS);
    } catch (err) {
      // 1.3.3. Catch the error if thrown
      setProposalStatus(NewProposalStatus.ERROR);
      console.error(err);
    }
  };

  // 2. Return the proposalId, proposalTxHash, proposalStatus and the mutation
  return {
    proposalId,
    proposalTxHash,
    proposalStatus,
    ...useMutation({
      mutationKey: ['newProposal', proposalParams, proposalMetadata],
      mutationFn: createProposal,
      ...options,
    }),
  };
}
