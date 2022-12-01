import { AppShell, Box, Burger, MediaQuery } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { TablerIcon } from '@tabler/icons';
import React from 'react';

import { Routes } from '../../constants';
import { getRoutePath } from '../../utils';
import { DrawerForDashboard } from '../drawers/DrawerForDashboard';
import { Footer } from '../footers/Footer';
import { HeaderForDashboard } from '../headers/HeaderForDashboard';
import { NavItems } from '../nav/NavItems';
import { SidebarForDashboard } from '../sidebar/SidebarForDashboard';

type Props = {
  children: React.ReactNode;
  items: { href: string; icon: TablerIcon; label: string }[];
  headerLink: string;
};

export const DashboardLayout: React.FC<Props> = ({
  children,
  items,
  headerLink,
}) => {
  const [isOpen, handlers] = useDisclosure(false);

  return (
    <AppShell
      navbar={
        <>
          <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
            <SidebarForDashboard link={headerLink}>
              <NavItems items={items} />
            </SidebarForDashboard>
          </MediaQuery>
          <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
            <DrawerForDashboard
              isOpen={isOpen}
              link={getRoutePath(Routes.ADMIN_DASHBOARD)}
              onClose={handlers.close}
            >
              <NavItems items={items} />
            </DrawerForDashboard>
          </MediaQuery>
        </>
      }
      padding="md"
      styles={(theme) => ({
        body: { minHeight: '100vh' },
        main: { backgroundColor: theme.white, padding: 0 },
      })}
    >
      {/* header */}
      <HeaderForDashboard
        renderLeft={
          <div>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger opened={false} onClick={handlers.open} />
            </MediaQuery>
          </div>
        }
      />

      {/* content */}
      <Box
        sx={(theme) => ({
          backgroundColor: theme.colors.gray[1],
          display: 'flex',
          flex: '1 auto',
          flexDirection: 'column',
        })}
      >
        <Box
          px="lg"
          py="lg"
          sx={() => ({
            display: 'flex',
            flex: '1 0 auto',
            flexDirection: 'column',
            minHeight: 'calc(100vh - 130px)',
          })}
        >
          {children}
        </Box>

        <Box>
          <Footer />
        </Box>
      </Box>
    </AppShell>
  );
};
