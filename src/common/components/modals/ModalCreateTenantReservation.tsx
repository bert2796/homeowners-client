import { DateSelectArg } from '@fullcalendar/common';
import { Button, Group, SimpleGrid, TextInput } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import day from 'dayjs';
import React from 'react';

import { useAuth } from '../../hooks';
import { useCreateReservation } from '../../hooks/api';
import { ModalInstance } from './ModalInstance';

type Props = {
  facility?: Data.Facility;
  date?: DateSelectArg;
  isOpen: boolean;
  onSuccess: (message: string) => void;
  onClose: () => void;
};

export const ModalCreateTenantReservation: React.FC<Props> = ({
  facility,
  date,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const auth = useAuth();
  const {
    mutate: createReservation,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useCreateReservation();

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    if (auth.user && date && facility) {
      createReservation({
        endDate: date?.end.toString(),
        facilityId: facility.id,
        startDate: date?.start.toString(),
        tenantId: auth.user.id,
        totalAmount: '0',
      });
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Reservation created successfully');

      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <ModalInstance isOpen={isOpen} title="Create Reservation" onClose={onClose}>
      <form onSubmit={handleFormSubmit}>
        <TextInput
          disabled
          label="Facility"
          placeholder="Facility name"
          value={facility?.name}
        />

        <SimpleGrid
          breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
          cols={2}
          mt="md"
        >
          <TextInput
            disabled
            label="Start Date"
            value={day(date?.start).format('MM/DD/YYYY')}
          />

          <TimeInput disabled format="24" label="Time" value={date?.start} />
        </SimpleGrid>

        <SimpleGrid
          breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
          cols={2}
          mt="md"
        >
          <TextInput
            disabled
            label="End Date"
            value={day(date?.end).format('MM/DD/YYYY')}
          />

          <TimeInput disabled format="24" label="Time" value={date?.end} />
        </SimpleGrid>

        <Group mt="md" position="right">
          <Button
            disabled={isLoading}
            mt="xl"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            loading={isLoading}
            mt="xl"
            type="submit"
          >
            Submit
          </Button>
        </Group>
      </form>
    </ModalInstance>
  );
};
