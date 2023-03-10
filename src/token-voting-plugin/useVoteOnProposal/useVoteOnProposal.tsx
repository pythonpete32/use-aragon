import { useState } from 'react';
import { useMutation, UseMutationOptions } from 'react-query';
import { IVoteProposalParams } from '@aragon/sdk-client';

import { useAragon } from '../../context';
import { VoteStatus } from './types';

export function useVoteOnProposal(voteParams: IVoteProposalParams, options?: UseMutationOptions) {
  const [voteTxHash, setVoteTxHash] = useState<string | null>(null);
  const [voteStatus, setVoteStatus] = useState<VoteStatus>(VoteStatus.IDLE);
  const { tokenVotingClient: client } = useAragon();

  const vote = async () => {
    try {
      setVoteStatus(VoteStatus.WAITING_FOR_SIGNATURE);
      const steps = client?.methods.voteProposal(voteParams);

      setVoteTxHash((await steps?.next()).value.txHash);
      setVoteStatus(VoteStatus.CONFIRMING_TRANSACTION);

      console.log((await steps?.next()).value);
      setVoteStatus(VoteStatus.SUCCESS);
    } catch (err) {
      setVoteStatus(VoteStatus.ERROR);
      console.error(err);
    }
  };

  return {
    voteTxHash,
    voteStatus,
    ...useMutation({
      mutationKey: ['vote', voteParams],
      mutationFn: vote,
      ...options,
    }),
  };
}
