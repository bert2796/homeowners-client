import React from 'react';

import { FormCreateFacility } from '../forms/FormCreateFacility';
import { FormDeleteAnnouncement } from '../forms/FormDeleteAnnouncement';
import { FormEditAnnouncement } from '../forms/FormEditAnnouncement';
import { FormViewAnnouncement } from '../forms/FormViewAnnouncement';
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
    <ModalInstance isOpen={isOpen} title={title} onClose={onClose}>
      {type === 'Create' && onSuccess && (
        <FormCreateFacility onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'View' && id && (
        <FormViewAnnouncement id={id} onCancel={onClose} />
      )}

      {type === 'Edit' && id && onSuccess && (
        <FormEditAnnouncement
          id={id}
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      )}

      {type === 'Delete' && id && onSuccess && (
        <FormDeleteAnnouncement
          id={id}
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      )}
    </ModalInstance>
  );
};
