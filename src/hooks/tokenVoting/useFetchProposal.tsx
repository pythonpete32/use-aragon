import { TokenVotingProposal } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { FetchProposalsOption, FetchProposalResult } from "../../types";
import { useAragonSDKContext } from "../context";

export function useFetchProposal(proposalId: string, queryOptions?: FetchProposalsOption): FetchProposalResult {
  const { tokenVotingClient: client } = useAragonSDKContext();

  const result = useQuery<TokenVotingProposal | null>({
    queryKey: ["proposals", proposalId],
    queryFn: async () => client?.methods.getProposal(proposalId) ?? null,
    enabled: !!client,
    onError: (err) => {
      console.log({ "❌ useFetchProposal()": err });
    },
    ...queryOptions,
  });

  return { proposal: result.data ?? null, ...result };
}
