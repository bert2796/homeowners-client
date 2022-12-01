import {
  Avatar,
  Box,
  Divider,
  Group,
  Menu,
  UnstyledButton,
} from '@mantine/core';
import { IconLogout } from '@tabler/icons';
import React from 'react';

import { useAuth } from '../../hooks';

type Props = {
  renderLeft?: React.ReactNode;
};

export const HeaderForDashboard: React.FC<Props> = ({ renderLeft }) => {
  const auth = useAuth();

  return (
    <Box
      component="header"
      sx={(theme) => ({
        backgroundColor: theme.white,
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
        padding: `${theme.spacing.md}px ${theme.spacing.md}px`,
      })}
    >
      <Group noWrap position="apart">
        {renderLeft}
        <UserMenu
          onLogout={() => {
            if (auth.logout) {
              auth.logout();
            }

            return undefined;
          }}
        />
      </Group>
    </Box>
  );
};

const UserMenu: React.FC<{ onLogout: () => void }> = ({ onLogout }) => (
  <Menu position="bottom-end" transition="pop-top-right" width={260}>
    <Menu.Target>
      <UnstyledButton>
        <Group spacing={15}>
          <Avatar
            radius="xl"
            size={40}
            src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          />
          {/* <Text size="md" sx={{ lineHeight: 1 }} weight="500">
            Sample Name
          </Text> */}
        </Group>
      </UnstyledButton>
    </Menu.Target>

    <Menu.Dropdown>
      <Menu.Item icon={<IconLogout size="14" />}>Profile Settings</Menu.Item>
      <Divider />
      <Menu.Item icon={<IconLogout size="14" />} onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);
