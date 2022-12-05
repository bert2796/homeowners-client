import { Alert, Button, Group, Textarea, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { PropertySettingsEditParams } from '../../../types';
import { useEditPropertySetting, useGetPropertySetting } from '../../hooks/api';
import { hasDataChanges } from '../../utils';
import { createPropertySettingsSchema } from '../../validations';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  settingsType: 'Block' | 'Phase' | 'Type';
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormEditPropertySettings: React.FC<Props> = ({
  id,
  settingsType,
  onCancel,
  onSuccess,
}) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);

  const form = useForm<PropertySettingsEditParams>({
    initialValues: {
      description: '',
      display: '',
      name: '',
    },
    validate: joiResolver(createPropertySettingsSchema),
  });

  const {
    mutate: editPropertySetting,
    reset,
    isLoading: isEditPropertySettingLoading,
    isSuccess,
    isError,
  } = useEditPropertySetting(settingsType)(id, form.values);
  const { data: getPropertySetting, isLoading: isGetPropertySettingLoading } =
    useGetPropertySetting(settingsType)(id);

  const isLoading = React.useMemo(
    () => isEditPropertySettingLoading || isGetPropertySettingLoading,
    [isEditPropertySettingLoading, isGetPropertySettingLoading]
  );

  const isSubmitDisabled = React.useMemo(
    () =>
      getPropertySetting?.data
        ? !hasDataChanges(
            { ...getPropertySetting?.data, password: '' },
            form.values
          )
        : true,
    [form.values, getPropertySetting?.data]
  );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // validate form
    form.validate();

    if (!Object.keys(form.errors).length) {
      editPropertySetting();
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess(`${settingsType} edited successfully`);

      onCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // set values in form after getting tenant
  React.useEffect(() => {
    if (!isDataMounted && getPropertySetting?.data) {
      form.setValues(getPropertySetting?.data);

      setIsDataMounted(true);
    }
  }, [form, getPropertySetting?.data, isDataMounted]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isError && (
        <Alert
          color="red"
          mb={20}
          title={`Encountered an error while editing ${settingsType.toLowerCase()}`}
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
