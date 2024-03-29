/* eslint-disable simple-import-sort/imports */
import { Box, Tabs } from '@mantine/core';
import React from 'react';
import { IconBorderAll, IconCalendarEvent, IconCheck } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

import { AdminReservationsCalendar } from '../../common/components/reservations/AdminReservationsCalendar';
import { ModalReservation } from '../../common/components/modals/ModalReservation';
import { Admin } from '../../common/components/templates/Admin';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { TableReservations } from '../../common/components/tables/TableReservations';
import { NextPageWithLayout } from '../_app';

const Reservations: NextPageWithLayout = () => {
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
        <Breadcrumbs items={['Home', 'Reservations']} title="Reservations" />
      </Box>

      {/* Calendar */}
      <Box bg="#fff" mb="xl" mt="xl" p="md">
        <Tabs defaultValue="calendar">
          <Tabs.List style={{ backgroundColor: '#fff' }}>
            <Tabs.Tab icon={<IconBorderAll />} value="table">
              Table
            </Tabs.Tab>
            <Tabs.Tab icon={<IconCalendarEvent />} value="calendar">
              Calendar
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="table">
            <TableReservations
              onDelete={(id: number) => handleOnAction('Delete', id)}
              // onEdit={(id: number) => handleOnAction('Edit', id)}
              onView={(id: number) => handleOnAction('View', id)}
            />
          </Tabs.Panel>

          <Tabs.Panel value="calendar">
            <AdminReservationsCalendar
              eventClick={(info) => handleOnAction('View', +info.event.id)}
            />
          </Tabs.Panel>
        </Tabs>

        {/* Modals */}
        <ModalReservation
          id={leaseId}
          isOpen={isModalOpen}
          type={type}
          onClose={() => setIsModalOpen(false)}
          onSuccess={handleSuccess}
        />
      </Box>
    </>
  );
};

Reservations.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default Reservations;
