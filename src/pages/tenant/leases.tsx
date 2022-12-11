import { Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import React from 'react';

import { ModalLease } from '../../common/components/modals/ModalLease';
import { TableLeases } from '../../common/components/tables/TableLeases';
import { Tenant } from '../../common/components/templates/Tenant';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { useAuth } from '../../common/hooks';
import { NextPageWithLayout } from '../_app';

const Leases: NextPageWithLayout = () => {
  const { user } = useAuth();

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
          userId={user?.id}
          onPay={(id: number) => handleOnAction('Pay', id)}
          onView={(id: number) => handleOnAction('View', id)}
          onViewPayment={(id: number) => handleOnAction('View Payment', id)}
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

Leases.getLayout = (page: React.ReactElement) => <Tenant>{page}</Tenant>;

export default Leases;
