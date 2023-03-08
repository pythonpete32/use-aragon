import { Header, Menu, Group, Center, Burger, Container } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { useStyles } from './useStyles';
import { ConnectKitButton } from 'connectkit';

interface HeaderSearchProps {
  links: { link: string; label: string; links: { link: string; label: string }[] }[];
}

export function HeaderMenu({ links }: HeaderSearchProps) {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();

  const items = links.map(link => {
    const menuItems = link.links?.map(item => <Menu.Item key={item.link}>{item.label}</Menu.Item>);

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a href={link.link} className={classes.link} onClick={event => event.preventDefault()}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }

    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
        onClick={event => event.preventDefault()}
      >
        {link.label}
      </a>
    );
  });

  return (
    <Header height={56} mb={120}>
      <Container>
        <div className={classes.inner}>
          useAragon
          {/* <MantineLogo size={28} /> */}
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <ConnectKitButton />
        </div>
      </Container>
    </Header>
  );
}
