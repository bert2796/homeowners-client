/* eslint-disable simple-import-sort/imports */
import { DateSelectArg, EventSourceInput } from '@fullcalendar/react'; // must go before plugins
import { Box, Tabs } from '@mantine/core';
import React from 'react';
import { IconBorderAll, IconCalendarEvent, IconCheck } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import day from 'dayjs';

import { useAuth } from '../../common/hooks';
import { useGetReservations } from '../../common/hooks/api';
import { Tenant } from '../../common/components/templates/Tenant';
import { ModalCreateTenantReservation } from '../../common/components/modals/ModalCreateTenantReservation';
import { TenantReservation } from '../../common/components/reservations/TenantReservations';
import { ModalReservation } from '../../common/components/modals/ModalReservation';
import { TableReservations } from '../../common/components/tables/TableReservations';
import { Breadcrumbs } from '../../common/components/widgets/Breadcrumbs';
import { NextPageWithLayout } from '../_app';

const Reservations: NextPageWithLayout = () => {
  const { user } = useAuth();
  const { data: getReservations } = useGetReservations(user?.id);

  const [selectedDate, setSelectedDate] = React.useState<DateSelectArg>();
  const [selectedFacility, setSelectedFacility] =
    React.useState<Data.Facility>();
  const [isReservationModalOpen, setIsReservationModalOpen] =
    React.useState(false);
  const [type, setType] = React.useState<Data.Action>('Create');
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [reservationId, setReservationId] = React.useState(0);

  const reservationEvents = React.useMemo(() => {
    return (
      getReservations?.data.map((reservation) => ({
        end: day(reservation.endDate).format('YYYY-MM-DThh:mm:ss'),
        id: `${reservation.id}`,
        start: day(reservation.startDate).format('YYYY-MM-DThh:mm:ss'),
        title: 'Occupied',
      })) || []
    );
  }, [getReservations?.data]);

  const handleOpenReservationModal = (
    date: DateSelectArg,
    facility: Data.Facility
  ) => {
    setSelectedDate(date);
    setSelectedFacility(facility);

    setIsReservationModalOpen(true);
  };

  const handleCloseReservationModal = () => {
    setSelectedDate(undefined);
    setSelectedFacility(undefined);

    setIsReservationModalOpen(false);
  };

  const handleOnAction = (type: Data.Action, id?: number) => {
    if (id) {
      setReservationId(id);
    }

    setType(type);
    setIsModalOpen(true);
  };

  const handleSuccess = (message: string) => {
    showNotification({
      color: 'green',
      icon: <IconCheck size={14} />,
      message,
      title: 'Success',
    });
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
              userId={user?.id}
              onPay={(id: number) => handleOnAction('Pay', id)}
              onView={(id: number) => handleOnAction('View', id)}
              onViewPayment={(id: number) => handleOnAction('View Payment', id)}
            />
          </Tabs.Panel>

          <Tabs.Panel value="calendar">
            <Box>
              <TenantReservation
                events={reservationEvents as EventSourceInput}
                onReserve={handleOpenReservationModal}
              />
            </Box>
          </Tabs.Panel>
        </Tabs>
      </Box>

      {/* Modals */}
      <ModalCreateTenantReservation
        date={selectedDate}
        facility={selectedFacility}
        isOpen={isReservationModalOpen}
        onClose={handleCloseReservationModal}
        onSuccess={handleSuccess}
      />

      {/* Modals */}
      <ModalReservation
        id={reservationId}
        isOpen={isModalOpen}
        type={type}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

Reservations.getLayout = (page: React.ReactElement) => <Tenant>{page}</Tenant>;

export default Reservations;
