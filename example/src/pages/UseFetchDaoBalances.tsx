import { Stack } from '@mantine/core';
import { useFetchDaoBalances } from 'use-aragon';
import { DataCard, QueryType } from '../components/cards/DataCard';
import { ExampleCard } from '../components/cards/ExampleCard';

export function UseFetchDaoBalances() {
  const demoCode = `import {
    ITransferQueryParams,
    SortDirection,
    TransferSortBy,
    TransferType,
    useFetchDaoBalances
  } from 'use-aragon';
  
  // optional query params
  const queryParams: ITransferQueryParams = {
    sortBy: TransferSortBy.CREATED_AT,
    type: TransferType.DEPOSIT,
    skip: 0,
    limit: 10,
    direction: SortDirection.ASC,
  };
  
  const dao = '0x13c6e4f17bbe606fed867a5cd6389a504724e805';
  
  const Demo = () => {
    // All query params are optional, however you must pass a daoAddressOrEns for the hook to run
    const transfers = useFetchDaoBalances({
      daoAddressOrEns: dao,
      ...queryParams, // These are default values, you can override them here
    });
  
    if (transfers.isLoading) return <h1>Loading...</h1>;
    if (transfers.isError) return <h1>Error!!!</h1>;
  
    return <div>{transfers.data && <pre>{JSON.stringify(transfers.data, null, 2)}</pre>}</div>;
  }`;

  const balances = useFetchDaoBalances({
    daoAddressOrEns: '0x13c6e4f17bbe606fed867a5cd6389a504724e805',
  });

  return (
    <Stack spacing="xl" align="center">
      <h1>useFetchDaoBalances</h1>
      <ExampleCard name="Example" type={QueryType.query} data={demoCode} />
      <DataCard name="Response" data={balances} />
    </Stack>
  );
}
