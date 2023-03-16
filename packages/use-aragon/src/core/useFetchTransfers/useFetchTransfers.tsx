import {
  ITransferQueryParams,
  Transfer,
  TransferSortBy,
  SortDirection,
  TransferType,
} from '@aragon/sdk-client';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

import { useAragon } from '../../context';

export function useFetchTransfers(
  queryParams: ITransferQueryParams = {},
  options?: UseQueryOptions<Transfer[] | null, unknown, Transfer[] | null, QueryKey>
) {
  const { baseClient: client } = useAragon();

  return useQuery<Transfer[] | null>({
    queryKey: ['daoTransfers', queryParams],
    queryFn: async () =>
      client.methods.getDaoTransfers({
        daoAddressOrEns: '',
        sortBy: TransferSortBy.CREATED_AT, // optional
        limit: 10, // optional
        skip: 0, // optional
        direction: SortDirection.ASC, // optional
        type: TransferType.DEPOSIT, // optional
        ...queryParams,
      }),
    enabled: !!client && !!queryParams.daoAddressOrEns,

    ...options,
  });
}
