import { Alert, Button, Group, Textarea, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { ExtraChargeCreateParams } from '../../../types';
import { useCreateExtraCharge } from '../../hooks/api';
import { createPropertySettingsSchema } from '../../validations';

type Props = {
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormCreateExtraCharge: React.FC<Props> = ({
  onCancel,
  onSuccess,
}) => {
  const {
    mutate: createExtraCharge,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useCreateExtraCharge();
  const form = useForm<ExtraChargeCreateParams>({
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
      createExtraCharge(form.values);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Extra charge created successfully');

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
          title="Encountered an error while creating extra charge"
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
