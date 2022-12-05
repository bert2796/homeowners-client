import { Alert, Button, Group, Text } from '@mantine/core';
import React from 'react';

import { useDeleteStaff } from '../../hooks/api';

type Props = {
  id: number;
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormDeleteStaff: React.FC<Props> = ({
  id,
  onCancel,
  onSuccess,
}) => {
  const {
    mutate: deleteStaff,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useDeleteStaff(id);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // delete staff
    deleteStaff();
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Staff deleted successfully');

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
          title="Encountered an error while deleting Staff"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <Text>Are you sure you want to delete this Staff ?</Text>

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
