import React from 'react';

import { FormCreateProperty } from '../forms/FormCreateProperty';
import { FormDeletePoll } from '../forms/FormDeletePoll';
import { FormViewProperty } from '../forms/FormViewProperty';
import { ModalInstance } from './ModalInstance';

type Props = {
  type: Data.Action;
  isOpen: boolean;
  id?: number;
  onSuccess: (message: string) => void;
  onClose: () => void;
};

export const ModalPoll: React.FC<Props> = ({
  type,
  id,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const title = React.useMemo(() => `${type} Poll`, [type]);

  return (
    <ModalInstance isOpen={isOpen} title={title} onClose={onClose}>
      {type === 'Create' && (
        <FormCreateProperty onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'View' && id && <FormViewProperty id={id} onCancel={onClose} />}

      {type === 'Delete' && id && (
        <FormDeletePoll id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}
    </ModalInstance>
  );
};
