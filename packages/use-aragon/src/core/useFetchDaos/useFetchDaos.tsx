import { DaoDetails, IDaoQueryParams, SortDirection } from '@aragon/sdk-client';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { useAragon } from '../../context';

export function useFetchDaos(
  queryParams?: IDaoQueryParams,
  options?: UseQueryOptions<DaoDetails[] | null, unknown, DaoDetails[] | null, QueryKey>
) {
  const { baseClient: client } = useAragon();

  return useQuery<DaoDetails[] | null>({
    queryKey: ['dao', queryParams],
    queryFn: async () =>
      client?.methods.getDaos({
        skip: 0,
        limit: 10,
        direction: SortDirection.ASC,
        ...queryParams,
      }),
    enabled: !!client,
    cacheTime: 100000,
    refetchOnReconnect: false,
    ...options,
  });
}
