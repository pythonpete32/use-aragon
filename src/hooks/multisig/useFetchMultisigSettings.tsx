import { MultisigVotingSettings } from "@aragon/sdk-client";
import { useQuery } from "react-query";
import { FetchMultisigSettingsResult, FetchMultisigSettingsOptions } from "../../types";
import { useAragonSDKContext } from "../context";

export function useFetchMultisigSettings(
  daoAddressOrEns: string,
  options?: FetchMultisigSettingsOptions,
): FetchMultisigSettingsResult {
  const { client } = useAragonSDKContext();

  const result = useQuery<MultisigVotingSettings>({
    queryKey: ["multisigSettings", daoAddressOrEns],
    queryFn: async () => client?.multisig?.getVotingSettings(daoAddressOrEns),
    enabled: !!client?.multisig,
    onError(err) {
      console.log({ "❌ useGetMultisigSettings()": err });
    },
    ...options,
  });

  return {
    multisigSettings: result.data ?? null,
    ...result,
  };
}
