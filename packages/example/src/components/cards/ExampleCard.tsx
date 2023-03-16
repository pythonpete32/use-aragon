import { Text, Card, Group, Badge } from '@mantine/core';
import { Prism } from '@mantine/prism';
import { QueryType } from './DataCard';

interface ExampleCardProps {
  name: string;
  type?: QueryType;
  data: string;
}
export function ExampleCard({ name, type, data }: ExampleCardProps) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="md"
      withBorder
      style={{ width: '700px', whiteSpace: 'pre-wrap' }}
    >
      <Group position="apart" mt="md" mb="xs">
        <Text weight={500}>{name}</Text>
        <Badge color="green">{type}</Badge>
      </Group>
      <Prism language="tsx">{data}</Prism>
    </Card>
  );
}
