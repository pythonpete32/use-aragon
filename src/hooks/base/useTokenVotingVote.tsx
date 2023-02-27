/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-floating-promises */

import { IVoteProposalParams, VoteProposalStep } from "@aragon/sdk-client";
import { useState } from "react";
import { useMutation } from "react-query";
import { useAragonSDKContext } from "../context";

export function useTokenVotingVote(voteParams: IVoteProposalParams, options?: any): any {
  const { baseClient: client } = useAragonSDKContext();
  const [txHash, setTxHash] = useState(null);

  const vote = async () => {
    const steps = client.methods.voteProposal(voteParams);
    for await (const step of steps) {
      switch (step.key) {
        case VoteProposalStep.VOTING:
          setTxHash(step.txHash);
          break;
        case VoteProposalStep.DONE:
      }
    }
  };

  const result = useMutation({
    mutationKey: ["vote", voteParams.proposalId],
    mutationFn: vote,
    onError(err) {
      console.log({ "❌ useTokenVotingVote()": err });
    },
    ...options,
  });

  return {
    vote: result.mutate,
    voteAsync: result.mutateAsync,
    txHash,
    ...result,
  };
}
