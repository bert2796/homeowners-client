import { Box } from '@mantine/core';
import React from 'react';

import { ModalAnnouncement } from '../../common/components/modals/ModalAnnouncement';
import { TableAnnouncements } from '../../common/components/tables/TableAnnouncements';
import { Tenant } from '../../common/components/templates/Tenant';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Announcements: NextPageWithLayout = () => {
  const [type, setType] = React.useState<Data.Action>('Create');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [announcementId, setAnnouncementId] = React.useState(0);

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
          onView={(id: number) => handleOnAction('View', id)}
        />
      </Box>

      {/* Modals */}
      <ModalAnnouncement
        id={announcementId}
        isOpen={isModalOpen}
        type={type}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

Announcements.getLayout = (page: React.ReactElement) => <Tenant>{page}</Tenant>;

export default Announcements;
