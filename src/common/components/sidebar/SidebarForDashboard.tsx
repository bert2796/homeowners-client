import { Box, createStyles, Navbar } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React from 'react';

import { NavHeader } from '../nav/Navheader';

type Props = {
  link: string;
  children?: React.ReactNode;
  className?: string;
};

export const SidebarForDashboard: React.FC<Props> = ({
  link,
  className,
  children,
}) => {
  const [isCollapsed] = useDisclosure(false);
  const { classes, cx } = useStyles({ isCollapsed });

  return (
    <Navbar className={cx(classes.navbar, className)}>
      <Navbar.Section grow>
        <NavHeader link={link} />
        <Box mt="lg" p="xs">
          {children}
        </Box>
      </Navbar.Section>
    </Navbar>
  );
};

const useStyles = createStyles((theme, params: { isCollapsed?: boolean }) => ({
  header: {
    backgroundColor: theme.colors.blue,
    borderBottom: `1px solid ${theme.colors.gray[8]}`,
  },

  navbar: {
    backgroundColor: theme.colors.sidebar[0],
    position: 'sticky',
    top: 0,
    transition: params?.isCollapsed ? 'width 0.1s linear' : 'none',
    width: params?.isCollapsed ? 81 : 264,
  },
}));
