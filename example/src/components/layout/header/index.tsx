import { Header, Menu, Group, Center, Burger, Container, Text, Anchor } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown } from '@tabler/icons-react';
import { useStyles } from './useStyles';
import { ConnectKitButton } from 'connectkit';
import { Link } from 'react-router-dom';

interface HeaderSearchProps {
  links: { link: string; label: string; links: { link: string; label: string }[] }[];
}

export function HeaderMenu({ links }: HeaderSearchProps) {
  const { classes } = useStyles();

  const items = links.map(link => {
    const menuItems = link.links?.map(item => {
      return (
        <Menu.Item component={Link} to={item.link} key={item.link}>
          {item.label}
        </Menu.Item>
      );
    });
    if (menuItems) {
      console.log('menuItems', link);
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <Link to={link.link} className={classes.link}>
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </Link>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }
    console.log('menuItems outside', link);
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
          <Text
            component={Link}
            to="/"
            sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
            ta="center"
            fz="xl"
            fw={700}
          >
            🪝useAragon
          </Text>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <ConnectKitButton />
        </div>
      </Container>
    </Header>
  );
}
