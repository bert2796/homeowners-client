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

import { FacilityCreateParams } from '../../../types';
import { useCreateFacility } from '../../hooks/api';
import { InputAmountPHP } from '../inputs/InputAmountPHP';
import { ImageUploader } from '../uploaders/ImageUploader';
import { Loader } from '../widgets/Loader';

type Props = {
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormCreateFacility: React.FC<Props> = ({
  onCancel,
  onSuccess,
}) => {
  const [files, setFiles] = React.useState<FileWithPath[]>([]);

  const {
    mutate: createFacility,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useCreateFacility();
  const form = useForm<FacilityCreateParams>({
    initialValues: {
      amount: '',
      description: '',
      downPayment: '',
      name: '',
      type: 'PerHour',
    },
  });

  const isSubmitDisabled = React.useMemo(
    () =>
      Object.entries(form.values).some(([key, value]) =>
        key === 'description' || key === 'downPayment' ? false : !value
      ),
    [form.values]
  );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // validate form
    form.validate();

    if (!Object.keys(form.errors).length) {
      createFacility(form.values);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Facility created successfully');

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
          title="Encountered an error while creating facility"
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
            label="Payment Type"
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

        <Text mb="md" mt="md">
          Upload facility images
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
