import { Alert, Button, Group, Textarea, TextInput } from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { ExtraChargeEditParams } from '../../../types';
import { useEditExtraCharge, useGetExtraCharge } from '../../hooks/api';
import { hasDataChanges } from '../../utils';
import { createPropertySettingsSchema } from '../../validations';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormEditExtraCharge: React.FC<Props> = ({
  id,
  onCancel,
  onSuccess,
}) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);

  const form = useForm<ExtraChargeEditParams>({
    initialValues: {
      description: '',
      display: '',
      name: '',
    },
    validate: joiResolver(createPropertySettingsSchema),
  });

  const {
    mutate: editExtraCharge,
    reset,
    isLoading: isEditExtraChargeLoading,
    isSuccess,
    isError,
  } = useEditExtraCharge(id, form.values);
  const { data: getExtraCharge, isLoading: isGetExtraChargeLoading } =
    useGetExtraCharge(id);

  const isLoading = React.useMemo(
    () => isEditExtraChargeLoading || isGetExtraChargeLoading,
    [isEditExtraChargeLoading, isGetExtraChargeLoading]
  );

  const isSubmitDisabled = React.useMemo(
    () =>
      getExtraCharge?.data
        ? !hasDataChanges(
            { ...getExtraCharge?.data, password: '' },
            form.values
          )
        : true,
    [form.values, getExtraCharge?.data]
  );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // validate form
    form.validate();

    if (!Object.keys(form.errors).length) {
      editExtraCharge();
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Extra charge edited successfully');

      onCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // set values in form after getting tenant
  React.useEffect(() => {
    if (!isDataMounted && getExtraCharge?.data) {
      form.setValues(getExtraCharge?.data);

      setIsDataMounted(true);
    }
  }, [form, getExtraCharge?.data, isDataMounted]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {isError && (
        <Alert
          color="red"
          mb={20}
          title="Encountered an error while editing extra charge"
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
