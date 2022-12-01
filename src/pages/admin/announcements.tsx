import { Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import React from 'react';

import { withAuth } from '../../common/components/hoc/withAuth';
import { ModalAnnouncement } from '../../common/components/modals/ModalAnnouncement';
import { TableAnnouncements } from '../../common/components/tables/TableAnnouncements';
import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Announcements: NextPageWithLayout = () => {
  const [type, setType] = React.useState<Data.Action>('Create');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [announcementId, setAnnouncementId] = React.useState(0);

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
      setAnnouncementId(id);
    }

    setType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Announcements']} title="Announcements" />
      </Box>

      {/* Announcements */}
      <Box mb="xl" mt="xl">
        <TableAnnouncements
          onAdd={() => handleOnAction('Create')}
          onDelete={(id: number) => handleOnAction('Delete', id)}
          onEdit={(id: number) => handleOnAction('Edit', id)}
          onView={(id: number) => handleOnAction('View', id)}
        />
      </Box>

      {/* Modals */}
      <ModalAnnouncement
        id={announcementId}
        isOpen={isModalOpen}
        type={type}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

Announcements.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default withAuth(Announcements);
