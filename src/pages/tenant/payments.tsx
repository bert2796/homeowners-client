import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import React from 'react';

import { ModalPayment } from '../../common/components/modals/ModalPayment';
import { TablePayments } from '../../common/components/tables/TablePayments';
import { Tenant } from '../../common/components/templates/Tenant';
import { useAuth } from '../../common/hooks';
import { NextPageWithLayout } from '../_app';

const Payments: NextPageWithLayout = () => {
  const { user } = useAuth();

  const [type, setType] = React.useState<Data.Action>('Create');
  const [paymentType, setPaymentType] = React.useState<'lease' | 'reservation'>(
    'lease'
  );
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [extraChargeId, setExtraChargeId] = React.useState(0);

  const handleSuccess = (message: string) => {
    showNotification({
      color: 'green',
      icon: <IconCheck size={14} />,
      message,
      title: 'Success',
    });
  };

  const handleOnAction = (
    type: Data.Action,
    paymentType: 'lease' | 'reservation',
    id?: number
  ) => {
    if (id) {
      setExtraChargeId(id);
    }

    setType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Extra charges */}
      <TablePayments
        userId={user?.id}
        onView={(id: number, paymentType: 'lease' | 'reservation') =>
          handleOnAction('View Payment', paymentType, id)
        }
      />

      {/* Modals */}
      <ModalPayment
        id={extraChargeId}
        isOpen={isModalOpen}
        paymentType={paymentType}
        type={type}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </>
  );
};

Payments.getLayout = (page: React.ReactElement) => <Tenant>{page}</Tenant>;

export default Payments;
