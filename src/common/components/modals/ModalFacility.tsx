import React from 'react';

import { FormCreateFacility } from '../forms/FormCreateFacility';
import { FormDeleteFacility } from '../forms/FormDeleteFacility';
import { FormEditFacility } from '../forms/FormEditFacility';
import { FormViewFacility } from '../forms/FormViewFacility';
import { ModalInstance } from './ModalInstance';

type Props = {
  type: Data.Action;
  isOpen: boolean;
  id?: number;
  onSuccess?: (message: string) => void;
  onClose: () => void;
};

export const ModalFacility: React.FC<Props> = ({
  type,
  id,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const title = React.useMemo(() => `${type} Facility`, [type]);

  return (
    <ModalInstance
      isOpen={isOpen}
      size={['Create', 'View'].includes(type) ? 'xl' : 'lg'}
      title={title}
      onClose={onClose}
    >
      {type === 'Create' && onSuccess && (
        <FormCreateFacility onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'View' && id && <FormViewFacility id={id} onCancel={onClose} />}

      {type === 'Edit' && id && onSuccess && (
        <FormEditFacility id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'Delete' && id && onSuccess && (
        <FormDeleteFacility id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}
    </ModalInstance>
  );
};
