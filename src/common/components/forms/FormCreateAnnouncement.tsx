import {
  Alert,
  Button,
  Group,
  SimpleGrid,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { AnnouncementCreateParams } from '../../../types';
import { useCreateAnnouncement } from '../../hooks/api';
import { createAnnouncementSchema } from '../../validations';
import { Loader } from '../widgets/Loader';

type Props = {
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormCreateAnnouncement: React.FC<Props> = ({
  onCancel,
  onSuccess,
}) => {
  const {
    mutate: createAnnouncement,
    reset,
    isLoading: isCreateAnnouncementLoading,
    isSuccess,
    isError,
  } = useCreateAnnouncement();
  const form = useForm<AnnouncementCreateParams>({
    initialValues: {
      description: '',
      endDate: '',
      location: '',
      startDate: '',
      title: '',
    },
    validate: joiResolver(createAnnouncementSchema),
  });

  const isLoading = React.useMemo(
    () => isCreateAnnouncementLoading,
    [isCreateAnnouncementLoading]
  );
  const isSubmitDisabled = React.useMemo(
    () =>
      Object.entries(form.values).some(([key, value]) =>
        key === 'description' ? false : !value
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
      createAnnouncement(form.values);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Announcement created successfully');

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
          title="Encountered an error while creating announcement"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <TextInput
          required
          label="Title"
          placeholder="Sample Title"
          {...form.getInputProps('title')}
        />

        <SimpleGrid
          breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
          cols={2}
          mt="md"
        >
          <DatePicker
            allowFreeInput
            required
            inputFormat="MM/DD/YYYY"
            label="Start Date"
            minDate={new Date()}
            value={
              form.values?.startDate ? new Date(form.values.startDate) : null
            }
            onChange={(value) =>
              value && form.setFieldValue('startDate', value.toString())
            }
          />

          <DatePicker
            allowFreeInput
            required
            disabled={!form.values.startDate}
            inputFormat="MM/DD/YYYY"
            label="End Date"
            minDate={
              form.values?.startDate
                ? new Date(form.values.startDate)
                : new Date()
            }
            value={form.values?.endDate ? new Date(form.values.endDate) : null}
            onChange={(value) =>
              value && form.setFieldValue('endDate', value.toString())
            }
          />
        </SimpleGrid>

        <TextInput
          required
          label="Location"
          mt="md"
          placeholder="Phase 1 Block 1"
          {...form.getInputProps('location')}
        />

        <Textarea
          required
          label="Description"
          minRows={3}
          mt="md"
          placeholder="property description"
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
