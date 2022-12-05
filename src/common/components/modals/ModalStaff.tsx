import React from 'react';

import { FormCreateStaff } from '../forms/FormCreateStaff';
import { FormDeleteStaff } from '../forms/FormDeleteStaff';
import { FormEditStaff } from '../forms/FormEditStaff';
import { FormViewStaff } from '../forms/FormViewStaff';
import { ModalInstance } from './ModalInstance';

type Props = {
  type: Data.Action;
  isOpen: boolean;
  id?: number;
  onSuccess: (message: string) => void;
  onClose: () => void;
};

export const ModalStaff: React.FC<Props> = ({
  type,
  id,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const title = React.useMemo(() => `${type} Staff`, [type]);

  return (
    <ModalInstance isOpen={isOpen} title={title} onClose={onClose}>
      {type === 'Create' && (
        <FormCreateStaff onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'View' && id && <FormViewStaff id={id} onCancel={onClose} />}

      {type === 'Edit' && id && (
        <FormEditStaff id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'Delete' && id && (
        <FormDeleteStaff id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}
    </ModalInstance>
  );
};
