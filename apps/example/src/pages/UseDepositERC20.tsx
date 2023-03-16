import { Button, Flex, Stack } from '@mantine/core';
import { useDepositERC20, TokenType } from 'use-aragon';
import { DataCard, QueryType } from '../components/cards/DataCard';
import { ExampleCard } from '../components/cards/ExampleCard';

export function UseDepositERC20() {
  const demoCode = ``;

  const deposit = useDepositERC20({
    daoAddressOrEns: '0x13c6e4f17bbe606fed867a5cd6389a504724e805',
    type: TokenType.ERC20,
    amount: 888n,
    tokenAddress: '0x74445e9F3699CDEbf6FbcEF660c573bda2bBb68C',
  });

  return (
    <Stack spacing="xl" align="center">
      <h1>useDepositERC20</h1>
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
        <Button onClick={() => deposit?.mutate()}>Deposit 777 GWEI</Button>
        {/* <Button
          onClick={() =>
            deposit.mutateAsync({
              daoAddressOrEns: '0x13c6e4f17bbe606fed867a5cd6389a504724e805',
              type: TokenType.ERC20,
              tokenAddress: '0x74445e9F3699CDEbf6FbcEF660c573bda2bBb68C',
              amount: 420n,
            })
          }
        >
          Deposit 420 GWEI Async
        </Button> */}
      </Flex>
      <ExampleCard name="Example" type={QueryType.query} data={demoCode} />
      {deposit && <h3>{deposit.depositStatus}</h3>}
      {deposit?.depositTxid && <h3>{deposit.depositTxid}</h3>}

      {/* <DataCard name="Response" data={estimates} /> */}
    </Stack>
  );
}
