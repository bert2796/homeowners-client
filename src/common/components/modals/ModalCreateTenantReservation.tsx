import { DateSelectArg } from '@fullcalendar/common';
import {
  Button,
  Group,
  SimpleGrid,
  Stepper,
  Text,
  TextInput,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { FileWithPath } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import day from 'dayjs';
import isSafeOrAfter from 'dayjs/plugin/isSameOrAfter';
import React from 'react';

import { ReservationPaymentCreateParams } from '../../../types';
import { useAuth } from '../../hooks';
import { useCreateReservation } from '../../hooks/api';
import { InputAmountPHP } from '../inputs/InputAmountPHP';
import { PaymentUploader } from '../uploaders/PaymentUploader';
import { ModalInstance } from './ModalInstance';

day.extend(isSafeOrAfter);

type Props = {
  facility?: Data.Facility;
  date?: DateSelectArg;
  isOpen: boolean;
  onSuccess: (message: string) => void;
  onClose: () => void;
};

export const ModalCreateTenantReservation: React.FC<Props> = ({
  facility,
  date,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [active, setActive] = React.useState(0);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));
  const [files, setFiles] = React.useState<FileWithPath[]>([]);
  const form = useForm<Partial<ReservationPaymentCreateParams>>({
    initialValues: {
      amount: '',
      images: [],
    },
  });

  const auth = useAuth();
  const {
    mutate: createReservation,
    reset,
    isLoading,
    isSuccess,
  } = useCreateReservation();

  const isPastDate = React.useMemo(
    () => !day(date?.start).isSameOrAfter(new Date()),
    [date?.start]
  );

  const isSubmitDisabled = React.useMemo(
    () =>
      Object.entries(form.values).some(([key, value]) =>
        key === 'description' || key === 'downPayment' ? false : !value
      ) || !files.length,
    [files.length, form.values]
  );

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // prevent from refreshing page
    event.preventDefault();

    // reset error
    reset();

    if (auth.user && date && facility) {
      createReservation({
        amount: form.values.amount || '',
        endDate: date?.end.toString(),
        facilityId: facility.id,
        images: files,
        startDate: date?.start.toString(),
        tenantId: auth.user.id,
        totalAmount: '0',
      });
    }
  };

  React.useEffect(() => {
    if (isSuccess) {
      onSuccess('Reservation created successfully');

      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  return (
    <ModalInstance isOpen={isOpen} title="Create Reservation" onClose={onClose}>
      <form onSubmit={handleFormSubmit}>
        <Stepper active={active} onStepClick={setActive}>
          <Stepper.Step
            description="Verify reservation"
            label="First step"
            size="sm"
          >
            <TextInput
              disabled
              label="Facility"
              placeholder="Facility name"
              value={facility?.name}
            />

            <SimpleGrid
              breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
              cols={2}
              mt="md"
            >
              <TextInput
                disabled
                error={isPastDate ? 'Cannot reserve if its past date' : ''}
                label="Start Date"
                value={day(date?.start).format('MM/DD/YYYY')}
              />

              <TimeInput
                disabled
                format="24"
                label="Time"
                value={date?.start}
              />
            </SimpleGrid>

            <SimpleGrid
              breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
              cols={2}
              mt="md"
            >
              <TextInput
                disabled
                label="End Date"
                value={day(date?.end).format('MM/DD/YYYY')}
              />

              <TimeInput disabled format="24" label="Time" value={date?.end} />
            </SimpleGrid>
          </Stepper.Step>
          <Stepper.Step description="Upload Payment" label="Final step">
            <InputAmountPHP
              required
              label="Amount"
              mb="md"
              placeholder="ex: 1000"
              value={parseInt(form.values.amount || '0')}
              onChange={(value) => {
                form.setFieldValue('amount', `${value}` || '0');
              }}
            />

            <Text>Upload proof of payment</Text>
            <PaymentUploader files={files} onSetFiles={setFiles} />
          </Stepper.Step>
        </Stepper>

        <Group mt="xl" position="right">
          {active > 0 && (
            <Button loading={isLoading} variant="default" onClick={prevStep}>
              Back
            </Button>
          )}
          <Button
            disabled={(active > 0 && isSubmitDisabled) || isPastDate}
            loading={isLoading}
            type={active === 0 ? 'button' : 'submit'}
            onClick={active === 0 ? nextStep : undefined}
          >
            {active === 0 && 'Proceed to payment'}
            {active > 0 && 'Submit'}
          </Button>
        </Group>
      </form>

      {/* <form onSubmit={handleFormSubmit}>


        <Group mt="md" position="right">
          <Button
            disabled={isLoading}
            mt="xl"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading || isPastDate}
            loading={isLoading}
            mt="xl"
            type="submit"
          >
            Submit
          </Button>
        </Group>
      </form> */}
    </ModalInstance>
  );
};
