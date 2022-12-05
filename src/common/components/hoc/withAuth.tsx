import Router from 'next/router';
import React from 'react';

import { NextPageWithLayout } from '../../../pages/_app';
import { useAuth } from '../../hooks';

export const withAuth = (Component: NextPageWithLayout) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AuthenticatedComponent: NextPageWithLayout = (props: any) => {
    const auth = useAuth();

    if (auth.isInitialized && !auth.user) {
      Router.push('/auth/login');
    }

    // render the component if app was initialized and if user is authenticated
    if (auth.isInitialized && auth?.user) {
      return <Component {...props} />;
    }

    return null;
  };

  if (Component?.getLayout) {
    AuthenticatedComponent.getLayout = Component.getLayout;
  }

  return AuthenticatedComponent;
};
