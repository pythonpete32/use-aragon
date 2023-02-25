import { DaoListItem, IDaoQueryParams, SortDirection } from "@aragon/sdk-client";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";
import { useAragonSDKContext } from "../..";
import { FetchDaosResult } from "../../types";

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
