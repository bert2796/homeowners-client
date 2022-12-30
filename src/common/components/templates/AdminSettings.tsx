import { Box, createStyles, Grid } from '@mantine/core';
import {
  IconBusinessplan,
  IconFlag,
  IconFlag2,
  IconPennant,
  IconPool,
  IconSitemap,
} from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react';

import { Breadcrumbs } from '../widgets/Breadcrumbs';
import { Admin } from './Admin';

type Props = {
  children: React.ReactNode;
};

export const AdminSettings: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const tabs = [
    {
      icon: IconSitemap,
      label: 'Property Types',
      path: '/admin/settings/property-types',
    },
    {
      icon: IconFlag,
      label: 'Property Blocks',
      path: '/admin/settings/property-blocks',
    },
    {
      icon: IconPennant,
      label: 'Property Lots',
      path: '/admin/settings/property-lots',
    },
    {
      icon: IconFlag2,
      label: 'Property Phases',
      path: '/admin/settings/property-phases',
    },
    { icon: IconPool, label: 'Utilities', path: '/admin/settings/utilities' },
    {
      icon: IconBusinessplan,
      label: 'Extra Charges',
      path: '/admin/settings/extra-charges',
    },
  ];

  const currentPath = tabs.find((tab) => tab.path === router.pathname);

  const links = tabs.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.path === router.pathname,
      })}
      href={item.path}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        router.push(item.path);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Admin>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs
          items={['Home', 'Settings', `${currentPath?.label || ''}`]}
          title="Settings"
        />
      </Box>

      <Box bg="#fff" mih={600} mt="xl">
        <Grid h={700}>
          <Grid.Col lg={2} md={3} sm={12} xs={12}>
            <Box className={classes.linkContainer} pt="xs">
              {links}
            </Box>
          </Grid.Col>

          <Grid.Col lg={10} md={9} sm={12} xs={12}>
            {children}
          </Grid.Col>
        </Grid>
      </Box>
    </Admin>
  );
};

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');

  return {
    link: {
      ...theme.fn.focusStyles(),
      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
      alignItems: 'center',
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      display: 'flex',
      fontSize: theme.fontSizes.sm,
      fontWeight: 500,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,

      textDecoration: 'none',
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.variant({
          color: theme.primaryColor,
          variant: 'light',
        }).background,
        color: theme.fn.variant({ color: theme.primaryColor, variant: 'light' })
          .color,
        [`& .${icon}`]: {
          color: theme.fn.variant({
            color: theme.primaryColor,
            variant: 'light',
          }).color,
        },
      },
    },

    linkContainer: {
      borderRight: `1px solid ${theme.colors.gray[2]}`,
      height: '100%',
    },

    linkIcon: {
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
      ref: icon,
    },
  };
});
