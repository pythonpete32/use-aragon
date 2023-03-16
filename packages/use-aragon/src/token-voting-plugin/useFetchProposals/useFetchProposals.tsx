import { IProposalQueryParams, TokenVotingProposalListItem } from '@aragon/sdk-client';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { useAragon } from '../../context';

export function useFetchProposals(
  queryParams?: IProposalQueryParams,
  options?: UseQueryOptions<
    TokenVotingProposalListItem[] | null,
    unknown,
    TokenVotingProposalListItem[] | null,
    QueryKey
  >
) {
  const { tokenVotingClient: client } = useAragon();

  return useQuery<TokenVotingProposalListItem[] | null>({
    queryKey: ['proposals', queryParams],
    queryFn: async () => client?.methods.getProposals({ ...queryParams }),
    enabled: !!client,
    ...options,
  });
}
