import { useQuery } from "react-query";
import { useAragonSDKContext } from "..";
import { FetchTokenOptions, TokenDetails, UseFetchTokenResult, Address } from "../../types";

export function useFetchToken(pluginAddress: Address, queryOptions?: FetchTokenOptions): UseFetchTokenResult {
  const { client } = useAragonSDKContext();

  const result = useQuery<TokenDetails | null, unknown>({
    queryKey: ["token", pluginAddress],
    queryFn: async () => client?.methods.getToken(pluginAddress) ?? null,
    enabled: !!client,
    onError: (err) => {
      console.log({ "❌ useFetchToken()": err });
    },
    ...queryOptions,
  });

  return { token: result.data ?? null, ...result };
}
