import { DaoListItem, IDaoQueryParams, SortDirection } from "@aragon/sdk-client";
import { QueryKey, useQuery, UseQueryOptions, UseQueryResult } from "react-query";

import { useAragonSDKContext } from "../..";

interface FetchDaosResult extends Omit<UseQueryResult<DaoListItem[], unknown>, "data"> {
  daos: DaoListItem[];
}

export function useFetchDaos(
  queryParams?: IDaoQueryParams,
  options?: UseQueryOptions<DaoListItem[], unknown, DaoListItem[], QueryKey>,
): FetchDaosResult {
  const { baseClient: client } = useAragonSDKContext();

  const result = useQuery<DaoListItem[]>({
    queryKey: ["daos", queryParams],
    queryFn: async () =>
      client?.methods.getDaos({
        skip: 0,
        limit: 10,
        direction: SortDirection.ASC,
        // sortBy: DaoSortBy.POPULARITY,
        ...queryParams,
      }),
    enabled: !!client,
    onError(err) {
      console.log({ "❌ useFetchDaos()": err });
    },
    ...options,
  });

  const daos = result?.data ?? [];

  return { ...result, daos };
}
