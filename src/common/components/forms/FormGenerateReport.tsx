import { Button, Select } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

import { useGetExtraCharges, useGetUtilities } from '../../hooks/api';
import { Loader } from '../widgets/Loader';

type Props = {
  onSubmit: (
    type:
      | 'lease-payments'
      | 'utility-charges'
      | 'extra-charges'
      | 'reservation-payments',
    period: 'weekly' | 'monthly' | 'yearly',
    id?: number
  ) => void;
  isReportLoading: boolean;
};

export const FormGenerateReport: React.FC<Props> = ({
  onSubmit,
  isReportLoading,
}) => {
  const { data: getExtraCharges, isLoading: isGetExtraChargesLoading } =
    useGetExtraCharges();
  const { data: getUtilities, isLoading: isGetUtilitiesLoading } =
    useGetUtilities();

  const form = useForm<{
    type?:
      | 'lease-payments'
      | 'utility-charges'
      | 'extra-charges'
      | 'reservation-payments';
    period?: 'weekly' | 'monthly' | 'yearly';
    id?: number;
  }>({
    initialValues: {
      id: 0,
    },
  });

  const isFormLoading = React.useMemo(
    () => isGetExtraChargesLoading || isGetUtilitiesLoading,
    [isGetExtraChargesLoading, isGetUtilitiesLoading]
  );

  const isSubmitDisabled = React.useMemo(() => {
    const hasEmptyId =
      (form.values.type === 'utility-charges' ||
        form.values.type === 'extra-charges') &&
      !form.values.id;

    return !form.values.period || !form.values.type || hasEmptyId;
  }, [form.values.id, form.values.period, form.values.type]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // validate form
    form.validate();

    if (form.values.type && form.values.period) {
      onSubmit(
        form.values.type,
        form.values.period,
        form.values.id || undefined
      );
    }
  };

  if (isFormLoading) {
    return <Loader />;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Select
          required
          data={[
            {
              label: 'Total collection - Lease payments',
              value: 'lease-payments',
            },
            {
              label: 'Total collection - Utility charges',
              value: 'utility-charges',
            },
            {
              label: 'Total collection - Extra charges',
              value: 'extra-charges',
            },
            {
              label: 'Total collection - Reservation payments',
              value: 'reservation-payments',
            },
          ]}
          label="Report Type"
          mt="xl"
          placeholder="ex: Total collection"
          onChange={(value) => {
            if (value) {
              form.setFieldValue('id', 0);

              form.setFieldValue(
                'type',
                value as unknown as
                  | 'lease-payments'
                  | 'utility-charges'
                  | 'extra-charges'
                  | 'reservation-payments'
              );
            }
          }}
        />

        {form.values.type === 'utility-charges' && (
          <Select
            required
            data={
              getUtilities?.data?.map((utility) => ({
                label: `${utility.display}`,
                value: `${utility.id}`,
              })) || []
            }
            disabled={!getUtilities?.data?.length}
            label="Utility"
            mt="md"
            placeholder="ex: Water"
            onChange={(value) => {
              if (value) {
                form.setFieldValue('id', +value || 0);
              }
            }}
          />
        )}

        {form.values.type === 'extra-charges' && (
          <Select
            required
            data={
              getExtraCharges?.data?.map((extraCharge) => ({
                label: `${extraCharge.display}`,
                value: `${extraCharge.id}`,
              })) || []
            }
            disabled={!getExtraCharges?.data?.length}
            label="Extra Charge"
            mt="md"
            placeholder="ex: Monthly Due"
            onChange={(value) => {
              if (value) {
                form.setFieldValue('id', +value || 0);
              }
            }}
          />
        )}

        <Select
          required
          data={[
            { label: 'Weekly', value: 'weekly' },
            { label: 'Monthly', value: 'monthly' },
            { label: 'Yearly', value: 'yearly' },
          ]}
          label="Period"
          mt="md"
          placeholder="ex: Weekly"
          onChange={(value) => {
            form.setFieldValue(
              'period',
              value as unknown as 'weekly' | 'monthly' | 'yearly'
            );
          }}
        />

        <Button
          disabled={isSubmitDisabled}
          loading={isReportLoading}
          mt="xl"
          type="submit"
        >
          Submit
        </Button>
      </form>
    </>
  );
};
