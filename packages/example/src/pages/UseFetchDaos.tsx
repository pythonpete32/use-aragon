import { Stack } from '@mantine/core';
import { useFetchDaos } from 'use-aragon';
import { DataCard, QueryType } from '../components/cards/DataCard';
import { ExampleCard } from '../components/cards/ExampleCard';

export function UseFetchDaos() {
  const demoCode = `import { useFetchDaos, DaoSortBy, IDaoQueryParams, SortDirection } from 'use-aragon';
  
  // All parameters are optional
  const parameters: IDaoQueryParams = {
    skip: 0, // optional, default 0
    limit: 10, // optional, default 10
    direction: SortDirection.ASC, // optional, default ASC
    sortBy: DaoSortBy.CREATED_AT, // optional, default CREATED_AT
  };
  
  const Demo = () => {
    // passing these parameters is the same as calling with no parameters
    const daos = useFetchDaos(parameters);
  
    if (daos.isLoading) return <h1>Loading...</h1>;
    if (daos.isError) return <h1>Error!!!</h1>;
  
    return(
      <div>
        {daos.data && <pre>{JSON.stringify(daos.data, null,2)}</pre>}
      </div>
      )
  }`;

  const daos = useFetchDaos();

  return (
    <Stack spacing="xl" align="center">
      <h1>useFetchDao</h1>
      <ExampleCard name="Example" type={QueryType.query} data={demoCode} />
      <DataCard name="Response" data={daos} />
    </Stack>
  );
}
