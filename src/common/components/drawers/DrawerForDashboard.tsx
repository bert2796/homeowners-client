import { Box, createStyles, Drawer } from '@mantine/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { NavHeader } from '../nav/Navheader';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  link: string;
  onClose: () => void;
};

export const DrawerForDashboard: React.FC<Props> = ({
  children,
  isOpen,
  link,
  onClose,
}) => {
  const router = useRouter();
  const { classes } = useStyles();

  // close header whenever router changes
  useEffect(() => {
    router.events.on('routeChangeStart', onClose);

    return () => {
      router.events.off('routeChangeStart', onClose);
    };
  }, [onClose, router.events]);

  return (
    <Drawer
      classNames={{ drawer: classes.navbar }}
      opened={isOpen}
      withCloseButton={false}
      onClose={onClose}
    >
      <NavHeader link={link} />
      <Box mt="lg" p="xs">
        {children}
      </Box>
    </Drawer>
  );
};

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.sidebar[0],
  },
}));
