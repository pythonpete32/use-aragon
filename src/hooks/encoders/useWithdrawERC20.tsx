import { DaoDetails, WithdrawParams } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { useAragonSDKContext } from "../..";
import { Address } from "../../types";

export function useWithdrawERC20(withdrawParams: WithdrawParams, daoAddressOrEns: Address, options?: any): any {
  const { baseClient: client } = useAragonSDKContext();

  const result = useQuery<DaoDetails | null>({
    queryKey: ["withdraw", withdrawParams.recipientAddressOrEns, withdrawParams.amount, withdrawParams.type],
    queryFn: async () => client.encoding.withdrawAction(daoAddressOrEns, withdrawParams),
    enabled: !!client && !!withdrawParams && !!daoAddressOrEns,
    onError(err) {
      console.log({ "❌ useWithdrawERC20()": err });
    },
    ...options,
  });
  return {
    withdrawAction: result.data ?? null,
    ...result,
  };
}
