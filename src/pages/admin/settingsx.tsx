import { Box, createStyles, Grid, Tabs } from '@mantine/core';
import {
  IconLicense,
  IconMessage2,
  IconMessages,
  IconShoppingCart,
} from '@tabler/icons';
import { useRouter } from 'next/router';
import React from 'react';

import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Settings: NextPageWithLayout = () => {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const tabs = [
    {
      icon: IconShoppingCart,
      label: 'Property Types',
      path: '/settings/property-types',
    },
    {
      icon: IconLicense,
      label: 'Property Blocks',
      path: '/settings/property-blocks',
    },
    {
      icon: IconMessage2,
      label: 'Property Phases',
      path: '/settings/property-phases',
    },
    { icon: IconMessages, label: 'Utilities', path: '/settings/utilities' },
  ];

  const items = tabs?.length
    ? tabs.map((tab) => (
        <Tabs.Tab
          icon={<tab.icon size={18} />}
          key={tab.label}
          value={tab.path}
        >
          {tab.label}
        </Tabs.Tab>
      ))
    : [];

  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Settings']} title="Settings" />
      </Box>

      <Box bg="#fff" mb="xl" mt="xl" p="md">
        <Grid>
          <Grid.Col span={3}>
            <Tabs
              orientation="vertical"
              value={router.pathname}
              variant="pills"
              onTabChange={(value) => router.push(value as string)}
            >
              <Tabs.List>{items}</Tabs.List>
            </Tabs>
          </Grid.Col>
        </Grid>
      </Box>
    </>
  );
};

Settings.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default Settings;

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');

  return {
    footer: {
      borderTop: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[4]
          : theme.colors.gray[3]
      }`,
      paddingTop: theme.spacing.md,
    },

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
      borderRadius: theme.radius.sm,
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

    linkIcon: {
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
      ref: icon,
    },

    navbar: {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    title: {
      letterSpacing: -0.25,
      textTransform: 'uppercase',
    },
  };
});
