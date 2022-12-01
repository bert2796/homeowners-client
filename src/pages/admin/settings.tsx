import { Box, createStyles, Grid } from '@mantine/core';
import {
  IconFileAnalytics,
  IconLicense,
  IconMessage2,
  IconMessages,
  IconReceiptRefund,
  IconShoppingCart,
  IconUsers,
} from '@tabler/icons';
import React from 'react';

import { withAuth } from '../../common/components/hoc/withAuth';
import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Settings: NextPageWithLayout = () => {
  const { classes, cx } = useStyles();
  const tabs = [
    { icon: IconShoppingCart, label: 'Property Types', link: '' },
    { icon: IconLicense, label: 'Property Blocks', link: '' },
    { icon: IconMessage2, label: 'Property Phases', link: '' },
    { icon: IconMessages, label: 'Messages', link: '' },
    { icon: IconUsers, label: 'Customers', link: '' },
    { icon: IconReceiptRefund, label: 'Refunds', link: '' },
    { icon: IconFileAnalytics, label: 'Files', link: '' },
  ];

  const [active, setActive] = React.useState('Orders');

  const links = tabs.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <item.icon className={classes.linkIcon} stroke={1.5} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Settings']} title="Settings" />
      </Box>

      <Box bg="#fff" mb="xl" mt="xl" p="md">
        <Grid>
          <Grid.Col span={3}>{links}</Grid.Col>
        </Grid>
      </Box>
    </>
  );
};

Settings.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default withAuth(Settings);

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
