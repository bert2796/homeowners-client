import {
  Alert,
  Button,
  Group,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import React from 'react';

import { FacilityEditParams } from '../../../types';
import { useEditFacility, useGetFacility } from '../../hooks/api';
import { hasDataChanges } from '../../utils';
import { InputAmountPHP } from '../inputs/InputAmountPHP';
import { ImageUploader } from '../uploaders/ImageUploader';

type Props = {
  id: number;
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormEditFacility: React.FC<Props> = ({
  id,
  onCancel,
  onSuccess,
}) => {
  const [files, setFiles] = React.useState<FileWithPath[]>([]);
  const [isDataMounted, setIsDataMounted] = React.useState(false);

  const form = useForm<FacilityEditParams>({
    initialValues: {
      amount: '',
      description: '',
      downPayment: '',
      images: [],
      name: '',
      type: 'PerHour',
    },
  });
  const {
    mutate: editFacility,
    reset,
    isLoading: isEditFacilityLoading,
    isSuccess,
    isError,
  } = useEditFacility(id, { ...form.values, images: files });
  const { data: getFacility, isLoading: isGetFacilityLoading } =
    useGetFacility(id);

  const isLoading = React.useMemo(
    () => isEditFacilityLoading || isGetFacilityLoading,
    [isEditFacilityLoading, isGetFacilityLoading]
  );

  const isSubmitDisabled = React.useMemo(() => {
    if (getFacility?.data) {
      const {
        description,
        name,
        facilityPaymentSetting: { amount, downPayment, type },
      } = getFacility?.data;

      const originalValue = {
        amount,
        description,
        downPayment,
        images: [],
        name,
        type,
      };

      return (
        !hasDataChanges(originalValue, { ...form.values }) && !files.length
      );
    }

    return true;
  }, [files.length, form.values, getFacility?.data]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // validate form
    form.validate();

    if (getFacility?.data.id && !Object.keys(form.errors).length) {
      editFacility();
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Facility edited successfully');

      onCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  // set values in form after getting facility
  React.useEffect(() => {
    if (!isDataMounted && getFacility?.data) {
      const {
        description,
        name,
        facilityPaymentSetting: { amount, downPayment, type },
      } = getFacility?.data;

      form.setValues({
        amount,
        description,
        downPayment,
        name,
        type,
      });

      setIsDataMounted(true);
    }
  }, [form, getFacility?.data, isDataMounted]);

  return (
    <>
      {isError && (
        <Alert
          color="red"
          mb={20}
          title="Encountered an error while editing facility"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <TextInput
          required
          label="Name"
          placeholder="Facility name"
          {...form.getInputProps('name')}
        />

        <Textarea
          required
          label="Description"
          minRows={3}
          mt="md"
          placeholder="Facility description"
          {...form.getInputProps('description')}
        />

        <SimpleGrid
          breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
          cols={2}
          mt="md"
        >
          <Select
            required
            data={[
              { label: 'Per Hour', value: 'PerHour' },
              { label: 'Whole Day', value: 'WholeDay' },
            ]}
            label="Payment Rate Type"
            value={form.values.type}
            onChange={(value) => {
              form.setFieldValue(
                'type',
                (value as unknown as 'PerHour' | 'WholeDay') || 'PerHour'
              );
            }}
          />

          <InputAmountPHP
            label="Amount"
            value={parseFloat(form.values.amount)}
            onChange={(value) => form.setFieldValue('amount', `${value}` || '')}
          />
        </SimpleGrid>

        {form.values.type === 'WholeDay' && (
          <InputAmountPHP
            label="Down Payment"
            mt="md"
            value={parseFloat(form.values?.downPayment || '0')}
            onChange={(value) =>
              form.setFieldValue('downPayment', `${value}` || '')
            }
          />
        )}

        <Text mt="md">Upload facility images</Text>
        <Text c="dimmed" fz="xs" mb="md">
          Uploading new images will replace the old images
        </Text>
        <ImageUploader files={files} onSetFiles={setFiles} />

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
