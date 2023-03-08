import { DaoDetails } from '@aragon/sdk-client';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';
import { useAragon } from '../..';

export function useFetchDao(
  daoAddressOrEns?: string | undefined,
  options?: UseQueryOptions<DaoDetails | null, unknown, DaoDetails | null, QueryKey>
) {
  const { baseClient: client } = useAragon();

  return useQuery<DaoDetails | null>({
    queryKey: ['dao', daoAddressOrEns],
    queryFn: async () => client.methods.getDao(daoAddressOrEns),
    enabled: !!client && !!daoAddressOrEns,
    refetchOnReconnect: true,
    ...options,
  });
}
