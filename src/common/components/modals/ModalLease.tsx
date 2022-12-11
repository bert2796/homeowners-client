import React from 'react';

import { FormCreateLease } from '../forms/FormCreateLease';
import { FormDeleteLease } from '../forms/FormDeleteLease';
import { FormPayLease } from '../forms/FormPayLease';
import { FormViewLease } from '../forms/FormViewLease';
import { FormViewLeasePayment } from '../forms/FormViewLeasePayment';
import { ModalInstance } from './ModalInstance';

type Props = {
  type: Data.Action;
  isOpen: boolean;
  id?: number;
  onSuccess: (message: string) => void;
  onClose: () => void;
};

export const ModalLease: React.FC<Props> = ({
  type,
  id,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const title = React.useMemo(
    () => `${type} ${type !== 'View Payment' ? 'Lease' : ''} `,
    [type]
  );

  return (
    <ModalInstance isOpen={isOpen} title={title} onClose={onClose}>
      {type === 'Create' && (
        <FormCreateLease onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'View' && id && <FormViewLease id={id} onCancel={onClose} />}

      {type === 'View Payment' && id && (
        <FormViewLeasePayment id={id} onCancel={onClose} />
      )}

      {type === 'Delete' && id && (
        <FormDeleteLease id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'Pay' && id && (
        <FormPayLease id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}
    </ModalInstance>
  );
};
