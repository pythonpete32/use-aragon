import { IProposalQueryParams, TokenVotingProposalListItem } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { FetchProposalsOptions, FetchProposalsResult } from "../../types";
import { useAragonSDKContext } from "../context";

export function useFetchProposals(
  queryParams: IProposalQueryParams,
  queryOptions?: FetchProposalsOptions,
): FetchProposalsResult {
  const { tokenVotingClient: client } = useAragonSDKContext();

  const result = useQuery<TokenVotingProposalListItem[]>({
    queryKey: ["proposals"],
    queryFn: async () => client?.methods.getProposals(queryParams) ?? [],
    enabled: !!client,
    onError: (err) => {
      console.log({ "❌ useFetchProposals()": err });
    },
    ...queryOptions,
  });

  return { proposals: result.data ?? [], ...result };
}
