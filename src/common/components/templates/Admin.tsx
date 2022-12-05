import {
  IconBuildingWarehouse,
  IconCalendarEvent,
  IconDashboard,
  IconHome,
  IconNews,
  IconScale,
  IconSettings,
  IconUsers,
  IconUserSearch,
} from '@tabler/icons';
import Router from 'next/router';
import React from 'react';

import { Routes } from '../../constants';
import { useAuth } from '../../hooks';
import { getRoutePath } from '../../utils';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { NotFound } from '../NotFound';

type Props = {
  children: React.ReactNode;
};

const ITEMS = [
  {
    href: getRoutePath(Routes.ADMIN_DASHBOARD),
    icon: IconDashboard,
    label: 'Dashboard',
  },
  {
    href: getRoutePath(Routes.ADMIN_PROPERTIES),
    icon: IconHome,
    label: 'Properties',
  },
  {
    href: getRoutePath(Routes.ADMIN_FACILITIES),
    icon: IconBuildingWarehouse,
    label: 'Facilities',
  },
  {
    href: getRoutePath(Routes.ADMIN_RESERVATIONS),
    icon: IconCalendarEvent,
    label: 'Reservations',
  },
  {
    href: getRoutePath(Routes.ADMIN_TENANTS),
    icon: IconUserSearch,
    label: 'Tenants',
  },
  {
    href: getRoutePath(Routes.ADMIN_ANNOUNCEMENTS),
    icon: IconNews,
    label: 'Announcements',
  },
  {
    href: getRoutePath(Routes.ADMIN_POLLS),
    icon: IconScale,
    label: 'Polls',
  },
  {
    href: getRoutePath(Routes.ADMIN_STAFFS),
    icon: IconUsers,
    label: 'Staffs',
  },
  {
    href: getRoutePath(Routes.ADMIN_SETTINGS),
    icon: IconSettings,
    label: 'Settings',
  },
];

export const Admin: React.FC<Props> = ({ children }) => {
  const auth = useAuth();

  if (!auth.isInitialized) {
    return null;
  }

  if (!auth.user) {
    Router.push('/auth/login');
  }

  if (auth?.user?.role !== 'Admin') {
    return <NotFound />;
  }

  if (auth.user) {
    return (
      <>
        <DashboardLayout
          headerLink={getRoutePath(Routes.ADMIN_DASHBOARD)}
          items={ITEMS}
        >
          {children}
        </DashboardLayout>
      </>
    );
  }

  return null;
};
