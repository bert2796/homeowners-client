import { Avatar, Box, Group, Menu, UnstyledButton } from '@mantine/core';
import { IconLogout, IconUserSearch } from '@tabler/icons';
import React from 'react';

import { useAuth } from '../../hooks';
import defaultAvatar from '../../resources/images/user.png';

type Props = {
  avatar: string;
  renderLeft?: React.ReactNode;
  onProfile: () => void;
};

export const HeaderForDashboard: React.FC<Props> = ({
  avatar,
  renderLeft,
  onProfile,
}) => {
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
          avatar={avatar}
          onLogout={() => {
            if (auth.logout) {
              auth.logout();
            }

            return undefined;
          }}
          onProfile={onProfile}
        />
      </Group>
    </Box>
  );
};

const UserMenu: React.FC<{
  avatar: string;
  onLogout: () => void;
  onProfile: () => void;
}> = ({ avatar, onLogout, onProfile }) => (
  <Menu position="bottom-end" transition="pop-top-right" width={260}>
    <Menu.Target>
      <UnstyledButton>
        <Group spacing={15}>
          <Avatar
            radius="xl"
            size={40}
            src={avatar || defaultAvatar.src}
            // src="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          />
          {/* <Text size="md" sx={{ lineHeight: 1 }} weight="500">
            Sample Name
          </Text> */}
        </Group>
      </UnstyledButton>
    </Menu.Target>

    <Menu.Dropdown>
      <Menu.Label>Menu</Menu.Label>
      <Menu.Item icon={<IconUserSearch size="14" />} onClick={onProfile}>
        Profile
      </Menu.Item>
      <Menu.Item icon={<IconLogout size="14" />} onClick={onLogout}>
        Logout
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
);
