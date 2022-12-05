import { Alert, Button, Group, Textarea, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { UtilityEditParams } from '../../../types';
import { useEditUtility, useGetUtility } from '../../hooks/api';
import { hasDataChanges } from '../../utils';
import { createPropertySettingsSchema } from '../../validations';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormEditUtility: React.FC<Props> = ({
  id,
  onCancel,
  onSuccess,
}) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);

  const form = useForm<UtilityEditParams>({
    initialValues: {
      description: '',
      display: '',
      name: '',
    },
    validate: joiResolver(createPropertySettingsSchema),
  });

  const {
    mutate: editUtility,
    reset,
    isLoading: isEditUtilityLoading,
    isSuccess,
    isError,
  } = useEditUtility(id, form.values);
  const { data: getUtility, isLoading: isGetUtilityLoading } =
    useGetUtility(id);

  const isLoading = React.useMemo(
    () => isEditUtilityLoading || isGetUtilityLoading,
    [isEditUtilityLoading, isGetUtilityLoading]
  );

  const isSubmitDisabled = React.useMemo(
    () =>
      getUtility?.data
        ? !hasDataChanges({ ...getUtility?.data, password: '' }, form.values)
        : true,
    [form.values, getUtility?.data]
  );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // validate form
    form.validate();

    if (!Object.keys(form.errors).length) {
      editUtility();
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Utility edited successfully');

      onCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // set values in form after getting tenant
  React.useEffect(() => {
    if (!isDataMounted && getUtility?.data) {
      form.setValues(getUtility?.data);

      setIsDataMounted(true);
    }
  }, [form, getUtility?.data, isDataMounted]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isError && (
        <Alert
          color="red"
          mb={20}
          title="Encountered an error while editing utility"
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
