import { Container, Stack, Center } from "@chakra-ui/react";
import { RadioButtonGroup } from "../molecules/RadioButtonGroup";
import { RadioButton } from "../atoms/RadioButton";
import { TransactionItem } from "../molecules/TransactionItem";

export const TransactionList = () => {
  return (
    <Container w="100%" px="0">
      <Center>
        <RadioButtonGroup
          key={"md"}
          defaultValue="all"
          size={"md"}
          onChange={(e) => console.log(e)}
        >
          <RadioButton value="deposits">Deposits</RadioButton>
          <RadioButton value="all">All</RadioButton>
          <RadioButton value="withdrawals">Withdrawals</RadioButton>
        </RadioButtonGroup>
      </Center>
      <Stack pt={4} spacing="2">
        <TransactionItem
          type={"deposit"}
          amount={"123"}
          token={"ETH"}
          date={"now"}
          usdValue={"12.34"}
        />
        <TransactionItem
          type={"withdrawal"}
          amount={"321"}
          token={"ETH"}
          date={"now"}
          usdValue={"12.34"}
        />
      </Stack>
    </Container>
  );
};
