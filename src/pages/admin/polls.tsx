import { Box } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import React from 'react';

import { ModalPoll } from '../../common/components/modals/ModalPoll';
import { TablePolls } from '../../common/components/tables/TablePolls';
import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Polls: NextPageWithLayout = () => {
  const [type, setType] = React.useState<Data.Action>('Create');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [pollId, setPollId] = React.useState(0);

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
      setPollId(id);
    }

    setType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Bread Crumbs  */}
      <Box>
        <Breadcrumbs items={['Home', 'Polls']} title="Polls" />
      </Box>

      {/* Polls */}
      <Box mb="xl" mt="xl">
        <TablePolls
          onAdd={() => handleOnAction('Create')}
          onDelete={(id: number) => handleOnAction('Delete', id)}
          onView={(id: number) => handleOnAction('View', id)}
        />
      </Box>

      {/* Modals */}
      <ModalPoll
        id={pollId}
        isOpen={isModalOpen}
        type={type}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

Polls.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default Polls;
