import { Button, Group, SimpleGrid, Textarea, TextInput } from '@mantine/core';
import day from 'dayjs';
import React from 'react';

import { useGetAnnouncement } from '../../hooks/api';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
};

export const FormViewAnnouncement: React.FC<Props> = ({ id, onCancel }) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);
  const [announcement, setAnnouncement] = React.useState<
    Data.Announcement | undefined
  >(undefined);

  const { data: getAnnouncement, isLoading: isGetAnnouncementLoading } =
    useGetAnnouncement(id);

  const isLoading = React.useMemo(
    () => isGetAnnouncementLoading,
    [isGetAnnouncementLoading]
  );

  // set values in form after getting announcement
  React.useEffect(() => {
    if (!isDataMounted && getAnnouncement?.data) {
      setAnnouncement(getAnnouncement.data);

      setIsDataMounted(true);
    }
  }, [getAnnouncement?.data, isDataMounted]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TextInput disabled label="Title" value={announcement?.title || ''} />

      <SimpleGrid breakpoints={[{ cols: 1, maxWidth: 'sm' }]} cols={2} mt="md">
        <TextInput
          disabled
          label="Start Date"
          value={day(announcement?.startDate).format('MM/DD/YYYY') || ''}
        />

        <TextInput
          disabled
          label="End Date"
          value={day(announcement?.endDate).format('MM/DD/YYYY') || ''}
        />
      </SimpleGrid>

      <TextInput
        disabled
        label="Location"
        mt="md"
        value={announcement?.location || ''}
      />

      <Textarea
        disabled
        label="Description"
        minRows={3}
        mt="md"
        value={announcement?.description || ''}
      />

      <Group mt="md" position="right">
        <Button mt="xl" variant="outline" onClick={onCancel}>
          Close
        </Button>
      </Group>
    </>
  );
};
