import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import React from 'react';

import { ModalPropertySettings } from '../../../common/components/modals/ModalPropertySettings';
import { TablePropertySettings } from '../../../common/components/tables/TablePropertySettings';
import { AdminSettings } from '../../../common/components/templates/AdminSettings';
import { NextPageWithLayout } from '../../_app';

const PropertyBlocks: NextPageWithLayout = () => {
  const [type, setType] = React.useState<Data.Action>('Create');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [propertySettingsId, setPropertySettingsId] = React.useState(0);

  const handleSuccess = (message: string) => {
    showNotification({
      color: 'green',
      icon: <IconCheck size={14} />,
      message,
      title: 'Success',
    });
  };

  const handleOnAction = (type: Data.Action, id?: number) => {
    if (id) {
      setPropertySettingsId(id);
    }

    setType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Blocks */}
      <TablePropertySettings
        settingsType="Block"
        onAdd={() => handleOnAction('Create')}
        onDelete={(id: number) => handleOnAction('Delete', id)}
        onEdit={(id: number) => handleOnAction('Edit', id)}
        onView={(id: number) => handleOnAction('View', id)}
      />

      {/* Modals */}
      <ModalPropertySettings
        id={propertySettingsId}
        isOpen={isModalOpen}
        settingsType="Block"
        type={type}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

PropertyBlocks.getLayout = (page: React.ReactElement) => (
  <AdminSettings>{page}</AdminSettings>
);

export default PropertyBlocks;
