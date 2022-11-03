import {
  AppShell,
  Burger,
  Container,
  createStyles,
  Header,
  MediaQuery,
  Navbar,
  useMantineTheme,
} from '@mantine/core';
import type { NextPage } from 'next';
import React from 'react';

const Dashboard: NextPage = () => {
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const [opened, setOpened] = React.useState(false);

  return (
    <AppShell
      header={
        <Header className={classes.header} height={60} p="md">
          <MediaQuery largerThan="md" styles={{ display: 'none' }}>
            <Burger
              color={theme.colors.gray[6]}
              mr="xl"
              opened={opened}
              size="sm"
              onClick={() => setOpened((o) => !o)}
            />
          </MediaQuery>
        </Header>
      }
      navbar={
        <Navbar
          height="100vh"
          hidden={!opened}
          hiddenBreakpoint="md"
          width={{ base: 250 }}
        >
          <p>test</p>
        </Navbar>
      }
    >
      <Container>
        <h1>Hello World</h1>
      </Container>
    </AppShell>
  );
};

const useStyles = createStyles((theme) => ({
  header: {
    // Media query with value from theme
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      marginLeft: 250,
    },
  },
}));

export default Dashboard;
