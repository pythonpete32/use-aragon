import { GasFeeEstimation } from "@aragon/sdk-client";
import { DepositEthParams } from "@aragon/sdk-client/dist/interfaces";
import { QueryKey, useQuery, UseQueryOptions } from "react-query";
import { EstimateDepositEthResult } from "../../types";
import { useAragonSDKContext } from "../context";

export function useEstimateDepositEth(
  depositParams: DepositEthParams,
  options?: UseQueryOptions<GasFeeEstimation | null, unknown, GasFeeEstimation | null, QueryKey>,
): EstimateDepositEthResult {
  const { baseClient: client } = useAragonSDKContext();

  const result = useQuery<GasFeeEstimation | null>({
    queryKey: ["estimateDepositEth", depositParams.daoAddressOrEns],
    queryFn: async () => client.estimation.deposit(depositParams),
    enabled: !!client && !!depositParams.daoAddressOrEns,
    onError(err) {
      console.log({ "❌ useEstimateDepositEth()": err });
    },
    ...options,
  });

  const estimatedGas = result?.data ?? null;
  return { ...result, estimatedGas };
}
