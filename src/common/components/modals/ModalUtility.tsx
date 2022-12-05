import React from 'react';

import { FormCreateUtility } from '../forms/FormCreateUtility';
import { FormDeleteUtility } from '../forms/FormDeleteUtility';
import { FormEditUtility } from '../forms/FormEditUtility';
import { FormViewUtility } from '../forms/FormViewUtility';
import { ModalInstance } from './ModalInstance';

type Props = {
  type: Data.Action;
  isOpen: boolean;
  id?: number;
  onSuccess: (message: string) => void;
  onClose: () => void;
};

export const ModalUtility: React.FC<Props> = ({
  type,
  id,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const title = React.useMemo(() => `${type} Utility`, [type]);

  return (
    <ModalInstance isOpen={isOpen} title={title} onClose={onClose}>
      {type === 'Create' && (
        <FormCreateUtility onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'View' && id && <FormViewUtility id={id} onCancel={onClose} />}

      {type === 'Edit' && id && (
        <FormEditUtility id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'Delete' && id && (
        <FormDeleteUtility id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}
    </ModalInstance>
  );
};
