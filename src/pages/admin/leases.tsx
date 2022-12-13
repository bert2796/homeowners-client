import { Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import React from 'react';

import { ModalLease } from '../../common/components/modals/ModalLease';
import { TableLeases } from '../../common/components/tables/TableLeases';
import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Leases: NextPageWithLayout = () => {
  const [type, setType] = React.useState<Data.Action>('Create');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [leaseId, setLeaseId] = React.useState(0);

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
      setLeaseId(id);
    }

    setType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Leases']} title="Leases" />
      </Box>

      {/* Leases */}
      <Box mb="xl" mt="xl">
        <TableLeases
          onAdd={() => handleOnAction('Create')}
          onDelete={(id: number) => handleOnAction('Delete', id)}
          // onEdit={(id: number) => handleOnAction('Edit', id)}
          onView={(id: number) => handleOnAction('View', id)}
        />
      </Box>

      {/* Modals */}
      <ModalLease
        id={leaseId}
        isOpen={isModalOpen}
        type={type}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

Leases.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default Leases;
