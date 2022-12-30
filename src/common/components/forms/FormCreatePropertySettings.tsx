import { Alert, Button, Group, Textarea, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { PropertySettingsCreateParams } from '../../../types';
import { useCreatePropertySetting } from '../../hooks/api';
import { createPropertySettingsSchema } from '../../validations';
import { Loader } from '../widgets/Loader';

type Props = {
  settingsType: 'Block' | 'Phase' | 'Type' | 'Lot';
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormCreatePropertySettings: React.FC<Props> = ({
  settingsType,
  onCancel,
  onSuccess,
}) => {
  const {
    mutate: createPropertySetting,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useCreatePropertySetting(settingsType)();
  const form = useForm<PropertySettingsCreateParams>({
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
      createPropertySetting(form.values);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess(`${settingsType} created successfully`);

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
          title={`Encountered an error while creating ${settingsType.toLowerCase()}`}
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
