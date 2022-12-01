import { createStyles, Loader, Paper, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import React from 'react';

import { useGetProperties } from '../../hooks/api';
import { ActionButton } from '../widgets/ActionButton';
import { EmptyItems } from '../widgets/EmptyItems';
import { SearchAndAdd } from '../widgets/SearchAndAdd';
import { TableInstance } from './TableInstance';

type Props = {
  onAdd: () => void;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onView: (id: number) => void;
};

export const TableProperties: React.FC<Props> = ({
  onAdd,
  onDelete,
  onEdit,
  onView,
}) => {
  const [search, setSearch] = React.useState('');

  const { classes } = useStyles();
  const [debounced] = useDebouncedValue(search, 200);
  const { data: getProperties, isLoading } = useGetProperties();

  const columns = React.useMemo<ColumnDef<Data.Property>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NAME',
      },
      {
        accessorKey: 'code',
        header: 'CODE',
      },
      {
        accessorFn: (row) => row.propertyType.display,
        header: 'TYPE',
      },
      {
        accessorFn: (row) => row.propertyLocationBlock.display,
        header: 'BLOCK',
      },
      {
        accessorFn: (row) => row.propertyLocationPhase.display,
        header: 'PHASE',
      },
      // {
      //   cell: ({ row }) => <Text>{dayjs(row.original.createdAt)}</Text>,
      //   header: 'DATE ADDED',
      // },
      {
        cell: ({ row }) => (
          <ActionButton
            id={row.original.id}
            onDelete={onDelete}
            onEdit={onEdit}
            onView={onView}
          />
        ),
        header: 'ACTIONS',
      },
    ],
    [onDelete, onEdit, onView]
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

      {!isLoading && !getProperties?.data?.length && (
        <EmptyItems title="No Properties Yet..." onCreate={onAdd} />
      )}

      {!isLoading && Boolean(getProperties?.data?.length) && (
        <>
          <SearchAndAdd
            resource="Property"
            onAdd={onAdd}
            onSearch={handleChangedSearch}
          />
          <TableInstance
            columns={columns}
            data={getProperties?.data || []}
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
