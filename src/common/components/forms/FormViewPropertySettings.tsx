import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { PropertySettingsEditParams } from '../../../types';
import { useGetPropertySetting } from '../../hooks/api';
import { createPropertySettingsSchema } from '../../validations';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  settingsType: 'Block' | 'Phase' | 'Type';
  onCancel: () => void;
};

export const FormViewPropertySettings: React.FC<Props> = ({
  id,
  settingsType,
  onCancel,
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

  const { data: getPropertySetting, isLoading } =
    useGetPropertySetting(settingsType)(id);

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
      <TextInput
        disabled
        label="Name"
        placeholder="ex: sample-name"
        {...form.getInputProps('name')}
      />

      <TextInput
        disabled
        label="Display"
        mt="md"
        placeholder="ex: Sample Name"
        {...form.getInputProps('display')}
      />

      <Textarea
        disabled
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
      </Group>
    </>
  );
};
