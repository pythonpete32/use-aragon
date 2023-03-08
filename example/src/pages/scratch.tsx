import {
  ITransferQueryParams,
  SortDirection,
  TransferSortBy,
  TransferType,
} from '@aragon/sdk-client';
import { useFetchTransfers } from 'use-aragon';

const queryParams: ITransferQueryParams = {
  sortBy: TransferSortBy.CREATED_AT,
  type: TransferType.DEPOSIT,
  skip: 0,
  limit: 10,
  direction: SortDirection.ASC,
};

const dao = '0x5b6e7c7c4d6f2e1feac7ee5f0f8394f0e1e1f51d';

const Demo = () => {
  // All query params are optional, however you must pass a daoAddressOrEns for the hook to run
  const transfers = useFetchTransfers({
    daoAddressOrEns: dao,
    ...queryParams, // These are default values, you can override them here
  });

  if (transfers.isLoading) return <h1>Loading...</h1>;
  if (transfers.isError) return <h1>Error!!!</h1>;

  return <div>{transfers.data && <pre>{JSON.stringify(transfers.data, null, 2)}</pre>}</div>;
};

export default Demo;
