import {
  Box,
  Button,
  Group,
  Image,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

import { useGetFacility } from '../../hooks/api';
import { InputAmountPHP } from '../inputs/InputAmountPHP';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
};

export const FormViewFacility: React.FC<Props> = ({ id, onCancel }) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);

  const form = useForm<Partial<Data.Facility>>({
    initialValues: {
      description: '',
      name: '',
    },
  });

  const { data: getFacility, isLoading } = useGetFacility(id);

  // set values in form after getting tenant
  React.useEffect(() => {
    if (!isDataMounted && getFacility?.data) {
      form.setValues(getFacility?.data);

      setIsDataMounted(true);
    }
  }, [form, getFacility?.data, isDataMounted]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TextInput disabled label="Name" value={form.values.name} />

      <Textarea
        disabled
        label="Description"
        minRows={3}
        mt="md"
        value={form.values?.description || ''}
      />

      <SimpleGrid breakpoints={[{ cols: 1, maxWidth: 'sm' }]} cols={2} mt="md">
        <TextInput
          disabled
          label="Payment Rate Type"
          value={
            form.values.facilityPaymentSetting?.type === 'PerHour'
              ? 'Per Hour'
              : 'Whole Day'
          }
        />
        <InputAmountPHP
          disabled
          label="Amount"
          value={Number(form.values.facilityPaymentSetting?.amount)}
        />
      </SimpleGrid>

      {form.values.facilityPaymentSetting?.type === 'PerHour' && (
        <InputAmountPHP
          disabled
          label="Down Payment"
          mt="md"
          value={Number(form.values.facilityPaymentSetting?.downPayment)}
        />
      )}

      <Text mt="md">Images</Text>

      <SimpleGrid
        breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
        cols={4}
        mb="lg"
        mt={form?.values?.facilityImages?.length ? 'xl' : 0}
      >
        {form?.values?.facilityImages?.map((file, index) => {
          return (
            <Box key={index}>
              <a href={file.url} rel="noreferrer" target="_blank">
                <Image
                  withPlaceholder
                  alt="image"
                  height={150}
                  mb="sm"
                  src={file.url}
                  width={180}
                />
              </a>
            </Box>
          );
        })}
      </SimpleGrid>

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
