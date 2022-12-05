import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import React from 'react';

import { ModalExtraCharge } from '../../../common/components/modals/ModalExtraCharge';
import { TableExtraCharges } from '../../../common/components/tables/TableExtraCharges';
import { AdminSettings } from '../../../common/components/templates/AdminSettings';
import { NextPageWithLayout } from '../../_app';

const ExtraCharges: NextPageWithLayout = () => {
  const [type, setType] = React.useState<Data.Action>('Create');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [extraChargeId, setExtraChargeId] = React.useState(0);

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
      setExtraChargeId(id);
    }

    setType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Extra charges */}
      <TableExtraCharges
        onAdd={() => handleOnAction('Create')}
        onDelete={(id: number) => handleOnAction('Delete', id)}
        onEdit={(id: number) => handleOnAction('Edit', id)}
        onView={(id: number) => handleOnAction('View', id)}
      />

      {/* Modals */}
      <ModalExtraCharge
        id={extraChargeId}
        isOpen={isModalOpen}
        type={type}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

ExtraCharges.getLayout = (page: React.ReactElement) => (
  <AdminSettings>{page}</AdminSettings>
);

export default ExtraCharges;
