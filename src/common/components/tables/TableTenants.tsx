import { createStyles, Loader, Paper, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import React from 'react';

import { useGetTenants } from '../../hooks/api';
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

export const TableTenants: React.FC<Props> = ({
  onAdd,
  onDelete,
  onEdit,
  onView,
}) => {
  const [search, setSearch] = React.useState('');

  const { classes } = useStyles();
  const [debounced] = useDebouncedValue(search, 200);
  const { data: getTenants, isLoading } = useGetTenants();

  const columns = React.useMemo<ColumnDef<Data.User>[]>(
    () => [
      {
        accessorKey: 'firstName',
        header: 'FIRST NAME',
      },
      {
        accessorKey: 'lastName',
        header: 'LAST NAME',
      },
      {
        accessorKey: 'email',
        header: 'EMAIL',
      },
      {
        cell: ({ row }) => (
          <Text>{dayjs(row.original.createdAt).format('MM/DD/YYYY')}</Text>
        ),
        header: 'DATE ADDED',
      },
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

      {!isLoading && !getTenants?.data?.length && (
        <EmptyItems title="No Tenants Yet..." onCreate={onAdd} />
      )}

      {!isLoading && Boolean(getTenants?.data?.length) && (
        <>
          <SearchAndAdd
            resource="Tenant"
            onAdd={onAdd}
            onSearch={handleChangedSearch}
          />
          <TableInstance
            columns={columns}
            data={getTenants?.data || []}
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
