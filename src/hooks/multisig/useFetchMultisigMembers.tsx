import { useQuery, UseQueryOptions } from "react-query";
import { useAragonSDKContext } from "..";
import { BaseQueryResultData } from "../../types";

export function useFetchMultisigMembers(
  daoAddressOrEns: string,
  options?: MultisigMembersOptions,
): MultisigMembersResult {
  const { multisigClient } = useAragonSDKContext();

  const result = useQuery<string[]>({
    queryKey: ["multisigMembers", daoAddressOrEns],
    queryFn: async () => multisigClient?.methods.getMembers(daoAddressOrEns) ?? [],
    enabled: !!multisigClient,
    onError(err) {
      console.log({ "❌ useMultisigMembers()": err });
    },
    ...options,
  });

  return {
    members: result.data ?? [],
    ...result,
  };
}

export interface MultisigMembersOptions extends UseQueryOptions<string[], unknown> {}

export interface MultisigMembersResult extends BaseQueryResultData<string[]> {
  members: string[];
}
