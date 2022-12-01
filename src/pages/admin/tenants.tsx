import { Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import React from 'react';

import { withAuth } from '../../common/components/hoc/withAuth';
import { ModalTenant } from '../../common/components/modals/ModalTenant';
import { TableTenants } from '../../common/components/tables/TableTenants';
import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Tenants: NextPageWithLayout = () => {
  const [type, setType] = React.useState<Data.Action>('Create');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [tenantId, setTenantId] = React.useState(0);

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
      setTenantId(id);
    }

    setType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Tenants']} title="Tenants" />
      </Box>

      {/* Tenants */}
      <Box mb="xl" mt="xl">
        <TableTenants
          onAdd={() => handleOnAction('Create')}
          onDelete={(id: number) => handleOnAction('Delete', id)}
          onEdit={(id: number) => handleOnAction('Edit', id)}
          onView={(id: number) => handleOnAction('View', id)}
        />
      </Box>

      {/* Modals */}
      <ModalTenant
        id={tenantId}
        isOpen={isModalOpen}
        type={type}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

Tenants.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default withAuth(Tenants);
