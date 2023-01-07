/* eslint-disable simple-import-sort/imports */
import FullCalendar, { DateSelectArg } from '@fullcalendar/react'; // must go before plugins
import { CalendarOptions } from '@fullcalendar/common';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, Select, Group } from '@mantine/core';
import React from 'react';

import { useGetFacilities } from '../../hooks/api';

type Props = CalendarOptions & {
  onReserve: (date: DateSelectArg, facility: Data.Facility) => void;
};

export const TenantReservation: React.FC<Props> = (props) => {
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
            dayMaxEvents
            editable
            selectMirror
            selectable
            eventClick={props.eventClick}
            eventOverlap={false}
            events={props.events}
            headerToolbar={{
              center: 'title',
              left: 'dayGridMonth,timeGridWeek,timeGridDay',
              right: 'prev,next,day',
            }}
            initialView="dayGridMonth"
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            select={(date) => props.onReserve(date, facility)}
            selectAllow={(selectInfo) =>
              selectInfo.start.getDay() === selectInfo.end.getDay()
            }
            selectOverlap={false}
            slotDuration={
              facility.facilityPaymentSetting.type === 'PerHour'
                ? '01:00:00'
                : '08:00:00'
            }
            slotEventOverlap={false}
            slotMaxTime="24:00:00"
            slotMinTime="00:00:00"
            unselectAuto={false}
          />
        )}
      </Box>
    </>
  );
};
