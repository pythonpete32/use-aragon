import { Text } from '@mantine/core';
import { Stack } from '@mantine/core';
import { useFetchDao } from 'use-aragon';
import { DataCard, QueryType } from '../components/cards/DataCard';
import { ExampleCard } from '../components/cards/ExampleCard';

export function UseFetchDao() {
  const demoCode = `import { useFetchDao } from 'use-aragon';

function Demo() {
  const dao = useFetchDao('0x3d359409d2468901f12fd93a32c3f27c0004a108');

  if (dao.isLoading) return <Text>Loading...</Text>;
  if (dao.isError) return <Text>Error!!!</Text>;

  return(
    <>
      {dao.data && <pre>{JSON.stringify(dao.data, null,2)}</pre>}
    </>
  )
}`;
  const dao = useFetchDao('0x3d359409d2468901f12fd93a32c3f27c0004a108');

  return (
    <Stack spacing="xl" align="center">
      <Text size="xl" weight={500}>
        useFetchDao
      </Text>
      <ExampleCard name="Example" type={QueryType.query} data={demoCode} />
      <DataCard name="Response" data={dao} />
    </Stack>
  );
}
