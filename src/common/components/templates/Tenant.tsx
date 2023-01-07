import {
  IconBuildingWarehouse,
  IconCalendarEvent,
  IconCash,
  IconDashboard,
  IconFileCertificate,
  IconNews,
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
    href: getRoutePath(Routes.TENANT_DASHBOARD),
    icon: IconDashboard,
    label: 'Dashboard',
  },
  {
    href: getRoutePath(Routes.TENANT_LEASES),
    icon: IconFileCertificate,
    label: 'Leases',
  },
  {
    href: getRoutePath(Routes.TENANT_PAYMENTS),
    icon: IconCash,
    label: 'Payments',
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
  // {
  //   href: getRoutePath(Routes.TENANT_POLLS),
  //   icon: IconScale,
  //   label: 'Polls',
  // },
];

export const Tenant: React.FC<Props> = ({ children }) => {
  const auth = useAuth();

  if (!auth.isInitialized) {
    return null;
  }

  if (!auth.user) {
    Router.push('/auth/login');

    return null;
  }

  if (auth?.user?.role !== 'Tenant') {
    return <NotFound />;
  }

  if (auth.user) {
    return (
      <DashboardLayout
        avatar={auth?.user?.avatar || ''}
        headerLink={getRoutePath(Routes.TENANT_DASHBOARD)}
        items={ITEMS}
        onProfile={() => Router.push(getRoutePath(Routes.TENANT_PROFILE))}
      >
        {children}
      </DashboardLayout>
    );
  }

  return null;
};
