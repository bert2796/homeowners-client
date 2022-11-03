import {
  Box,
  Burger,
  createStyles,
  MediaQuery,
  useMantineTheme,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { IconAdjustmentsAlt } from '@tabler/icons';
import type { NextPage } from 'next';
import React from 'react';

const Dashboard: NextPage = () => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const { classes } = useStyles();
  return (
    <Box
      className={`${classes.wrapper} ${
        width <= theme.breakpoints.md ? classes.sidebarCollapsed : ''
      }`}
    >
      <Box className={classes.header} p="xs">
        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
          <Burger
            color={theme.colors.gray[6]}
            mr="xl"
            opened={false}
            size="sm"
          />
        </MediaQuery>
      </Box>
      <Box className={classes.sidebar}>
        <a className={classes.brandLink} href="">
          Lorem Ipsum
        </a>
        <Box className={classes.sidebarContent}>
          <Box mt="md">
            <ul className={classes.nav}>
              <li className={classes.navItem}>
                <a className={classes.navLink}>
                  <span className={classes.navLinkIcon}>
                    <IconAdjustmentsAlt />
                  </span>
                  <div className={classes.navLinkText}>Dashboard</div>
                </a>
              </li>
            </ul>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = createStyles((theme, _params, getRef) => ({
  brandLink: {
    color: theme.white,
    display: 'block',
    fontSize: '1.25rem',
    lineHeight: '1.5',
    minHeight: 59,
    padding: '0.8125rem 0.5rem',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  header: {
    // Media query with value from theme
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      marginLeft: 250,
      transition: 'margin-left .3s ease-in-out',
    },

    borderBottom: '1px solid #dee2e6',
    height: 57,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    listStyle: 'none',
    marginBottom: 0,
    paddingLeft: 0,
  },
  navItem: {
    marginBottom: 0,
  },
  navLink: {
    alignItems: 'center',
    color: '#c2c7d0',
    cursor: 'pointer',
    // display: 'block',
    display: 'flex',
    marginBottom: '0.2rem',
    padding: '12px 28px 12px 32px',
    position: 'relative',
    transition: 'width .3s ease-in-out',
    whiteSpace: 'nowrap',

    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.08)',
    },
  },

  navLinkIcon: {
    WebkitBoxAlign: 'center',
    WebkitBoxPack: 'center',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginRight: 10,
  },
  navLinkText: {
    color: 'rgb(238, 238, 238)',
    flex: '1 1 0%',
  },
  sidebar: {
    backgroundColor: '#343a40',

    ref: getRef('sidebar'),
    // eslint-disable-next-line sort-keys-fix/sort-keys-fix
    bottom: 0,
    boxShadow:
      '0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)!important',
    height: '100vh',
    left: 0,
    overflowY: 'hidden',
    position: 'fixed',
    top: 0,
    transition: 'margin-left .3s ease-in-out, width .3s ease-in-out',
    width: 250,

    zIndex: 1038,
  },
  sidebarCollapsed: {
    [`.${getRef('sidebar')}`]: {
      marginLeft: -250,
    },
  },
  sidebarContent: {
    overflowX: 'hidden',
    overflowY: 'auto',
  },
  wrapper: {
    minHeight: '100%',
    position: 'relative',
  },
}));

export default Dashboard;
