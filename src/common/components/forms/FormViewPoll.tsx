import {
  Accordion,
  Box,
  Button,
  Group,
  NumberInput,
  Paper,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconSettings } from '@tabler/icons';
import React from 'react';

import { useGetPoll } from '../../hooks/api';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
};

export const FormViewPoll: React.FC<Props> = ({ id, onCancel }) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);

  const form = useForm<Partial<Data.Poll>>({
    initialValues: {
      allowedAnswer: 1,
      description: '',
      endDate: '',
      pollChoices: [],
      title: '',
    },
  });

  const { data: getPoll, isLoading } = useGetPoll(id);

  // set values in form after getting tenant
  React.useEffect(() => {
    if (!isDataMounted && getPoll?.data) {
      form.setValues(getPoll?.data);

      setIsDataMounted(true);
    }
  }, [form, getPoll?.data, isDataMounted]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Box>
        <TextInput
          disabled
          label="Title"
          placeholder="What is your question?"
          {...form.getInputProps('title')}
        />

        <Textarea
          disabled
          label="Description"
          minRows={3}
          mt="md"
          placeholder="Description"
          {...form.getInputProps('description')}
        />

        <DatePicker
          allowFreeInput
          disabled
          error={form.errors.date || false}
          inputFormat="MM/DD/YYYY"
          label="Date will end"
          mt="md"
          value={form.values.endDate ? new Date(form.values.endDate) : null}
        />

        <Text fz="lg" mt="lg">
          Choices
        </Text>

        <Paper mt="md" p="md" shadow="sm">
          {form.values?.pollChoices?.map((question, index) => (
            <Group
              key={index}
              mb="md"
              sx={{ alignItems: 'flex-end', display: 'flex' }}
            >
              <TextInput
                disabled
                label={`Option #${index + 1}`}
                placeholder="Option"
                value={question.option}
              />
            </Group>
          ))}
        </Paper>
      </Box>

      <Accordion defaultValue="settings" mt="lg">
        <Accordion.Item value="settings">
          <Accordion.Control icon={<IconSettings size={20} />}>
            Settings
          </Accordion.Control>
          <Accordion.Panel>
            <NumberInput
              disabled
              label="Allowed answer"
              placeholder="Exact number"
              {...form.getInputProps('allowedAnswer')}
            />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      <Group mt="md" position="right">
        <Button
          disabled={isLoading}
          mt="xl"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </Group>
    </>
  );
};
