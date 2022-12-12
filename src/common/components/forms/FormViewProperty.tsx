import { Button, Group, SimpleGrid, Textarea, TextInput } from '@mantine/core';
import React from 'react';

import { useGetProperty } from '../../hooks/api';
import { InputAmountPHP } from '../inputs/InputAmountPHP';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
};

export const FormViewProperty: React.FC<Props> = ({ id, onCancel }) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);
  const [property, setProperty] = React.useState<Data.Property | undefined>(
    undefined
  );

  const { data: getProperty, isLoading } = useGetProperty(id);

  // set values in form after getting property
  React.useEffect(() => {
    if (!isDataMounted && getProperty?.data) {
      setProperty(getProperty.data);

      setIsDataMounted(true);
    }
  }, [getProperty?.data, isDataMounted]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TextInput disabled label="Name" value={property?.name || ''} />

      <TextInput disabled label="Code" mt="md" value={property?.code || ''} />

      <TextInput
        disabled
        label="Type"
        mt="md"
        value={property?.propertyType.display || ''}
      />

      {/* <InputAmountPHP
        disabled
        label="Rental Amount"
        mt="md"
        value={parseFloat(property?.amount || '')}
      /> */}

      <SimpleGrid breakpoints={[{ cols: 1, maxWidth: 'sm' }]} cols={2} mt="md">
        <TextInput
          disabled
          label="Block"
          value={property?.propertyLocationBlock.display || ''}
        />

        <TextInput
          disabled
          label="Phase"
          value={property?.propertyLocationPhase.display || ''}
        />
      </SimpleGrid>

      <TextInput
        disabled
        label="Location"
        mt="md"
        value={property?.location || ''}
      />

      <Textarea
        disabled
        label="Description"
        minRows={3}
        mt="md"
        value={property?.description || ''}
      />

      <SimpleGrid breakpoints={[{ cols: 1, maxWidth: 'sm' }]} cols={2} mt="md">
        <TextInput
          disabled
          label="Bathrooms"
          value={property?.bathrooms || ''}
        />

        <TextInput disabled label="Bedrooms" value={property?.bedrooms || ''} />
      </SimpleGrid>

      <Group mt="md" position="right">
        <Button mt="xl" variant="outline" onClick={onCancel}>
          Close
        </Button>
      </Group>
    </>
  );
};
