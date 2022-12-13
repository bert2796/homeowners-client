import { MantineSize, Modal, Title, useMantineTheme } from '@mantine/core';
import React from 'react';

type Props = {
  title: string;
  isOpen: boolean;
  fullScreen?: boolean;
  size?: MantineSize;
  overflow?: 'inside' | 'outside';
  onClose: () => void;
  children: React.ReactNode;
};

export const ModalInstance: React.FC<Props> = ({
  title,
  isOpen,
  fullScreen,
  size,
  overflow,
  onClose,
  children,
}) => {
  // hooks
  const theme = useMantineTheme();

  return (
    <Modal
      centered
      closeOnClickOutside={false}
      fullScreen={fullScreen}
      opened={isOpen}
      overflow={overflow}
      overlayBlur={3}
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      size={size || 'lg'}
      title={<Title order={2}>{title || ''}</Title>}
      onClose={onClose}
    >
      {children}
    </Modal>
  );
};
