import { Box, Button, Group, Text } from '@mantine/core';
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

export const FormVotePoll: React.FC<Props> = ({ id, onCancel }) => {
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
        <Text fw="bold" fz="xl">
          {form.values.title}
        </Text>

        {form.values.description && (
          <Text mt="md">{form.values.description}</Text>
        )}

        <Text c="gray" mt="xl">
          Make {form.values.allowedAnswer} choices:
        </Text>
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
      </Group>
    </>
  );
};
