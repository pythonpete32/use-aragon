import { Button, Flex, Stack } from '@mantine/core';
import { useDepositEth, TokenType } from 'use-aragon';
import { DataCard, QueryType } from '../components/cards/DataCard';
import { ExampleCard } from '../components/cards/ExampleCard';

export function UseDepositEth() {
  const demoCode = ``;

  const deposit = useDepositEth({
    daoAddressOrEns: '0x59447788f9dcf2df550f257f3692a07f05b922d7',
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
        // bg="rgba(0, 0, 0, .3)"
        gap="md"
        justify="flex-end"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Button onClick={deposit.mutate}>Deposit 69 GWEI</Button>
      </Flex>
      <ExampleCard name="Example" type={QueryType.query} data={demoCode} />
      {deposit && <h3>{deposit.depositStatus}</h3>}
      {deposit?.depositTxid && <h3>{deposit.depositTxid}</h3>}

      {/* <DataCard name="Response" data={estimates} /> */}
    </Stack>
  );
}
