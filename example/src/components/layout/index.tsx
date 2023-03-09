import { AppShell, Flex } from '@mantine/core';
import { HeaderMenu } from './header';
import { Links } from '../../constants/links';
import { Outlet } from 'react-router-dom';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const links = Links;

  return (
    <AppShell
      padding="md"
      header={<HeaderMenu links={links} />}
      styles={theme => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <Flex justify="center" align="center" style={{ height: '100%' }}>
        {children}
      </Flex>
    </AppShell>
  );
}
