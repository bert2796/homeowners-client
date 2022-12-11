import { Alert, Button, Group, Text } from '@mantine/core';
import React from 'react';

import { useApprovePayment } from '../../hooks/api';

type Props = {
  id: number;
  type: 'lease' | 'facility';
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormApprovePayment: React.FC<Props> = ({
  id,
  type,
  onCancel,
  onSuccess,
}) => {
  const {
    mutate: approvePayment,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useApprovePayment(id, type);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // approve payment
    approvePayment();
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Payment approved successfully');

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
          title="Encountered an error while approving payment"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <Text>Are you sure you want to approve this payment ?</Text>

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
            disabled={isLoading}
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
