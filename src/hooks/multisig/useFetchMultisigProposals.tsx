import { IProposalQueryParams, MultisigProposalListItem } from "@aragon/sdk-client";
import { useQuery, UseQueryOptions } from "react-query";
import { BaseQueryResultData } from "../../types";
import { useAragonSDKContext } from "../context";

export function useFetchMultisigProposals(
  queryParams: IProposalQueryParams,
  options?: UseQueryOptions<MultisigProposalListItem[]>,
): MultisigProposalsResult {
  const { multisigClient } = useAragonSDKContext();

  const result = useQuery<MultisigProposalListItem[], unknown>({
    queryKey: ["multisigProposals", queryParams],
    queryFn: async () => multisigClient?.methods.getProposals(queryParams) ?? [],
    enabled: !!multisigClient,
    onError(err) {
      console.log({ "❌ useMultisigProposals()": err });
    },
    ...options,
  });

  return {
    proposals: result.data ?? [],
    ...result,
  };
}

export interface UseMultisigProposalsOptions extends UseQueryOptions<MultisigProposalListItem[]> {}

export interface MultisigProposalsResult extends BaseQueryResultData<MultisigProposalListItem[]> {
  proposals: MultisigProposalListItem[];
}
