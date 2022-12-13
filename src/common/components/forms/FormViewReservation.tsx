import { Button, Group, SimpleGrid, TextInput } from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import day from 'dayjs';
import React from 'react';

import { useGetReservation } from '../../hooks/api';
import { InputAmountPHP } from '../inputs/InputAmountPHP';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
};

export const FormViewReservation: React.FC<Props> = ({ id, onCancel }) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);

  const form = useForm<Partial<Data.Reservation>>({
    initialValues: {
      facility: undefined,
      tenant: undefined,
      totalAmount: '',
    },
  });

  const { data: getReservation, isLoading } = useGetReservation(id);

  // set values in form after getting tenant
  React.useEffect(() => {
    if (!isDataMounted && getReservation?.data) {
      form.setValues(getReservation?.data);

      setIsDataMounted(true);
    }
  }, [form, getReservation?.data, isDataMounted]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TextInput
        disabled
        label="Facility"
        placeholder="Facility name"
        value={form.values.facility?.name}
      />

      <SimpleGrid breakpoints={[{ cols: 1, maxWidth: 'sm' }]} cols={2} mt="md">
        <TextInput
          disabled
          label="Start Date"
          value={day(form.values.startDate).format('MM/DD/YYYY')}
        />

        <TimeInput
          disabled
          format="24"
          label="Time"
          value={
            form.values.startDate ? new Date(form.values.startDate) : new Date()
          }
        />
      </SimpleGrid>

      <SimpleGrid breakpoints={[{ cols: 1, maxWidth: 'sm' }]} cols={2} mt="md">
        <TextInput
          disabled
          label="End Date"
          value={day(form.values.endDate).format('MM/DD/YYYY')}
        />

        <TimeInput
          disabled
          format="24"
          label="Time"
          value={
            form.values.endDate ? new Date(form.values.endDate) : new Date()
          }
        />
      </SimpleGrid>

      <InputAmountPHP
        disabled
        mt="md"
        value={Number(form.values.totalAmount)}
      />

      <Group mt="md" position="right">
        <Button
          disabled={isLoading}
          mt="xl"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Group>
    </>
  );
};
