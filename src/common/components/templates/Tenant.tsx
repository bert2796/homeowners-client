import {
  IconBuildingWarehouse,
  IconCalendarEvent,
  IconDashboard,
  IconNews,
  IconScale,
} from '@tabler/icons';
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
    href: getRoutePath(Routes.TENANT_DASHBOARD),
    icon: IconDashboard,
    label: 'Dashboard',
  },
  {
    href: getRoutePath(Routes.TENANT_FACILITIES),
    icon: IconBuildingWarehouse,
    label: 'Facilities',
  },
  {
    href: getRoutePath(Routes.TENANT_RESERVATIONS),
    icon: IconCalendarEvent,
    label: 'Reservations',
  },
  {
    href: getRoutePath(Routes.TENANT_ANNOUNCEMENTS),
    icon: IconNews,
    label: 'Announcements',
  },
  {
    href: getRoutePath(Routes.TENANT_POLLS),
    icon: IconScale,
    label: 'Polls',
  },
];

export const Tenant: React.FC<Props> = ({ children }) => {
  const auth = useAuth();

  if (!auth?.user) {
    return null;
  }

  if (auth?.user?.role !== 'Tenant') {
    return <NotFound />;
  }

  return (
    <DashboardLayout
      headerLink={getRoutePath(Routes.TENANT_DASHBOARD)}
      items={ITEMS}
    >
      {children}
    </DashboardLayout>
  );
};
