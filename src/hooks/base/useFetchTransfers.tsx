import {
  ITransferQueryParams as FetchTransferParams,
  Transfer,
  TransferSortBy,
  SortDirection,
  TransferType,
} from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { FetchTransferOptions, FetchTransfersResult } from "../../types";
import { useAragonSDKContext } from "../context";

export function useFetchTransfers(
  queryParams: FetchTransferParams = {},
  options?: FetchTransferOptions,
): FetchTransfersResult {
  const { baseClient: client } = useAragonSDKContext();

  const result = useQuery<Transfer[] | null>({
    queryKey: ["daoTransfers", queryParams.daoAddressOrEns],
    queryFn: async () =>
      client.methods.getDaoTransfers({
        daoAddressOrEns: "",
        sortBy: TransferSortBy.CREATED_AT, // optional
        limit: 10, // optional
        skip: 0, // optional
        direction: SortDirection.ASC, // optional
        type: TransferType.DEPOSIT, // optional
        ...queryParams,
      }),
    enabled: !!client && !!queryParams.daoAddressOrEns,
    onError(err) {
      console.log({ "❌ useFetchDaos()": err });
    },
    ...options,
  });

  const transfers = result?.data ?? null;
  return { ...result, transfers };
}
