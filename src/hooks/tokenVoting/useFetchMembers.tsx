import { useQuery } from "react-query";
import { FetchMembersOptions, FetchMembersResult, Address } from "../../types";
import { useAragonSDKContext } from "../context";

export function useFetchMembers(daoAddressOrEns: Address, options: FetchMembersOptions): FetchMembersResult {
  const { tokenVotingClient: client } = useAragonSDKContext();

  const result = useQuery<string[]>({
    queryKey: ["members", daoAddressOrEns],
    queryFn: async () => client?.methods.getMembers(daoAddressOrEns),
    enabled: !!client,
    onError(err) {
      console.log({ "❌ useFetchMembers()": err });
    },
    ...options,
  });

  return { members: result.data ?? [], ...result };
}
