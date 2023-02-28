import { AssetBalance, SortDirection } from "@aragon/sdk-client";
import { DaoBalancesQueryParams } from "@aragon/sdk-client/dist/interfaces";
import { useQuery } from "react-query";
import { FetchDaoBalancesResult, FetchDaoBalancesOptions } from "../../types";
import { useAragonSDKContext } from "../context";

export function useFetchDaoBalances(
  queryParams: DaoBalancesQueryParams = {},
  options?: FetchDaoBalancesOptions,
): FetchDaoBalancesResult {
  const { baseClient: client } = useAragonSDKContext();

  const result = useQuery<AssetBalance[] | null>({
    queryKey: ["daoBalance", queryParams.daoAddressOrEns],
    queryFn: async () =>
      client.methods.getDaoBalances({
        daoAddressOrEns: "",
        skip: 0,
        limit: 10,
        direction: SortDirection.ASC,
        ...queryParams,
      }),
    enabled: !!client && !!queryParams.daoAddressOrEns,
    onError(err) {
      console.log({ "❌ useFetchDaoBalances()": err });
    },
    ...options,
  });

  return { daoBalances: result?.data ?? null, ...result };
}
