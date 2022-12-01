import { Button, Menu } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import React from 'react';

type Props = {
  id: number;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onView?: (id: number) => void;
};

export const ActionButton: React.FC<Props> = ({
  id,
  onDelete,
  onEdit,
  onView,
}) => (
  <Menu shadow="md" width={103}>
    <Menu.Target>
      <Button
        rightIcon={<IconChevronDown size={14} />}
        size="xs"
        variant="light"
      >
        ACTIONS
      </Button>
    </Menu.Target>

    <Menu.Dropdown>
      {onView && <Menu.Item onClick={() => onView(id)}>View</Menu.Item>}
      {onEdit && <Menu.Item onClick={() => onEdit(id)}>Edit</Menu.Item>}
      {onDelete && <Menu.Item onClick={() => onDelete(id)}>Delete</Menu.Item>}
    </Menu.Dropdown>
  </Menu>
);
