import { DaoDetails } from "@aragon/sdk-client";
import { useQuery, UseQueryOptions } from "react-query";
import { useAragonSDKContext } from "../..";
import { FetchDaoResult } from "../../types";

export function useFetchDao(
  daoAddressOrEns: string,
  options?: UseQueryOptions<DaoDetails | null, unknown, DaoDetails | null>,
): FetchDaoResult {
  const { baseClient: client } = useAragonSDKContext();

  const result = useQuery<DaoDetails | null>({
    queryKey: ["dao", daoAddressOrEns],
    queryFn: async () => client.methods.getDao(daoAddressOrEns),
    enabled: !!client,
    onError(err) {
      console.log({ "❌ useFetchDao()": err });
    },
    ...options,
  });

  const dao = result?.data ?? null;

  return { ...result, dao };
}
