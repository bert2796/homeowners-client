import { showNotification } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons';
import React from 'react';

import { ModalPayment } from '../../common/components/modals/ModalPayment';
import { TablePayments } from '../../common/components/tables/TablePayments';
import { Admin } from '../../common/components/templates/Admin';
import { NextPageWithLayout } from '../_app';

const Payments: NextPageWithLayout = () => {
  const [type, setType] = React.useState<Data.Action>('Create');
  const [paymentType, setPaymentType] = React.useState<'lease' | 'facility'>(
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
    paymentType: 'lease' | 'facility',
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
        onApprovePayment={(id: number, paymentType: 'lease' | 'facility') =>
          handleOnAction('Approve Payment', paymentType, id)
        }
        onRejectPayment={(id: number, paymentType: 'lease' | 'facility') =>
          handleOnAction('Reject Payment', paymentType, id)
        }
        onView={(id: number, paymentType: 'lease' | 'facility') =>
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

Payments.getLayout = (page: React.ReactElement) => <Admin>{page}</Admin>;

export default Payments;
