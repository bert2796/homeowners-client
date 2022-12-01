import { Button, Group, Input } from '@mantine/core';
import { IconPlus, IconSearch } from '@tabler/icons';
import React from 'react';

type Props = {
  resource: string;
  onAdd?: () => void;
  onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const SearchAndAdd: React.FC<Props> = ({
  resource,
  onSearch,
  onAdd,
}) => (
  <Group mb="lg" position="apart">
    <Input
      icon={<IconSearch size={14} />}
      placeholder="Search"
      size="md"
      variant="filled"
      onChange={onSearch}
    />
    {onAdd && (
      <Button leftIcon={<IconPlus size={14} />} size="md" onClick={onAdd}>
        Add {resource}
      </Button>
    )}
  </Group>
);
