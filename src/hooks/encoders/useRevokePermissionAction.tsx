import { DaoDetails, IRevokePermissionParams } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { useAragonSDKContext } from "../..";
import { Address } from "../../types";

export function useRevokePermission(
  daoAddressOrEns: Address,
  revokeParams: IRevokePermissionParams,
  options?: any,
): any {
  const { baseClient: client } = useAragonSDKContext();

  const result = useQuery<DaoDetails | null>({
    queryKey: ["revoke", daoAddressOrEns, revokeParams.permission, revokeParams.who, revokeParams.where],
    queryFn: async () => client.encoding.grantAction(daoAddressOrEns, revokeParams),
    enabled: !!client && !!daoAddressOrEns && !!revokeParams,
    onError(err) {
      console.log({ "❌ useRevokePermission()": err });
    },
    ...options,
  });
  return {
    revokeAction: result.data ?? null,
    ...result,
  };
}
