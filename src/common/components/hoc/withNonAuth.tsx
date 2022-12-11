import Router from 'next/router';
import React from 'react';

import { NextPageWithLayout } from '../../../pages/_app';
import { Routes } from '../../constants';
import { useAuth } from '../../hooks';
import { getRoutePath } from '../../utils';

export const withNonAuth = (Component: NextPageWithLayout) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const NonAuthenticatedComponent: NextPageWithLayout = (props: any) => {
    const auth = useAuth();

    if (auth?.user) {
      if (['Admin', 'Staff'].includes(auth.user.role)) {
        Router.push(getRoutePath(Routes.ADMIN_DASHBOARD));
      } else if (auth.user.role === 'Tenant') {
        Router.push(getRoutePath(Routes.TENANT_DASHBOARD));
      }

      return null;
    }

    return <Component {...props} />;
  };

  if (Component?.getLayout) {
    NonAuthenticatedComponent.getLayout = Component.getLayout;
  }

  return NonAuthenticatedComponent;
};
