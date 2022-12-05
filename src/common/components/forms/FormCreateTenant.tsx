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

import { UserCreateParams } from '../../../types';
import { useCreateTenant } from '../../hooks/api';
import { generatePassword } from '../../utils';
import { createUserSchema } from '../../validations';
import { Loader } from '../widgets/Loader';

type Props = {
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormCreateTenant: React.FC<Props> = ({ onCancel, onSuccess }) => {
  const {
    mutate: createTenant,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useCreateTenant();
  const form = useForm<UserCreateParams>({
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

  const isSubmitDisabled = React.useMemo(
    () =>
      Object.entries(form.values).some(([key, value]) =>
        key === 'middleName' ? false : !value
      ),
    [form.values]
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
      createTenant(form.values);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Tenant created successfully');

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
          title="Encountered an error while creating tenant"
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
          placeholder="Martinez"
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
            required
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
