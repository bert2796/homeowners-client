import React from 'react';

import { FormCreatePoll } from '../forms/FormCreatePoll';
import { FormDeletePoll } from '../forms/FormDeletePoll';
import { FormViewPoll } from '../forms/FormViewPoll';
import { FormVotePoll } from '../forms/FormVotePoll';
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
        <FormCreatePoll onCancel={onClose} onSuccess={onSuccess} />
      )}

      {type === 'View' && id && <FormViewPoll id={id} onCancel={onClose} />}

      {type === 'Vote' && id && <FormVotePoll id={id} onCancel={onClose} />}

      {type === 'Delete' && id && (
        <FormDeletePoll id={id} onCancel={onClose} onSuccess={onSuccess} />
      )}
    </ModalInstance>
  );
};
