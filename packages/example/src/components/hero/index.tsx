import { Container, Text, Button, Group } from '@mantine/core';
import { GithubIcon } from '@mantine/ds';
import { Link } from 'react-router-dom';
import { useStyles } from './useStyles';

export function HeroTitle() {
  const { classes } = useStyles();

  return (
    <div className={classes.wrapper}>
      <Container size={700} className={classes.inner}>
        <h1 className={classes.title}>
          An{' '}
          <Text component="span" variant="gradient" gradient={{ from: 'blue', to: 'cyan' }} inherit>
            Aragon OSx
          </Text>{' '}
          hooks and components library
        </h1>

        <Text className={classes.description} color="dimmed">
          Build fully functional and performant DAOs with ease – useAragon includes more than 100
          hooks to help you build your Aragon DAO.
        </Text>

        <Group className={classes.controls}>
          <Button
            component={Link}
            to="/quick-start"
            size="xl"
            className={classes.control}
            variant="gradient"
            gradient={{ from: 'blue', to: 'cyan' }}
          >
            Get started
          </Button>

          <Button
            component="a"
            href="https://github.com/pythonpete32/use-aragon"
            size="xl"
            variant="default"
            className={classes.control}
            leftIcon={<GithubIcon size={20} />}
          >
            GitHub
          </Button>
        </Group>
      </Container>
    </div>
  );
}
