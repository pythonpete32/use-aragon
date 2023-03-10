import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { useAragon } from '../../context';

export function useFetchMembers(
  pluginAddress?: string | undefined,
  options?: UseQueryOptions<string[] | null, unknown, string[] | null, QueryKey>
) {
  const { tokenVotingClient: client, context } = useAragon();

  return useQuery<string[] | null>({
    queryKey: ['dao', pluginAddress],
    queryFn: async () => client.methods.getMembers(pluginAddress),
    enabled: !!client && !!pluginAddress,
    refetchOnReconnect: true,
    onError: error => {
      console.error({ error, context });
    },
    ...options,
  });
}
