import { Button, Group, SimpleGrid, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { UserEditParams } from '../../../types';
import { useGetStaff } from '../../hooks/api';
import { createUserSchema } from '../../validations';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
};

export const FormViewStaff: React.FC<Props> = ({ id, onCancel }) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);

  const form = useForm<UserEditParams>({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      middleName: '',
      password: '',
      role: 'Staff',
      username: '',
    },
    validate: joiResolver(createUserSchema),
  });

  const { data: getStaff, isLoading } = useGetStaff(id);

  // set values in form after getting tenant
  React.useEffect(() => {
    if (!isDataMounted && getStaff?.data) {
      form.setValues(getStaff?.data);

      setIsDataMounted(true);
    }
  }, [form, getStaff?.data, isDataMounted]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TextInput
        disabled
        label="First Name"
        placeholder="Juan"
        {...form.getInputProps('firstName')}
      />

      <TextInput
        disabled
        label="Middle Name"
        mt="md"
        placeholder="Dela Cruz"
        {...form.getInputProps('middleName')}
      />

      <TextInput
        disabled
        label="Last Name"
        mt="md"
        placeholder="Dela Cruz"
        {...form.getInputProps('lastName')}
      />

      <SimpleGrid breakpoints={[{ cols: 1, maxWidth: 'sm' }]} cols={2} mt="md">
        <TextInput
          disabled
          label="Email"
          placeholder="juandelacruz@mail.com"
          {...form.getInputProps('email')}
        />

        <TextInput
          disabled
          label="Username"
          placeholder="juandelacruz"
          {...form.getInputProps('username')}
        />
      </SimpleGrid>

      <Group mt="md" position="right">
        <Button
          disabled={isLoading}
          mt="xl"
          variant="outline"
          onClick={onCancel}
        >
          Close
        </Button>
      </Group>
    </>
  );
};
