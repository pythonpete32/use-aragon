import { CanVoteParams } from '@aragon/sdk-client';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { useAragon } from '../../context';

export function useCanVote(
  canVoteParams?: CanVoteParams,
  options?: UseQueryOptions<boolean | null, unknown, boolean | null, QueryKey>
) {
  const { tokenVotingClient: client } = useAragon();

  return useQuery<boolean | null>({
    queryKey: ['canVote', canVoteParams],
    queryFn: async () => client.methods.canVote(canVoteParams),
    enabled: !!client && !!canVoteParams,
    ...options,
  });
}
