import { createStyles, Loader, Paper, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import React from 'react';

import { useGetPropertySettings } from '../../hooks/api';
import { ActionButton } from '../widgets/ActionButton';
import { EmptyItems } from '../widgets/EmptyItems';
import { SearchAndAdd } from '../widgets/SearchAndAdd';
import { TableInstance } from './TableInstance';

type Props = {
  type: 'Type' | 'Block' | 'Phase';
  onAdd?: () => void;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onView?: (id: number) => void;
};

export const TableProperties: React.FC<Props> = ({
  type,
  onAdd,
  onDelete,
  onEdit,
  onView,
}) => {
  const [search, setSearch] = React.useState('');

  const { classes } = useStyles();
  const [debounced] = useDebouncedValue(search, 200);
  const { data: getPropertySettings, isLoading } =
    useGetPropertySettings(type)();

  const columns = React.useMemo<ColumnDef<Data.PropertySettings>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NAME',
      },
      {
        accessorKey: 'display',
        header: 'DISPLAY',
      },
    ],
    []
  );

  const handleChangedSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.currentTarget.value);

  return (
    <Paper p="xl" shadow="sm">
      {isLoading && (
        <div className={classes.loader}>
          <Loader mt="xl" />
        </div>
      )}

      {!isLoading && !getPropertySettings?.data?.length && (
        <EmptyItems title={`No Properties ${type}s...`} onCreate={onAdd} />
      )}

      {!isLoading && Boolean(getPropertySettings?.data?.length) && (
        <>
          <SearchAndAdd
            resource={`Property ${type}`}
            onAdd={onAdd}
            onSearch={handleChangedSearch}
          />
          <TableInstance
            columns={columns}
            data={getPropertySettings?.data || []}
            state={{ globalFilter: debounced }}
            onGlobalFilterChange={setSearch}
          />
        </>
      )}
    </Paper>
  );
};

const useStyles = createStyles(() => ({
  loader: {
    textAlign: 'center',
  },
}));
