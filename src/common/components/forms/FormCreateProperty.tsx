import {
  Alert,
  Button,
  Group,
  NumberInput,
  Select,
  SimpleGrid,
  Textarea,
  TextInput,
} from '@mantine/core';
import { joiResolver, useForm } from '@mantine/form';
import React from 'react';

import { PropertyCreateParams } from '../../../types';
import {
  useCreateProperty,
  useGetPropertyBlocks,
  useGetPropertyLots,
  useGetPropertyPhases,
  useGetPropertyTypes,
} from '../../hooks/api';
import { createPropertySchema } from '../../validations';
import { Loader } from '../widgets/Loader';

type Props = {
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormCreateProperty: React.FC<Props> = ({
  onCancel,
  onSuccess,
}) => {
  const {
    mutate: createProperty,
    reset,
    isLoading: isCreatePropertyLoading,
    isSuccess,
    isError,
  } = useCreateProperty();
  const { data: getPropertyBlocks, isLoading: isGetPropertyBlocksLoading } =
    useGetPropertyBlocks();
  const { data: getPropertyLots, isLoading: isGetPropertyLotsLoading } =
    useGetPropertyLots();
  const { data: getPropertyPhases, isLoading: isGetPropertyPhasesLoading } =
    useGetPropertyPhases();
  const { data: getPropertyTypes, isLoading: isGetPropertyTypesLoading } =
    useGetPropertyTypes();
  const form = useForm<PropertyCreateParams>({
    initialValues: {
      amount: '0',
      bathrooms: 0,
      bedrooms: 0,
      code: '',
      description: '',
      location: '',
      name: '',
      propertyLocationBlockId: 0,
      propertyLocationLotId: 0,
      propertyLocationPhaseId: 0,
      propertyTypeId: 0,
    },
    validate: joiResolver(createPropertySchema),
  });

  const isLoading = React.useMemo(
    () =>
      isGetPropertyBlocksLoading ||
      isGetPropertyLotsLoading ||
      isGetPropertyPhasesLoading ||
      isGetPropertyTypesLoading,
    [
      isGetPropertyBlocksLoading,
      isGetPropertyLotsLoading,
      isGetPropertyPhasesLoading,
      isGetPropertyTypesLoading,
    ]
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
      createProperty(form.values);
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Property created successfully');

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
          title="Encountered an error while creating property"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <TextInput
          required
          label="Name"
          placeholder="2 storey house"
          {...form.getInputProps('name')}
        />

        <TextInput
          required
          label="Code"
          mt="md"
          placeholder="0000XX"
          {...form.getInputProps('code')}
        />

        <Select
          data={
            getPropertyTypes?.data?.map((type) => ({
              label: type.display,
              value: `${type.id}`,
            })) || []
          }
          disabled={!getPropertyTypes?.data?.length}
          label="Type"
          mt="md"
          placeholder="ex: Bungalow"
          required={Boolean(getPropertyTypes?.data?.length)}
          searchable={Boolean(getPropertyTypes?.data?.length)}
          value={`${form.values.propertyTypeId}`}
          onChange={(value) => {
            form.setFieldValue('propertyTypeId', +(value || 0));
          }}
        />

        {/* <InputAmountPHP
          label="Rental Amount"
          mt="md"
          value={parseFloat(form.values.amount)}
          onChange={(value) => form.setFieldValue('amount', `${value}` || '')}
        /> */}

        <SimpleGrid
          breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
          cols={3}
          mt="md"
        >
          <Select
            data={
              getPropertyBlocks?.data?.map((type) => ({
                label: type.display,
                value: `${type.id}`,
              })) || []
            }
            disabled={!getPropertyBlocks?.data?.length}
            label="Block"
            placeholder="ex: Block One (1)"
            required={Boolean(getPropertyBlocks?.data?.length)}
            searchable={Boolean(getPropertyBlocks?.data?.length)}
            value={`${form.values.propertyLocationBlockId}`}
            onChange={(value) => {
              form.setFieldValue('propertyLocationBlockId', +(value || 0));
            }}
          />

          <Select
            data={
              getPropertyPhases?.data?.map((type) => ({
                label: type.display,
                value: `${type.id}`,
              })) || []
            }
            disabled={!getPropertyPhases?.data?.length}
            label="Phase"
            placeholder="ex: Phase One (1)"
            required={Boolean(getPropertyPhases?.data?.length)}
            searchable={Boolean(getPropertyPhases?.data?.length)}
            value={`${form.values.propertyLocationPhaseId}`}
            onChange={(value) => {
              form.setFieldValue('propertyLocationPhaseId', +(value || 0));
            }}
          />

          <Select
            data={
              getPropertyLots?.data?.map((type) => ({
                label: type.display,
                value: `${type.id}`,
              })) || []
            }
            disabled={!getPropertyLots?.data?.length}
            label="Lot"
            placeholder="ex: Lot One (1)"
            required={Boolean(getPropertyLots?.data?.length)}
            searchable={Boolean(getPropertyLots?.data?.length)}
            value={`${form.values.propertyLocationLotId}`}
            onChange={(value) => {
              form.setFieldValue('propertyLocationLotId', +(value || 0));
            }}
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
          label="Description"
          minRows={3}
          mt="md"
          placeholder="property description"
          {...form.getInputProps('description')}
        />

        <SimpleGrid
          breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
          cols={2}
          mt="md"
        >
          <NumberInput
            required
            label="Bathrooms"
            max={100}
            min={1}
            {...form.getInputProps('bathrooms')}
          />

          <NumberInput
            required
            label="Bedrooms"
            max={100}
            min={1}
            {...form.getInputProps('bedrooms')}
          />
        </SimpleGrid>

        <Group mt="md" position="right">
          <Button
            disabled={isCreatePropertyLoading}
            mt="xl"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            disabled={isSubmitDisabled}
            loading={isCreatePropertyLoading}
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
