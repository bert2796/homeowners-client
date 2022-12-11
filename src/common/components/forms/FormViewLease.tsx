import {
  Accordion,
  Button,
  Group,
  SimpleGrid,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconBusinessplan, IconPool } from '@tabler/icons';
import currency from 'currency.js';
import React from 'react';

import { useGetLease } from '../../hooks/api';
import { InputAmountPHP } from '../inputs/InputAmountPHP';
import { Loader } from '../widgets/Loader';

type Props = {
  id: number;
  onCancel: () => void;
};

export const FormViewLease: React.FC<Props> = ({ id, onCancel }) => {
  const [isDataMounted, setIsDataMounted] = React.useState(false);

  const form = useForm<Partial<Data.Lease>>({
    initialValues: {
      leaseExtraCharges: [],
      leaseUtilityCharges: [],
      property: undefined,
      rentalAmount: undefined,
      tenant: undefined,
      totalAmount: '',
    },
  });

  const { data: getLease, isLoading } = useGetLease(id);

  // set values in form after getting tenant
  React.useEffect(() => {
    if (!isDataMounted && getLease?.data) {
      form.setValues(getLease?.data);

      setIsDataMounted(true);
    }
  }, [form, getLease?.data, isDataMounted]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <TextInput
        disabled
        label="Tenant"
        value={`${form.values.tenant?.firstName} ${form.values.tenant?.lastName}`}
      />

      <SimpleGrid breakpoints={[{ cols: 1, maxWidth: 'sm' }]} cols={2} mt="md">
        <TextInput
          disabled
          label="Property"
          mt="md"
          value={form.values.property?.code}
        />
        <TextInput disabled label="Type" mt="md" value={form.values.type} />
      </SimpleGrid>

      {form.values.type === 'Rental' && (
        <TextInput
          disabled
          label="Rental Amount"
          mt="md"
          value={form.values.rentalAmount}
        />
      )}

      <TextInput disabled label="Date" mt="md" value={form.values.date} />

      <Text fz="lg" mt="lg">
        Charges
      </Text>

      <Accordion
        multiple
        mt="sm"
        value={['utilityCharges', 'extraCharges']}
        variant="contained"
      >
        <Accordion.Item value="utilityCharges">
          <Accordion.Control icon={<IconPool size={20} />}>
            Utility Charges
          </Accordion.Control>
          <Accordion.Panel>
            {form.values?.leaseUtilityCharges?.map((utilityCharge) => (
              <Group
                key="index"
                mb="md"
                sx={{ alignItems: 'flex-end', display: 'flex' }}
              >
                <SimpleGrid
                  breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
                  cols={2}
                >
                  <TextInput
                    disabled
                    label="Utility"
                    value={utilityCharge.utility.display}
                  />

                  <InputAmountPHP
                    disabled
                    label="Amount"
                    value={Number(utilityCharge.amount)}
                  />
                </SimpleGrid>
              </Group>
            ))}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="extraCharges">
          <Accordion.Control icon={<IconBusinessplan size={20} />}>
            Extra Charges
          </Accordion.Control>
          <Accordion.Panel>
            {form.values?.leaseExtraCharges?.map((extraCharge) => (
              <Group
                key="index"
                mb="md"
                sx={{ alignItems: 'flex-end', display: 'flex' }}
              >
                <SimpleGrid
                  breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
                  cols={2}
                >
                  <TextInput
                    disabled
                    label="Utility"
                    value={extraCharge.extra.display}
                  />

                  <InputAmountPHP
                    disabled
                    label="Amount"
                    value={Number(extraCharge.amount)}
                  />
                </SimpleGrid>
              </Group>
            ))}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>

      {form.values.totalAmount && (
        <Text fz="xl" mt="lg">
          Total: PHP{' '}
          {currency(form.values.totalAmount, {
            precision: 2,
            separator: ',',
            symbol: '',
          }).format()}
        </Text>
      )}

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
