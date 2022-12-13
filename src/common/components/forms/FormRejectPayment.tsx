import {
  Alert,
  Button,
  Group,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

import { PaymentEditParams } from '../../../types';
import { useRejectPayment } from '../../hooks/api';

type Props = {
  id: number;
  type: 'lease' | 'reservation';
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormRejectPayment: React.FC<Props> = ({
  id,
  type,
  onCancel,
  onSuccess,
}) => {
  const form = useForm<PaymentEditParams>({
    initialValues: {
      otherReason: '',
      otherReasonDetails: '',
      reason: '',
      status: 'Rejected',
    },
  });

  const {
    mutate: rejectPayment,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useRejectPayment(id, type, form.values);

  const isSubmitDisabled =
    !form.values.reason ||
    (form.values.reason === 'others' && !form.values.otherReason) ||
    isLoading;

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // reject payment
    rejectPayment();
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Payment reject successfully');

      onCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      {isError && (
        <Alert
          color="red"
          mb={20}
          title="Encountered an error while rejecting payment"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <Select
          required
          data={[
            { label: 'Transaction Not Found', value: 'transaction_not_found' },
            { label: 'Other', value: 'other' },
          ]}
          label="Reason"
          {...form.getInputProps('reason')}
        />

        {form.values.reason === 'other' && (
          <TextInput
            label="Other Reason"
            mt="md"
            required={form.values.reason === 'other'}
            {...form.getInputProps('otherReason')}
          />
        )}

        <Textarea
          label="Details"
          mt="md"
          {...form.getInputProps('otherReasonDetails')}
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
          <Button
            disabled={isSubmitDisabled}
            loading={isLoading}
            mt="xl"
            type="submit"
          >
            Submit
          </Button>
        </Group>
      </form>
    </>
  );
};
