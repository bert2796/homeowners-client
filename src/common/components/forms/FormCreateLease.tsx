import {
  Accordion,
  Alert,
  Button,
  Group,
  Select,
  SimpleGrid,
  Text,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { IconBusinessplan, IconPool } from '@tabler/icons';
import Big from 'big.js';
import currency from 'currency.js';
import React from 'react';

import { LeaseCreateParams } from '../../../types';
import {
  useCreateLease,
  useGetExtraCharges,
  useGetProperties,
  useGetTenants,
  useGetUtilities,
} from '../../hooks/api';
import { InputAmountPHP } from '../inputs/InputAmountPHP';
import { Loader } from '../widgets/Loader';

type Props = {
  onCancel: () => void;
  onSuccess: (message: string) => void;
};

export const FormCreateLease: React.FC<Props> = ({ onCancel, onSuccess }) => {
  const [extraCharges, setExtraCharges] = React.useState<
    { extraChargeId: string; amount: string }[]
  >([{ amount: '', extraChargeId: '' }]);

  const [utilityCharges, setUtilityCharges] = React.useState<
    { utilityId: string; amount: string }[]
  >([{ amount: '', utilityId: '' }]);

  const {
    mutate: createLease,
    reset,
    isLoading: isCreateLeaseLoading,
    isSuccess,
    isError,
  } = useCreateLease();
  const { data: getProperties, isLoading: isGetPropertiesLoading } =
    useGetProperties();
  const { data: getTenants, isLoading: isGetTenantsLoading } = useGetTenants();
  const { data: getExtraCharges, isLoading: isGetExtraChargesLoading } =
    useGetExtraCharges();
  const { data: getUtilities, isLoading: isGetUtilitiesLoading } =
    useGetUtilities();
  const form = useForm<LeaseCreateParams>({
    initialValues: {
      date: '',
      leaseExtraCharges: [],
      leaseUtilityCharges: [],
      propertyId: 0,
      rentalAmount: '',
      tenantId: 0,
      totalAmount: '',
      type: '',
    },
  });

  const isLoading = React.useMemo(
    () =>
      isCreateLeaseLoading ||
      isGetPropertiesLoading ||
      isGetTenantsLoading ||
      isGetExtraChargesLoading ||
      isGetUtilitiesLoading,
    [
      isCreateLeaseLoading,
      isGetPropertiesLoading,
      isGetTenantsLoading,
      isGetExtraChargesLoading,
      isGetUtilitiesLoading,
    ]
  );

  console.log(form.values);

  const isSubmitDisabled = React.useMemo(
    () =>
      Object.entries(form.values).some(([key, value]) => {
        if (
          !Object.values(extraCharges[0]).some((hasValue) => hasValue) ||
          !Object.values(utilityCharges[0]).some((hasValue) => hasValue)
        ) {
          return true;
        }

        if (
          key === 'totalAmount' ||
          key === 'leaseExtraCharges' ||
          key === 'leaseUtilityCharges'
        ) {
          return false;
        }

        if (key === 'rentalAmount') {
          return form.values.type === 'Rental' ? !value : false;
        }

        return !value;
      }),
    [extraCharges, form.values, utilityCharges]
  );

  const filteredExtraCharges = React.useMemo(() => {
    const ids = extraCharges.map((extraCharge) => extraCharge.extraChargeId);

    return getExtraCharges?.data.filter(
      (extraCharge) => !ids.includes(`${extraCharge.id}`)
    );
  }, [getExtraCharges?.data, extraCharges]);

  const filteredUtilityCharges = React.useMemo(() => {
    const ids = utilityCharges.map((utilityCharge) => utilityCharge.utilityId);

    return getUtilities?.data.filter(
      (utilityCharge) => !ids.includes(`${utilityCharge.id}`)
    );
  }, [getUtilities?.data, utilityCharges]);

  const total = React.useMemo(() => {
    const extraChargesTotal = extraCharges.reduce(
      (accumulator, currentValue) => {
        if (currentValue.amount && parseInt(currentValue.amount)) {
          return accumulator.plus(new Big(currentValue.amount));
        }

        return accumulator;
      },
      new Big(0)
    );
    const utilityChargesTotal = utilityCharges.reduce(
      (accumulator, currentValue) => {
        if (currentValue.amount && parseInt(currentValue.amount)) {
          return accumulator.plus(new Big(currentValue.amount));
        }

        return accumulator;
      },
      new Big(0)
    );
    const rentalAmount =
      form.values.rentalAmount && parseInt(form.values.rentalAmount)
        ? new Big(form.values.rentalAmount)
        : 0;

    return currency(
      extraChargesTotal.plus(utilityChargesTotal).plus(rentalAmount).toString(),
      { precision: 2, separator: ',', symbol: '' }
    ).format();
  }, [extraCharges, utilityCharges, form.values.rentalAmount]);

  const handleExtraChargesChange = (
    index: number,
    key: string,
    value: string
  ) => {
    const data = [...extraCharges];
    data[index] = {
      ...data[index],
      [key]: value,
    };

    setExtraCharges(data);
  };

  const handleAddExtraChargeField = () => {
    const newField = { amount: '', extraChargeId: '' };

    setExtraCharges([...extraCharges, newField]);
  };

  const handleRemoveExtraChargeField = (index: number) => {
    const data = [...extraCharges];
    data.splice(index, 1);

    setExtraCharges(data);
  };

  const handleUtilityChargesChange = (
    index: number,
    key: string,
    value: string
  ) => {
    const data = [...utilityCharges];
    data[index] = {
      ...data[index],
      [key]: value,
    };

    setUtilityCharges(data);
  };

  const handleAddUtilityChargeField = () => {
    const newField = { amount: '', utilityId: '' };

    setUtilityCharges([...utilityCharges, newField]);
  };

  const handleRemoveUtilityChargeField = (index: number) => {
    const data = [...utilityCharges];
    data.splice(index, 1);

    setUtilityCharges(data);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    // validate form
    form.validate();

    if (!Object.keys(form.errors).length) {
      createLease({
        ...form.values,
        leaseExtraCharges: extraCharges.map((extraCharge) => ({
          amount: extraCharge.amount,
          id: Number(extraCharge.extraChargeId),
        })),
        leaseUtilityCharges: utilityCharges.map((utilityCharge) => ({
          amount: utilityCharge.amount,
          id: Number(utilityCharge.utilityId),
        })),
        totalAmount: total,
      });
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Lease created successfully');

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
          title="Encountered an error while creating lease"
        >
          Something went wrong, Please try again later.
        </Alert>
      )}

      <form onSubmit={handleFormSubmit}>
        <Select
          required
          data={
            getTenants?.data.map((tenant) => ({
              label: `${tenant.firstName} ${tenant.lastName}`,
              value: `${tenant.id}`,
            })) || []
          }
          disabled={!getTenants?.data.length}
          error={!getTenants?.data.length ? 'Create tenant first' : ''}
          label="Tenant"
          placeholder="Pick Tenant"
          onChange={(value) => {
            form.setFieldValue('tenantId', parseInt(value || '0'));
          }}
        />

        <SimpleGrid
          breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
          cols={2}
          mt="md"
        >
          <Select
            required
            data={
              getProperties?.data.map((property) => ({
                label: `${property.code}`,
                value: `${property.id}`,
              })) || []
            }
            disabled={!getProperties?.data.length}
            error={!getProperties?.data.length ? 'Create property first' : ''}
            label="Property"
            placeholder="Search by property code"
            onChange={(value) => {
              form.setFieldValue('propertyId', parseInt(value || '0'));
            }}
          />

          <Select
            required
            data={[
              { label: 'Rental', value: 'Rental' },
              { label: 'Homeowner', value: 'Homeowner' },
            ]}
            disabled={!form.values.propertyId}
            label="Type"
            placeholder="ex: Rental or Homeowner"
            onChange={(value) => {
              if (value === 'Homeowner') {
                form.setFieldValue('rentalAmount', '');
              }

              if (value === 'Rental') {
                const property = getProperties?.data?.find(
                  (property) => property.id === form.values.propertyId
                );
                form.setFieldValue(
                  'rentalAmount',
                  `${property?.amount}` || '0'
                );
              }
              form.setFieldValue('type', value || '');
            }}
          />
        </SimpleGrid>

        {form.values.type === 'Rental' && (
          <InputAmountPHP
            label="Rental Amount"
            mt="md"
            placeholder="ex: 1000"
            required={form.values.type === 'Rental'}
            value={parseInt(form.values.rentalAmount || '0')}
            onChange={(value) => {
              form.setFieldValue('rentalAmount', `${value}` || '0');
            }}
          />
        )}

        <DatePicker
          allowFreeInput
          required
          error={form.errors.date || false}
          inputFormat="MM/DD/YYYY"
          label="Date"
          mt="md"
          value={form.values.date ? new Date(form.values.date) : null}
          onChange={(value) =>
            form.setFieldValue('date', value?.toString() || '')
          }
        />

        <Text fz="lg" mt="lg">
          Charges
        </Text>

        <Accordion multiple mt="sm" variant="contained">
          <Accordion.Item value="utilityCharges">
            <Accordion.Control icon={<IconPool size={20} />}>
              Utility Charges
            </Accordion.Control>
            <Accordion.Panel>
              {utilityCharges.map((utilityCharge, index) => (
                <Group
                  key="index"
                  mb="md"
                  sx={{ alignItems: 'flex-end', display: 'flex' }}
                >
                  <SimpleGrid
                    breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
                    cols={2}
                  >
                    <Select
                      data={
                        getUtilities?.data?.map((utility) => ({
                          label: `${utility.display}`,
                          value: `${utility.id}`,
                        })) || []
                      }
                      disabled={!getUtilities?.data?.length}
                      label="Utility"
                      placeholder="ex: Water"
                      onChange={(value) => {
                        handleUtilityChargesChange(
                          index,
                          'utilityId',
                          value || ''
                        );
                      }}
                    />

                    <InputAmountPHP
                      label="Amount"
                      placeholder="ex: 1000"
                      onChange={(value) => {
                        handleUtilityChargesChange(
                          index,
                          'amount',
                          `${value}` || ''
                        );
                      }}
                    />
                  </SimpleGrid>
                  {index && (
                    <Button
                      onClick={() => handleRemoveUtilityChargeField(index)}
                    >
                      Remove
                    </Button>
                  )}
                </Group>
              ))}

              <Button
                disabled={!filteredUtilityCharges?.length}
                onClick={handleAddUtilityChargeField}
              >
                Add
              </Button>
            </Accordion.Panel>
          </Accordion.Item>

          <Accordion.Item value="extraCharges">
            <Accordion.Control icon={<IconBusinessplan size={20} />}>
              Extra Charges
            </Accordion.Control>
            <Accordion.Panel>
              {extraCharges.map((extraCharge, index) => (
                <Group
                  key="index"
                  mb="md"
                  sx={{ alignItems: 'flex-end', display: 'flex' }}
                >
                  <SimpleGrid
                    breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
                    cols={2}
                  >
                    <Select
                      data={
                        getExtraCharges?.data?.map((extraCharge) => ({
                          label: `${extraCharge.display}`,
                          value: `${extraCharge.id}`,
                        })) || []
                      }
                      disabled={!getExtraCharges?.data?.length}
                      label="Extra Charge"
                      placeholder="ex: Monthly Due"
                      onChange={(value) => {
                        handleExtraChargesChange(
                          index,
                          'extraChargeId',
                          value || ''
                        );
                      }}
                    />

                    <InputAmountPHP
                      label="Amount"
                      placeholder="ex: 1000"
                      onChange={(value) => {
                        handleExtraChargesChange(
                          index,
                          'amount',
                          `${value}` || ''
                        );
                      }}
                    />
                  </SimpleGrid>
                  {index && (
                    <Button onClick={() => handleRemoveExtraChargeField(index)}>
                      Remove
                    </Button>
                  )}
                </Group>
              ))}

              <Button
                disabled={!filteredExtraCharges?.length}
                onClick={handleAddExtraChargeField}
              >
                Add
              </Button>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Text fz="xl" mt="lg">
          Total: PHP {total}
        </Text>

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
