import { CanVoteParams } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { CanVoteResult, UseCanVoteOptions } from "../../types";
import { useAragonSDKContext } from "../context";

export function useCanVote(voteParams: CanVoteParams, options?: UseCanVoteOptions): CanVoteResult {
  const { tokenVotingClient: client } = useAragonSDKContext();

  const result = useQuery<boolean>({
    queryKey: ["canVote", voteParams],
    queryFn: async () => client?.methods.canVote(voteParams),
    enabled: !!client,
    onError(err) {
      console.log({ "❌ useCanVote()": err });
    },
    ...options,
  });

  return {
    canVote: result.data ?? false,
    ...result,
  };
}
