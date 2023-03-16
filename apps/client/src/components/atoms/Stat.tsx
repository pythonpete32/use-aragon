import { As, Stack, HStack, Square, Icon, Box, Text, Heading, Center } from "@chakra-ui/react";

interface StatProps {
  icon: As;
  label: string;
  value: string;
  delta: {
    value: string;
    isUpwardsTrend: boolean;
  };
}
export const Stat = (props: StatProps) => {
  const { label, value, icon, delta, ...boxProps } = props;
  return (
    <Box
      px={{ base: "4", md: "6" }}
      py={{ base: "5", md: "6" }}
      bg="bg-surface"
      borderRadius="lg"
      boxShadow="sm"
      {...boxProps}
    >
      <Stack spacing={{ base: "5", md: "6" }}>
        <Stack direction="row" justify="space-between">
          <HStack spacing="4">
            <Square size="12" bg="bg-accent-subtle" borderRadius="md">
              <Icon as={icon} boxSize="6" color="on-accent" />
            </Square>
            <Text fontWeight="medium">{label}</Text>
          </HStack>
        </Stack>
        <Heading size={{ base: "sm", md: "sm" }}>{value}</Heading>
      </Stack>
    </Box>
  );
};
