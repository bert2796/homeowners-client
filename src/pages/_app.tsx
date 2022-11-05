import { createStyles, MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';
import { CookiesProvider } from 'react-cookie';

import { AuthProvider } from '../common/context';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App(props: AppPropsWithLayout) {
  const { Component, pageProps } = props;
  const getLayout = Component.getLayout ?? ((page) => page);

  const { classes } = useStyles();

  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: 'light',
        other: {
          breakpoints: {
            lg: '',
            md: 991,
            sm: 768,
          },
          collapsedSidebarWidth: 74,
          sidebarWidth: 250,
        },
      }}
    >
      <CookiesProvider>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <div className={classes.main}>
              {getLayout(<Component {...pageProps} />)}
            </div>

            <ReactQueryDevtools initialIsOpen />
          </QueryClientProvider>
        </AuthProvider>
      </CookiesProvider>
    </MantineProvider>
  );
}

const useStyles = createStyles(() => ({
  main: {
    minHeight: '100vh',
  },
}));
