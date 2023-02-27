import { DaoDetails, IGrantPermissionParams } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { useAragonSDKContext } from "../..";
import { Address } from "../../types";

export function useGrantPermission(daoAddressOrEns: Address, grantParams: IGrantPermissionParams, options?: any): any {
  const { baseClient: client } = useAragonSDKContext();

  const result = useQuery<DaoDetails | null>({
    queryKey: ["grant", daoAddressOrEns, grantParams.permission, grantParams.who, grantParams.where],
    queryFn: async () => client.encoding.grantAction(daoAddressOrEns, grantParams),
    enabled: !!client && !!daoAddressOrEns && !!grantParams,
    onError(err) {
      console.log({ "❌ useGrantPermission()": err });
    },
    ...options,
  });
  return {
    grantAction: result.data ?? null,
    ...result,
  };
}
