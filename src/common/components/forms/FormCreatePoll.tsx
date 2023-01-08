import {
  Accordion,
  Alert,
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

import { PollCreateParams } from '../../../types';
import { useCreatePoll } from '../../hooks/api';

type Props = {
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormCreatePoll: React.FC<Props> = ({ onCancel, onSuccess }) => {
  const [choices, setQuestions] = React.useState<
    { label: string; value: string }[]
  >([{ label: '', value: '' }]);

  const {
    mutate: createPoll,
    reset,
    isLoading,
    isSuccess,
    isError,
  } = useCreatePoll();

  const form = useForm<PollCreateParams>({
    initialValues: {
      allowedAnswer: 1,
      description: '',
      endDate: '',
      title: '',
    },
  });

  const hasEmptyQuestion = React.useMemo(
    () => choices.map((choice) => choice.label).every((choice) => !choice),
    [choices]
  );

  const isSubmitDisabled = React.useMemo(() => {
    if (!Object.values(choices[0]).some((hasValue) => hasValue)) {
      return true;
    }

    Object.entries(form.values).some(([, value]) => {
      return !value;
    });
  }, [form.values, choices]);

  const handleQuestionsChange = (index: number, value: string) => {
    const data = [...choices];
    data[index] = {
      ...data[index],
      label: value,
      value: value.split(' ').join('-'),
    };

    setQuestions(data);
  };

  const handleAddQuestionField = () => {
    const newField = { label: '', value: '' };

    setQuestions([...choices, newField]);
  };

  const handleRemoveQuestionField = (index: number) => {
    const data = [...choices];
    data.splice(index, 1);

    setQuestions(data);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // validate form
    form.validate();

    if (!Object.keys(form.errors).length) {
      createPoll({
        ...form.values,
        choices: choices.map((choice) => choice.label),
      });
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Poll created successfully');

      onCancel();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <>
      {isError && (
        <Alert
          color="red"
          mb={20}
          title="Encountered an error while creating lease"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <Box>
          <TextInput
            required
            label="Title"
            placeholder="What is your question?"
            {...form.getInputProps('title')}
          />

          <Textarea
            label="Description"
            minRows={3}
            mt="md"
            placeholder="Description"
            {...form.getInputProps('description')}
          />

          <DatePicker
            allowFreeInput
            required
            error={form.errors.date || false}
            inputFormat="MM/DD/YYYY"
            label="Date will end"
            mt="md"
            value={form.values.endDate ? new Date(form.values.endDate) : null}
            onChange={(value) =>
              form.setFieldValue('endDate', value?.toString() || '')
            }
          />

          <Text fz="lg" mt="lg">
            Choices
          </Text>

          <Paper mt="md" p="md" shadow="sm">
            {choices.map((question, index) => (
              <Group
                key={index}
                mb="md"
                sx={{ alignItems: 'flex-end', display: 'flex' }}
              >
                <TextInput
                  label={`Option #${index + 1}`}
                  placeholder="Option"
                  onChange={(event) =>
                    handleQuestionsChange(index, event.currentTarget.value)
                  }
                />
                {index && (
                  <Button onClick={() => handleRemoveQuestionField(index)}>
                    Remove
                  </Button>
                )}
              </Group>
            ))}

            <Button
              disabled={Boolean(hasEmptyQuestion)}
              onClick={handleAddQuestionField}
            >
              Add
            </Button>
          </Paper>
        </Box>

        <Accordion defaultValue="settings" mt="lg">
          <Accordion.Item value="settings">
            <Accordion.Control icon={<IconSettings size={20} />}>
              Settings
            </Accordion.Control>
            <Accordion.Panel>
              <NumberInput
                required
                label="Allowed answer"
                max={choices.length}
                min={1}
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
