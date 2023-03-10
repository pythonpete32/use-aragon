import { TokenVotingProposal } from '@aragon/sdk-client';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { useAragon } from '../../context';

export function useFetchProposal(
  proposalId?: string | undefined,
  options?: UseQueryOptions<
    TokenVotingProposal | null,
    unknown,
    TokenVotingProposal | null,
    QueryKey
  >
) {
  const { tokenVotingClient: client } = useAragon();

  return useQuery<TokenVotingProposal | null>({
    queryKey: ['proposal', proposalId],
    queryFn: async () => client.methods.getProposal(proposalId),
    enabled: !!client && !!proposalId,
    ...options,
  });
}
