import React from 'react';

import { FormCreateExtraCharge } from '../forms/FormCreateExtraCharge';
import { FormDeleteExtraCharge } from '../forms/FormDeleteExtraCharge';
import { FormEditExtraCharge } from '../forms/FormEditExtraCharge';
import { FormViewExtraCharge } from '../forms/FormViewExtraCharge';
import { ModalInstance } from './ModalInstance';

type Props = {
  type: Data.Action;
  isOpen: boolean;
  id?: number;
  onSuccess: (message: string) => void;
  onClose: () => void;
};

export const ModalExtraCharge: React.FC<Props> = ({
  type,
  id,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const title = React.useMemo(() => `${type} Extra Charge`, [type]);

  return (
    <ModalInstance isOpen={isOpen} title={title} onClose={onClose}>
      {type === 'Create' && (
        <FormCreateExtraCharge onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'View' && id && (
        <FormViewExtraCharge id={id} onCancel={onClose} />
      )}

      {type === 'Edit' && id && (
        <FormEditExtraCharge id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'Delete' && id && (
        <FormDeleteExtraCharge
          id={id}
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      )}
    </ModalInstance>
  );
};
