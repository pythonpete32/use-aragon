import { VotingSettings } from "@aragon/sdk-client";
import { useQuery, UseQueryOptions } from "react-query";
import { Address } from "wagmi";
import { useAragonSDKContext } from "..";
import { UseFetchVoteSettingsResult } from "../../types";

export type FetchVoteSettingsOptions = UseQueryOptions<VotingSettings | null, unknown>;

export function useFetchVoteSettings(
  pluginAddress: Address,
  queryOptions?: FetchVoteSettingsOptions,
): UseFetchVoteSettingsResult {
  const { voting } = useAragonSDKContext();

  const result = useQuery<VotingSettings | null, unknown>({
    queryKey: ["vote-settings", pluginAddress],
    queryFn: async () => voting?.getVotingSettings(pluginAddress) ?? null,
    enabled: !!voting,
    onError: (err) => {
      console.log({ "❌ useFetchVoteSettings()": err });
    },
    ...queryOptions,
  });

  return { voteSettings: result.data ?? null, ...result };
}
