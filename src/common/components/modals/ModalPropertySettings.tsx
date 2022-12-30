import React from 'react';

import { FormCreatePropertySettings } from '../forms/FormCreatePropertySettings';
import { FormDeletePropertySettings } from '../forms/FormDeletePropertySettings';
import { FormEditPropertySettings } from '../forms/FormEditPropertySettings';
import { FormViewPropertySettings } from '../forms/FormViewPropertySettings';
import { ModalInstance } from './ModalInstance';

type Props = {
  type: Data.Action;
  isOpen: boolean;
  id?: number;
  settingsType: 'Block' | 'Phase' | 'Type' | 'Lot';
  onSuccess: (message: string) => void;
  onClose: () => void;
};

export const ModalPropertySettings: React.FC<Props> = ({
  type,
  id,
  isOpen,
  settingsType,
  onClose,
  onSuccess,
}) => {
  const title = React.useMemo(
    () => `${type} Property ${settingsType.toLowerCase()}`,
    [settingsType, type]
  );

  return (
    <ModalInstance isOpen={isOpen} title={title} onClose={onClose}>
      {type === 'Create' && (
        <FormCreatePropertySettings
          settingsType={settingsType}
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      )}

      {type === 'View' && id && (
        <FormViewPropertySettings
          id={id}
          settingsType={settingsType}
          onCancel={onClose}
        />
      )}

      {type === 'Edit' && id && (
        <FormEditPropertySettings
          id={id}
          settingsType={settingsType}
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      )}

      {type === 'Delete' && id && (
        <FormDeletePropertySettings
          id={id}
          settingsType={settingsType}
          onCancel={onClose}
          onSuccess={onSuccess}
        />
      )}
    </ModalInstance>
  );
};
