import React from 'react';

import { FormCreateTenant } from '../forms/FormCreateTenant';
import { FormDeleteTenant } from '../forms/FormDeleteTenant';
import { FormEditTenant } from '../forms/FormEditTenant';
import { FormViewTenant } from '../forms/FormViewTenant';
import { ModalInstance } from './ModalInstance';

type Props = {
  type: Data.Action;
  isOpen: boolean;
  id?: number;
  onSuccess: (message: string) => void;
  onClose: () => void;
};

export const ModalTenant: React.FC<Props> = ({
  type,
  id,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const title = React.useMemo(() => `${type} Tenant`, [type]);

  return (
    <ModalInstance isOpen={isOpen} title={title} onClose={onClose}>
      {type === 'Create' && (
        <FormCreateTenant onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'View' && id && <FormViewTenant id={id} onCancel={onClose} />}

      {type === 'Edit' && id && (
        <FormEditTenant id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'Delete' && id && (
        <FormDeleteTenant id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}
    </ModalInstance>
  );
};
