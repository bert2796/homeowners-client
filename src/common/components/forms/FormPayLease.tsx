import { Alert, Button, Group, Text } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { LeasePaymentCreateParams } from '../../../types';
import { useCreateLeasePayment } from '../../hooks/api';
import { createAnnouncementSchema } from '../../validations';
import { InputAmountPHP } from '../inputs/InputAmountPHP';
import { PaymentUploader } from '../uploaders/PaymentUploader';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormPayLease: React.FC<Props> = ({ id, onCancel, onSuccess }) => {
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const {
    mutate: createLeasePayment,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useCreateLeasePayment();
  const form = useForm<LeasePaymentCreateParams>({
    initialValues: {
      amount: '',
      images: [],
      leaseId: id,
    },
    validate: joiResolver(createAnnouncementSchema),
  });

  const isSubmitDisabled = React.useMemo(
    () =>
      Object.entries(form.values).some(([key, value]) =>
        key === 'leasePaymentImages' ? false : !value
      ) || !files.length,
    [files.length, form.values]
  );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // validate form
    form.validate();

    if (!Object.keys(form.errors).length) {
      createLeasePayment({
        ...form.values,
        images: files,
      });
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Payment for lease submitted successfully');

      onCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isError && (
        <Alert
          color="red"
          mb={20}
          title="Encountered an error while submitting payment"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <InputAmountPHP
          required
          label="Amount"
          mb="md"
          placeholder="ex: 1000"
          value={parseInt(form.values.amount || '0')}
          onChange={(value) => {
            form.setFieldValue('amount', `${value}` || '0');
          }}
        />

        <Text>Upload proof of payment</Text>
        <PaymentUploader files={files} onSetFiles={setFiles} />

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
