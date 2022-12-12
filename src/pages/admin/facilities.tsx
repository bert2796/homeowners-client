import { Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import React from 'react';

import { ModalFacility } from '../../common/components/modals/ModalFacility';
import { TableFacilities } from '../../common/components/tables/TableFacilities';
import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Facilities: NextPageWithLayout = () => {
  const [type, setType] = React.useState<Data.Action>('Create');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [facilityId, setFacilityId] = React.useState(0);

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
      setFacilityId(id);
    }

    setType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Facilities']} title="Facilities" />
      </Box>

      {/* Announcements */}
      <Box mb="xl" mt="xl">
        <TableFacilities
          onAdd={() => handleOnAction('Create')}
          onDelete={(id: number) => handleOnAction('Delete', id)}
          onEdit={(id: number) => handleOnAction('Edit', id)}
          onView={(id: number) => handleOnAction('View', id)}
        />
      </Box>

      {/* Modals */}
      <ModalFacility
        id={facilityId}
        isOpen={isModalOpen}
        type={type}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

Facilities.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default Facilities;
