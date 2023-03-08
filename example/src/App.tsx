import { Text } from '@mantine/core';
import { ConnectKitButton } from 'connectkit';
import { Stack, Flex } from '@mantine/core';
import { useFetchDao } from 'use-aragon';

export default function App() {
  const dao = useFetchDao('0x3d359409d2468901f12fd93a32c3f27c0004a108');
  console.log(dao);

  return (
    <Flex justify="center" align="center" style={{ height: '100vh' }}>
      <Stack mx="auto">
        <ConnectKitButton />
        <Text>Hello, world!</Text>
      </Stack>
    </Flex>
  );
}
