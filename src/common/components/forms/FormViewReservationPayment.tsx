import {
  Box,
  Button,
  Divider,
  Group,
  List,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

import { useGetReservationPayment } from '../../hooks/api';
import { getPaymentReason } from '../../utils';
import { InputAmountPHP } from '../inputs/InputAmountPHP';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
};

export const FormViewReservationPayment: React.FC<Props> = ({
  id,
  onCancel,
}) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);

  const form = useForm<Partial<Data.ReservationPayment>>({
    initialValues: {
      amount: '',
      otherReason: '',
      otherReasonDetails: '',
      reason: '',
      reservationId: id,
      reservationPaymentImages: [],
    },
  });

  const { data: getReservationPayment, isLoading } =
    useGetReservationPayment(id);

  // set values in form after getting tenant
  React.useEffect(() => {
    if (!isDataMounted && getReservationPayment?.data) {
      form.setValues(getReservationPayment?.data);

      setIsDataMounted(true);
    }
  }, [form, getReservationPayment?.data, isDataMounted]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TextInput disabled label="Status" value={form.values.status} />

      <InputAmountPHP
        disabled
        label="Amount"
        mt="md"
        placeholder="ex: 1000"
        value={parseInt(form.values.amount || '0')}
      />

      <Text mt="md">Uploaded proof of payment</Text>

      <List>
        {form.values?.reservationPaymentImages?.map((image, index) => (
          <List.Item key={index}>
            <a href={image.url} rel="noreferrer" target="_blank">
              Proof of payment #{index + 1}
            </a>
          </List.Item>
        ))}
      </List>

      {form.values.status === 'Rejected' && (
        <>
          <Divider my="sm" variant="dashed" />

          <Box mt="xl">
            <Text>Reason why payment got rejected</Text>

            <TextInput
              disabled
              label="Reason"
              value={getPaymentReason(form.values.reason || '')}
            />

            {form.values.reason === 'other' && (
              <TextInput
                disabled
                label="Other Reason"
                mt="md"
                {...form.getInputProps('otherReason')}
              />
            )}

            <Textarea
              disabled
              label="Details"
              mt="md"
              {...form.getInputProps('otherReasonDetails')}
            />
          </Box>
        </>
      )}

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
