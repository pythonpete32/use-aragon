import { VotingSettings } from '@aragon/sdk-client';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { useAragon } from '../../context';

export function useFetchVotingSettings(
  pluginAddress?: string | undefined,
  options?: UseQueryOptions<VotingSettings | null, unknown, VotingSettings | null, QueryKey>
) {
  const { tokenVotingClient: client } = useAragon();

  return useQuery<VotingSettings | null>({
    queryKey: ['daoSettings', pluginAddress],
    queryFn: async () => client.methods.getVotingSettings(pluginAddress),
    enabled: !!client && !!pluginAddress,
    ...options,
  });
}
