import { Erc20TokenDetails } from '@aragon/sdk-client';
import { Erc721TokenDetails } from '@aragon/sdk-client/dist/tokenVoting/interfaces';

import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { useAragon } from '../../context';

export function useFetchVotingToken(
  pluginAddress?: string | undefined,
  options?: UseQueryOptions<
    Erc20TokenDetails | Erc721TokenDetails | null,
    unknown,
    Erc20TokenDetails | Erc721TokenDetails | null,
    QueryKey
  >
) {
  const { tokenVotingClient: client } = useAragon();

  return useQuery<Erc20TokenDetails | Erc721TokenDetails | null>({
    queryKey: ['votingToken', pluginAddress],
    queryFn: async () => client.methods.getToken(pluginAddress),
    enabled: !!client && !!pluginAddress,
    ...options,
  });
}
