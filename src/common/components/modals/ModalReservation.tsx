import React from 'react';

import { FormDeleteReservation } from '../forms/FormDeleteReservation';
import { FormPayReservation } from '../forms/FormPayReservation';
import { FormViewReservation } from '../forms/FormViewReservation';
import { FormViewReservationPayment } from '../forms/FormViewReservationPayment';
import { ModalInstance } from './ModalInstance';

type Props = {
  type: Data.Action;
  isOpen: boolean;
  id?: number;
  onSuccess: (message: string) => void;
  onClose: () => void;
};

export const ModalReservation: React.FC<Props> = ({
  type,
  id,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const title = React.useMemo(
    () => `${type} ${type !== 'View Payment' ? 'Reservation' : ''} `,
    [type]
  );

  return (
    <ModalInstance isOpen={isOpen} title={title} onClose={onClose}>
      {type === 'View' && id && (
        <FormViewReservation id={id} onCancel={onClose} />
      )}

      {type === 'View Payment' && id && (
        <FormViewReservationPayment id={id} onCancel={onClose} />
      )}

      {type === 'Delete' && id && (
        <FormDeleteReservation
          id={id}
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      )}

      {type === 'Pay' && id && (
        <FormPayReservation id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}
    </ModalInstance>
  );
};
