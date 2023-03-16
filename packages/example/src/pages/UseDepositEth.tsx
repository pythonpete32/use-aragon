import { Button, Flex, Stack } from '@mantine/core';
import { useDepositEth, TokenType } from 'use-aragon';
import { DataCard, QueryType } from '../components/cards/DataCard';
import { ExampleCard } from '../components/cards/ExampleCard';

export function UseDepositEth() {
  const demoCode = ``;

  const deposit = useDepositEth({
    daoAddressOrEns: '0x13c6e4f17bbe606fed867a5cd6389a504724e805',
    type: TokenType.NATIVE,
    amount: 69n,
  });

  return (
    <Stack spacing="xl" align="center">
      <h1>useDepositEth</h1>
      <Flex
        mih={50}
        miw="100%"
        px={6}
        gap="md"
        justify="flex-end"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Button onClick={() => deposit?.mutate()}>Deposit 69 GWEI</Button>
      </Flex>
      <ExampleCard name="Example" type={QueryType.query} data={demoCode} />
      {deposit && <h3>{deposit.depositStatus}</h3>}
      {deposit?.depositTxid && <h3>{deposit.depositTxid}</h3>}

      {/* <DataCard name="Response" data={estimates} /> */}
    </Stack>
  );
}
