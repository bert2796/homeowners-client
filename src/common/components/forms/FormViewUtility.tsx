import { Button, Group, Textarea, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { UtilityEditParams } from '../../../types';
import { useGetUtility } from '../../hooks/api';
import { createPropertySettingsSchema } from '../../validations';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
};

export const FormViewUtility: React.FC<Props> = ({ id, onCancel }) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);

  const form = useForm<UtilityEditParams>({
    initialValues: {
      description: '',
      display: '',
      name: '',
    },
    validate: joiResolver(createPropertySettingsSchema),
  });

  const { data: getUtility, isLoading } = useGetUtility(id);

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
