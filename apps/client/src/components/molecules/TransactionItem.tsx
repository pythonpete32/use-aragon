import { Stack, HStack, Square, Icon, Box, Text } from "@chakra-ui/react";
import { FaArrowCircleUp, FaArrowCircleDown } from "react-icons/fa";

interface TransactionItemProps {
  type: "deposit" | "withdrawal";
  amount: string;
  token: string;
  date: string;
  usdValue: string;
}

export const TransactionItem = (props: TransactionItemProps) => {
  const { type, amount, token, date, usdValue } = props;

  return (
    <Box bg="bg-surface" borderRadius="lg" boxShadow="sm" p={{ base: "2", md: "3" }}>
      <Stack spacing={{ base: "5", md: "6" }}>
        <Stack direction="row" justify="space-between">
          <HStack spacing="4">
            <Square size="12" bg={type === "deposit" ? "green.500" : "red.500"} borderRadius="md">
              <Icon
                boxSize="6"
                color="on-accent"
                as={type === "deposit" ? FaArrowCircleDown : FaArrowCircleUp}
              />
            </Square>
            <Stack>
              <Text fontWeight="medium">{type.charAt(0).toUpperCase() + type.slice(1)}</Text>
              <Text fontSize="sm" color="gray.500">
                {date}
              </Text>
            </Stack>
          </HStack>
          <Stack justifyContent={"flex-end"} alignItems={"flex-start"}>
            <Text fontWeight="medium">
              {amount} {token}
            </Text>
            <Text fontSize="sm" fontWeight="medium">
              $ {usdValue}
            </Text>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};
