import { Text, Card, Group } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { QueryObserverResult } from 'react-query';

export enum QueryType {
  query = 'useQuery',
  mutation = 'useMutation',
}
interface DataCardProps {
  name: string;
  data: QueryObserverResult;
}
export function DataCard({ name, data }: DataCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ width: '700px', whiteSpace: 'pre-wrap' }}
    >
      <>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{name}</Text>
        </Group>
        {data?.data && (
          <Prism language="tsx">
            {JSON.stringify(
              data?.data,
              (key, value) => (typeof value === 'bigint' ? value.toString() : value),
              2
            )}
          </Prism>
        )}
        {data?.isLoading && <Text>Loading...</Text>}
        {data?.isError && <Text>Error!!!</Text>}
      </>
    </Card>
  );
}
