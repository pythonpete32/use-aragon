import { Text } from '@mantine/core';
import { ConnectKitButton } from 'connectkit';
import { Center, Stack, Flex } from '@mantine/core';

export default function App() {
  return (
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <Stack mx="auto">
        <ConnectKitButton />
        <Text>Hello, world!</Text>
      </Stack>
    </Flex>
  );
}
