import { Alert, Button, Group, Text } from '@mantine/core';
import React from 'react';

import { useDeleteExtraCharge } from '../../hooks/api';

type Props = {
  id: number;
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormDeleteExtraCharge: React.FC<Props> = ({
  id,
  onCancel,
  onSuccess,
}) => {
  const {
    mutate: deleteExtraCharge,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useDeleteExtraCharge(id);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // delete  utility
    deleteExtraCharge();
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('ExtraCharge deleted successfully');

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
          title="Encountered an error while deleting extra charge"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <Text>Are you sure you want to delete this extra charge ?</Text>

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
            Delete
          </Button>
        </Group>
      </form>
    </>
  );
};
