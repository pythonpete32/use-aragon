import { GasFeeEstimation } from "@aragon/sdk-client";
import { DepositEthParams } from "@aragon/sdk-client/dist/interfaces";
import { useQuery } from "react-query";
import { EstimateDepositEthOptions, EstimateDepositEthResult } from "../../types";
import { useAragonSDKContext } from "../context";

export function useEstimateDepositEth(
  depositParams: DepositEthParams,
  options?: EstimateDepositEthOptions,
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

  return { estimatedGas: result?.data ?? null, ...result };
}
