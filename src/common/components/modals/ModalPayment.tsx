import React from 'react';

import { FormApprovePayment } from '../forms/FormApprovePayment';
import { FormRejectPayment } from '../forms/FormRejectPayment';
import { FormViewLeasePayment } from '../forms/FormViewLeasePayment';
import { FormViewReservationPayment } from '../forms/FormViewReservationPayment';
import { ModalInstance } from './ModalInstance';

type Props = {
  type: Data.Action;
  paymentType: 'lease' | 'reservation';
  isOpen: boolean;
  id?: number;
  onSuccess: (message: string) => void;
  onClose: () => void;
};

export const ModalPayment: React.FC<Props> = ({
  type,
  paymentType,
  id,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const title = React.useMemo(() => type, [type]);

  return (
    <ModalInstance isOpen={isOpen} title={title} onClose={onClose}>
      {type === 'Approve Payment' && id && (
        <FormApprovePayment
          id={id}
          type={paymentType}
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      )}

      {type === 'Reject Payment' && id && (
        <FormRejectPayment
          id={id}
          type={paymentType}
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      )}

      {type === 'View Payment' && paymentType === 'lease' && id && (
        <FormViewLeasePayment id={id} onCancel={onClose} />
      )}

      {type === 'View Payment' && paymentType === 'reservation' && id && (
        <FormViewReservationPayment id={id} onCancel={onClose} />
      )}
    </ModalInstance>
  );
};
