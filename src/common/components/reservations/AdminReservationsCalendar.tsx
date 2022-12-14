/* eslint-disable simple-import-sort/imports */
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import { CalendarOptions } from '@fullcalendar/common';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Select, Group } from '@mantine/core';
import React from 'react';

import { useGetFacilities } from '../../hooks/api';

type Props = CalendarOptions;

export const AdminReservationsCalendar: React.FC<Props> = (props) => {
  const [facilityId, setFacilityId] = React.useState(0);

  const { isLoading: isGetFacilitiesLoading, data: getFacilities } =
    useGetFacilities();

  const isLoading = React.useMemo(
    () => isGetFacilitiesLoading,
    [isGetFacilitiesLoading]
  );

  const facilityOptions = React.useMemo(() => {
    return (
      getFacilities?.data.map((facility) => ({
        label: facility.name,
        value: `${facility.id}`,
      })) || []
    );
  }, [getFacilities?.data]);

  const facility = React.useMemo(() => {
    return getFacilities?.data.find((facility) => facility.id === facilityId);
  }, [facilityId, getFacilities?.data]);

  return (
    <>
      {/* Calendar */}
      <Box bg="#fff" mb="xl" mt="xl" p="md">
        <Group>
          {facilityOptions?.length && (
            <Select
              data={facilityOptions}
              label="Select Facility"
              mb="xl"
              placeholder="ex: Basketball court"
              onChange={(value) => value && setFacilityId(+value)}
            />
          )}
        </Group>

        {facility && (
          <FullCalendar
            events={props.events}
            headerToolbar={{
              center: 'title',
              left: 'dayGridMonth,timeGridWeek,timeGridDay',
              right: 'prev,next,day',
            }}
            initialView="dayGridMonth"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            slotMaxTime="24:00:00"
            slotMinTime="00:00:00"
          />
        )}
      </Box>
    </>
  );
};
