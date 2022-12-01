import {
  Alert,
  Box,
  Button,
  Group,
  PasswordInput,
  SimpleGrid,
  TextInput,
} from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { UserEditParams } from '../../../types';
import { useEditTenant, useGetTenant } from '../../hooks/api';
import { generatePassword, hasDataChanges } from '../../utils';
import { createUserSchema } from '../../validations';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormEditTenant: React.FC<Props> = ({
  id,
  onCancel,
  onSuccess,
}) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);

  const form = useForm<UserEditParams>({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      middleName: '',
      password: '',
      role: 'Tenant',
      username: '',
    },
    validate: joiResolver(createUserSchema),
  });

  const {
    mutate: editTenant,
    reset,
    isLoading: isEditTenantLoading,
    isSuccess,
    isError,
  } = useEditTenant(id, form.values);
  const { data: getTenant, isLoading: isGetTenantLoading } = useGetTenant(id);

  const isLoading = React.useMemo(
    () => isEditTenantLoading || isGetTenantLoading,
    [isEditTenantLoading, isGetTenantLoading]
  );

  const isSubmitDisabled = React.useMemo(
    () =>
      getTenant?.data
        ? !hasDataChanges({ ...getTenant?.data, password: '' }, form.values)
        : true,
    [form.values, getTenant?.data]
  );

  const handleGeneratePassword = () => {
    const password = generatePassword();

    form.setFieldValue('password', password);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // validate form
    form.validate();

    if (!Object.keys(form.errors).length) {
      editTenant();
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Tenant edited successfully');

      onCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // set values in form after getting tenant
  React.useEffect(() => {
    if (!isDataMounted && getTenant?.data) {
      form.setValues(getTenant?.data);

      setIsDataMounted(true);
    }
  }, [form, getTenant?.data, isDataMounted]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isError && (
        <Alert
          color="red"
          mb={20}
          title="Encountered an error while editing tenant"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <TextInput
          required
          label="First Name"
          placeholder="Juan"
          {...form.getInputProps('firstName')}
        />

        <TextInput
          label="Middle Name"
          mt="md"
          placeholder="Dela Cruz"
          {...form.getInputProps('middleName')}
        />

        <TextInput
          required
          label="Last Name"
          mt="md"
          placeholder="Dela Cruz"
          {...form.getInputProps('lastName')}
        />

        <SimpleGrid
          breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
          cols={2}
          mt="md"
        >
          <TextInput
            required
            label="Email"
            placeholder="juandelacruz@mail.com"
            {...form.getInputProps('email')}
          />

          <TextInput
            required
            label="Username"
            placeholder="juandelacruz"
            {...form.getInputProps('username')}
          />
        </SimpleGrid>

        <Box mt="md" sx={{ alignItems: 'flex-end', display: 'flex' }}>
          <PasswordInput
            label="Password"
            mr="md"
            placeholder="Your password"
            w="70%"
            {...form.getInputProps('password')}
          />
          <Button
            disabled={isLoading}
            mt="xl"
            variant="outline"
            onClick={handleGeneratePassword}
          >
            Generate Password
          </Button>
        </Box>

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
