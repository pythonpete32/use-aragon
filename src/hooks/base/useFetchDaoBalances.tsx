import { AssetBalance, SortDirection } from "@aragon/sdk-client";
import { DaoBalancesQueryParams } from "@aragon/sdk-client/dist/interfaces";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";
import { FetchDaoBalancesResult } from "../../types";
import { useAragonSDKContext } from "../context";

export function useFetchDaoBalances(
  queryParams: DaoBalancesQueryParams = {},
  options?: UseQueryOptions<AssetBalance[] | null, unknown, AssetBalance[] | null, QueryKey>,
): FetchDaoBalancesResult {
  const { baseClient: client } = useAragonSDKContext();

  const result = useQuery<AssetBalance[] | null>({
    queryKey: ["daoBalance", queryParams],
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

  const daoBalances = result?.data ?? null;
  return { ...result, daoBalances };
}
