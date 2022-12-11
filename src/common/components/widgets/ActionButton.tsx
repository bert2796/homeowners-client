import { Button, Menu } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons';
import React from 'react';

type Props = {
  id: number;
  onApprovePayment?: (id: number) => void;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onPay?: (id: number) => void;
  onRejectPayment?: (id: number) => void;
  onView?: (id: number) => void;
  onViewPayment?: (id: number) => void;
};

export const ActionButton: React.FC<Props> = ({
  id,
  onApprovePayment,
  onDelete,
  onEdit,
  onPay,
  onRejectPayment,
  onView,
  onViewPayment,
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
      {/* payment related */}
      {onApprovePayment && (
        <Menu.Item onClick={() => onApprovePayment(id)}>
          Approve Payment
        </Menu.Item>
      )}
      {onRejectPayment && (
        <Menu.Item onClick={() => onRejectPayment(id)}>
          Reject Payment
        </Menu.Item>
      )}
      {onViewPayment && (
        <Menu.Item onClick={() => onViewPayment(id)}>View Payment</Menu.Item>
      )}
      {onPay && <Menu.Item onClick={() => onPay(id)}>Pay</Menu.Item>}

      {/* general */}
      {onView && <Menu.Item onClick={() => onView(id)}>View</Menu.Item>}
      {onEdit && <Menu.Item onClick={() => onEdit(id)}>Edit</Menu.Item>}
      {onDelete && <Menu.Item onClick={() => onDelete(id)}>Delete</Menu.Item>}
    </Menu.Dropdown>
  </Menu>
);
