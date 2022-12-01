import React from 'react';

import { FormCreateProperty } from '../forms/FormCreateProperty';
import { FormDeleteProperty } from '../forms/FormDeleteProperty';
import { FormEditProperty } from '../forms/FormEditProperty';
import { FormViewProperty } from '../forms/FormViewProperty';
import { ModalInstance } from './ModalInstance';

type Props = {
  type: Data.Action;
  isOpen: boolean;
  id?: number;
  onSuccess: (message: string) => void;
  onClose: () => void;
};

export const ModalProperty: React.FC<Props> = ({
  type,
  id,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const title = React.useMemo(() => `${type} Property`, [type]);

  return (
    <ModalInstance isOpen={isOpen} title={title} onClose={onClose}>
      {type === 'Create' && (
        <FormCreateProperty onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'View' && id && <FormViewProperty id={id} onCancel={onClose} />}

      {type === 'Edit' && id && (
        <FormEditProperty id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'Delete' && id && (
        <FormDeleteProperty id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}
    </ModalInstance>
  );
};
