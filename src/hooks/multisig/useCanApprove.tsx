import { CanApproveParams } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { CanApproveResult, UseCanApproveOptions } from "../../types";
import { useAragonSDKContext } from "../context";

export function useCanApprove(approveParams: CanApproveParams, options?: UseCanApproveOptions): CanApproveResult {
  const { client } = useAragonSDKContext();

  const result = useQuery<boolean>({
    queryKey: ["canApprove", approveParams],
    queryFn: async () => client?.methods.canApprove(approveParams),
    enabled: !!client,
    onError(err) {
      console.log({ "❌ useCanApprove()": err });
    },
    ...options,
  });

  return {
    canApprove: result.data ?? false,
    ...result,
  };
}
