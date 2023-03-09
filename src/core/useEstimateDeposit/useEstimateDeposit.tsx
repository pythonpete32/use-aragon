import { GasFeeEstimation } from '@aragon/sdk-client';
import { DepositParams } from '@aragon/sdk-client';
import { QueryKey, useQuery, UseQueryOptions } from 'react-query';

import { useAragon } from '../../context';

export function useEstimateDeposit(
  depositParams: DepositParams,
  options?: UseQueryOptions<GasFeeEstimation | null, unknown, GasFeeEstimation | null, QueryKey>
) {
  const { baseClient: client } = useAragon();

  return useQuery<GasFeeEstimation | null>({
    queryKey: ['estimateDepositEth', depositParams.daoAddressOrEns],
    queryFn: async () => client.estimation.deposit(depositParams),
    enabled: !!(
      client?.web3?.getSigner() &&
      depositParams.daoAddressOrEns &&
      Object.values(depositParams).every(Boolean)
    ),
    ...options,
  });
}
