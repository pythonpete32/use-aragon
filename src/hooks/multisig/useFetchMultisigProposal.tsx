import { MultisigProposal } from "@aragon/sdk-client";
import { useQuery, UseQueryOptions } from "react-query";
import { BaseQueryResultData } from "../../types";
import { useAragonSDKContext } from "../context";

export function useFetchMultisigProposal(
  proposalId: string,
  options?: MultisigProposalOptions,
): MultisigProposalResult {
  const { multisigClient } = useAragonSDKContext();

  const result = useQuery<MultisigProposal | null>({
    queryKey: ["multisigProposal", proposalId],
    queryFn: async () => multisigClient?.methods.getProposal(proposalId) ?? null,
    enabled: !!multisigClient,
    onError(err) {
      console.log({ "❌ useMultisigProposal()": err });
    },
    ...options,
  });

  return {
    proposal: result.data ?? null,
    ...result,
  };
}

export interface MultisigProposalOptions extends UseQueryOptions<MultisigProposal | null, unknown> {}

export interface MultisigProposalResult extends BaseQueryResultData<MultisigProposal | null> {
  proposal: MultisigProposal | null;
}
