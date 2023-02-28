import { DaoListItem, IDaoQueryParams, SortDirection } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { useAragonSDKContext } from "../..";
import { FetchDaosResult, FetchDaosOptions } from "../../types";

export function useFetchDaos(queryParams?: IDaoQueryParams, options?: FetchDaosOptions): FetchDaosResult {
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
