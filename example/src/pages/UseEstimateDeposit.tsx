import { Stack } from '@mantine/core';
import { useEstimateDeposit, TokenType } from 'use-aragon';
import { DataCard, QueryType } from '../components/cards/DataCard';
import { ExampleCard } from '../components/cards/ExampleCard';

export function UseEstimateDeposit() {
  const demoCode = `
  const dao = '0x5b6e7c7c4d6f2e1feac7ee5f0f8394f0e1e1f51d';
  
  const Demo = () => {
    // All query params are mandatory
    const transfers = UseEstimateDepositEth({
      daoAddressOrEns: dao,
      type: TokenType.NATIVE,
      amount: 420n
    });
  
    if (transfers.isLoading) return <h1>Loading...</h1>;
    if (transfers.isError) return <h1>Error!!!</h1>;
  
    return <div>{transfers.data && <pre>{JSON.stringify(transfers.data, null, 2)}</pre>}</div>;
  }`;

  const estimates = useEstimateDeposit({
    daoAddressOrEns: '0x76ad2ab54b29e03920b52c455c97004efc3581d8',
    type: TokenType.NATIVE,
    amount: 420n,
  });

  return (
    <Stack spacing="xl" align="center">
      <h1>useEstimateDepositEth</h1>
      <ExampleCard name="Example" type={QueryType.query} data={demoCode} />
      <DataCard name="Response" data={estimates} />
    </Stack>
  );
}
