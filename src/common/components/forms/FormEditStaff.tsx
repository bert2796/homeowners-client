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
import { useEditStaff, useGetStaff } from '../../hooks/api';
import { generatePassword, hasDataChanges } from '../../utils';
import { createUserSchema } from '../../validations';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormEditStaff: React.FC<Props> = ({ id, onCancel, onSuccess }) => {
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

  const {
    mutate: editStaff,
    reset,
    isLoading: isEditStaffLoading,
    isSuccess,
    isError,
  } = useEditStaff(id, form.values);
  const { data: getStaff, isLoading: isGetStaffLoading } = useGetStaff(id);

  const isLoading = React.useMemo(
    () => isEditStaffLoading || isGetStaffLoading,
    [isEditStaffLoading, isGetStaffLoading]
  );

  const isSubmitDisabled = React.useMemo(
    () =>
      getStaff?.data
        ? !hasDataChanges({ ...getStaff?.data, password: '' }, form.values)
        : true,
    [form.values, getStaff?.data]
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
      editStaff();
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Staff edited successfully');

      onCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // set values in form after getting Staff
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
      {isError && (
        <Alert
          color="red"
          mb={20}
          title="Encountered an error while editing Staff"
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
