import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import React from 'react';

import { ModalUtility } from '../../../common/components/modals/ModalUtility';
import { TableUtilities } from '../../../common/components/tables/TableUtilities';
import { AdminSettings } from '../../../common/components/templates/AdminSettings';
import { NextPageWithLayout } from '../../_app';

const Utilities: NextPageWithLayout = () => {
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
      {/* Utilities */}
      <TableUtilities
        onAdd={() => handleOnAction('Create')}
        onDelete={(id: number) => handleOnAction('Delete', id)}
        onEdit={(id: number) => handleOnAction('Edit', id)}
        onView={(id: number) => handleOnAction('View', id)}
      />

      {/* Modals */}
      <ModalUtility
        id={propertySettingsId}
        isOpen={isModalOpen}
        type={type}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

Utilities.getLayout = (page: React.ReactElement) => (
  <AdminSettings>{page}</AdminSettings>
);

export default Utilities;
