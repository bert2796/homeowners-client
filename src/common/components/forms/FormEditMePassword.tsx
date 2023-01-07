import { Button, PasswordInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { MePasswordEditParams } from '../../../types';
import { useEditMePassword } from '../../hooks/api';
import { editPasswordSchema } from '../../validations';

type Props = {
  onSuccess: (message: string) => void;
};

export const FormEditMePassword: React.FC<Props> = ({ onSuccess }) => {
  const {
    mutate: editMePassword,
    reset,
    isLoading: isEditMeLoading,
    isSuccess,
    isError,
  } = useEditMePassword();
  const form = useForm<MePasswordEditParams & { confirmNewPassword: string }>({
    initialValues: {
      confirmNewPassword: '',
      currentPassword: '',
      newPassword: '',
    },
    validate: joiResolver(editPasswordSchema),
  });

  const isSubmitDisabled = Object.values(form.values).some((value) => !value);

  const handleFormSubmit = () => {
    reset();

    editMePassword(form.values);
  };

  React.useEffect(() => {
    if (isSuccess) {
      // reset form to make isSuccess to be false
      reset();

      // reset form as well
      form.reset();

      onSuccess('Password updated successfully');
    }
  }, [form, form.values, isSuccess, onSuccess, reset]);

  return (
    <>
      <form onSubmit={form.onSubmit(() => handleFormSubmit())}>
        <PasswordInput
          required
          label="Current Password"
          placeholder="Your current password"
          {...form.getInputProps('currentPassword')}
          error={isError ? 'Password is invalid' : ''}
        />

        <PasswordInput
          required
          label="New Password"
          mt="lg"
          placeholder="Your new password"
          {...form.getInputProps('newPassword')}
        />

        <PasswordInput
          required
          label="Confirm New Password"
          mt="lg"
          placeholder="Confirm new password"
          {...form.getInputProps('confirmNewPassword')}
        />

        <Button
          disabled={isSubmitDisabled}
          loading={isEditMeLoading}
          mt="xl"
          type="submit"
        >
          Save
        </Button>
      </form>
    </>
  );
};
