import { Alert, Button, Group, Text } from '@mantine/core';
import React from 'react';

import { useDeletePropertySetting } from '../../hooks/api';

type Props = {
  id: number;
  settingsType: 'Block' | 'Phase' | 'Type' | 'Lot';
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormDeletePropertySettings: React.FC<Props> = ({
  id,
  settingsType,
  onCancel,
  onSuccess,
}) => {
  const {
    mutate: deletePropertySetting,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useDeletePropertySetting(settingsType)(id);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // delete property setting
    deletePropertySetting();
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess(`${settingsType} deleted successfully`);

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
          title={`Encountered an error while deleting ${settingsType.toLowerCase()}`}
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <Text>
          Are you sure you want to delete this {settingsType.toLowerCase()} ?
        </Text>

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
