import { DaoDetails } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { useAragonSDKContext } from "../..";
import { Address, FetchDaoResult, FetchDaoOptions } from "../../types";

export function useFetchDao(daoAddressOrEns: Address, options?: FetchDaoOptions): FetchDaoResult {
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
  return {
    dao: result.data ?? null,
    ...result,
  };
}
