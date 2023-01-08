import { Alert, Button, Group, Textarea, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { UtilityCreateParams } from '../../../types';
import { useCreateUtility } from '../../hooks/api';
import { createPropertySettingsSchema } from '../../validations';

type Props = {
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormCreateUtility: React.FC<Props> = ({ onCancel, onSuccess }) => {
  const {
    mutate: createUtility,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useCreateUtility();
  const form = useForm<UtilityCreateParams>({
    initialValues: {
      description: '',
      display: '',
      name: '',
    },
    validate: joiResolver(createPropertySettingsSchema),
  });

  const isSubmitDisabled = React.useMemo(
    () =>
      Object.entries(form.values).some(([key, value]) =>
        key === 'description' ? false : !value
      ),
    [form.values]
  );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // validate form
    form.validate();

    if (!Object.keys(form.errors).length) {
      createUtility(form.values);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Utility created successfully');

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
          title="Encountered an error while creating utility"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <TextInput
          required
          label="Name"
          placeholder="ex: sample-name"
          {...form.getInputProps('name')}
        />

        <TextInput
          required
          label="Display"
          mt="md"
          placeholder="ex: Sample Name"
          {...form.getInputProps('display')}
        />

        <Textarea
          label="Description"
          minRows={3}
          mt="md"
          placeholder="ex: this is a sample description"
          {...form.getInputProps('description')}
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
