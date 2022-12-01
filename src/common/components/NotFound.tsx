import {
  Button,
  Container,
  createStyles,
  Group,
  Text,
  Title,
} from '@mantine/core';
import Router from 'next/router';

import { Routes } from '../constants';
import { getRoutePath } from '../utils';

export const NotFound: React.FC = () => {
  // hooks
  const { classes } = useStyles();

  // handlers
  const handleNavigateToHome = () => Router.push(getRoutePath(Routes.LOGIN));

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        {/* <Illustration className={classes.image} /> */}
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            align="center"
            className={classes.description}
            color="dimmed"
            size="lg"
          >
            Page you are trying to open does not exist. You may have mistyped
            the address, or the page has been moved to another URL. If you think
            this is an error contact support.
          </Text>
          <Group position="center">
            <Button size="md" onClick={handleNavigateToHome}>
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
};

const useStyles = createStyles((theme) => ({
  content: {
    paddingTop: 220,
    position: 'relative',
    zIndex: 1,

    [theme.fn.smallerThan('sm')]: {
      paddingTop: 120,
    },
  },

  description: {
    margin: 'auto',
    marginBottom: theme.spacing.xl * 1.5,
    marginTop: theme.spacing.xl,
    maxWidth: 540,
  },

  image: {
    left: 0,
    opacity: 0.75,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 0,
  },

  inner: {
    position: 'relative',
  },

  root: {
    paddingBottom: 80,
    paddingTop: 80,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: 38,
    fontWeight: 900,
    textAlign: 'center',

    [theme.fn.smallerThan('sm')]: {
      fontSize: 32,
    },
  },
}));
