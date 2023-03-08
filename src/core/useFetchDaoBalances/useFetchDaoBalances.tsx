import { AssetBalance, SortDirection } from '@aragon/sdk-client';
import { DaoBalancesQueryParams } from '@aragon/sdk-client/dist/interfaces';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

import { useAragon } from '../../context';

export function useFetchDaoBalances(
  queryParams: DaoBalancesQueryParams = {},
  options?: UseQueryOptions<AssetBalance[] | null, unknown, AssetBalance[] | null, QueryKey>
) {
  const { baseClient: client } = useAragon();

  return useQuery<AssetBalance[] | null>({
    queryKey: ['daoBalance', queryParams.daoAddressOrEns],
    queryFn: async () =>
      client.methods.getDaoBalances({
        daoAddressOrEns: '',
        skip: 0,
        limit: 10,
        direction: SortDirection.ASC,
        ...queryParams,
      }),
    enabled: !!client && !!queryParams.daoAddressOrEns,
    ...options,
  });
}
