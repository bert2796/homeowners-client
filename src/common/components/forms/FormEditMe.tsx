import { Alert, Button, TextInput } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import React from 'react';

import { useAuth } from '../../hooks';
import { useEditMe } from '../../hooks/api';
import avatar from '../../resources/images/user.png';
import { hasDataChanges } from '../../utils';
import { AvatarUploader } from '../uploaders/AvatarUploader';

type Props = {
  onSuccess: (message: string) => void;
};

export const FormEditMe: React.FC<Props> = ({ onSuccess }) => {
  const [files, setFiles] = React.useState<FileWithPath[]>([]);
  const [isDataMounted, setIsDataMounted] = React.useState(false);
  const { user, updateCurrentUser } = useAuth();
  const {
    mutate: editMe,
    reset,
    isLoading: isEditMeLoading,
    isSuccess,
    isError,
    data: editMeData,
  } = useEditMe();
  const form = useForm<Partial<Data.User>>({
    initialValues: {
      email: '',
      firstName: '',
      lastName: '',
      middleName: '',
      username: '',
    },
  });

  const isSubmitDisabled = React.useMemo(() => {
    const hasNoChanges = user
      ? !hasDataChanges(
          {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName || '',
            username: user.username,
          },
          form.values
        )
      : true;

    const hasFiles = files.length;

    return !hasFiles && hasNoChanges;
  }, [files.length, form.values, user]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // validate form
    form.validate();

    editMe({
      ...(files.length && { avatar: files[0] }),
      ...(form.values.email && { email: form.values.email }),
      ...(form.values.firstName && { firstName: form.values.firstName }),
      ...(form.values.middleName && { middleName: form.values.middleName }),
      ...(form.values.lastName && { lastName: form.values.lastName }),
      ...(form.values.username && { username: form.values.username }),
    });
  };

  React.useEffect(() => {
    if (!isDataMounted && user) {
      form.setValues({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName || '',
        username: user.username,
      });

      setIsDataMounted(true);
    }
  }, [form, user, isDataMounted]);

  React.useEffect(() => {
    if (isSuccess && user) {
      const isFormChanged = hasDataChanges(
        {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName || '',
          username: user.username,
        },
        form.values
      );

      const isAvatarChanged = user.avatar !== editMeData?.data.avatar;

      if (updateCurrentUser && (isFormChanged || isAvatarChanged)) {
        updateCurrentUser({
          ...form.values,
          avatar: editMeData.data.avatar,
        });

        // remove files
        setFiles([]);

        // reset form to make isSuccess to be false
        reset();

        onSuccess('Profile updated successfully');
      }
    }
  }, [
    editMeData?.data.avatar,
    form.values,
    isSuccess,
    onSuccess,
    reset,
    updateCurrentUser,
    user,
  ]);

  return (
    <>
      {isError && (
        <Alert
          color="red"
          mb={20}
          title="Encountered an error while updating the profile"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <AvatarUploader
          avatar={user?.avatar || avatar.src}
          files={files}
          onSetFiles={(filesFromDZ) => setFiles(filesFromDZ)}
        />
        <TextInput
          required
          label="First Name"
          mt="md"
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

        <TextInput
          required
          label="Email"
          mt="md"
          placeholder="juandelacruz@mail.com"
          {...form.getInputProps('email')}
        />

        <TextInput
          required
          label="Username"
          mt="md"
          placeholder="juandelacruz"
          {...form.getInputProps('username')}
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
