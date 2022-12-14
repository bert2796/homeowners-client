import { createStyles, Loader, Paper, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import dayjs from 'dayjs';
import React from 'react';

import { useGetPolls } from '../../hooks/api';
import { ActionButton } from '../widgets/ActionButton';
import { EmptyItems } from '../widgets/EmptyItems';
import { SearchAndAdd } from '../widgets/SearchAndAdd';
import { TableInstance } from './TableInstance';

type Props = {
  onAdd?: () => void;
  onDelete?: (id: number) => void;
  onView?: (id: number) => void;
  onViewResult?: (id: number) => void;
  onVote?: (id: number) => void;
};

export const TablePolls: React.FC<Props> = ({
  onAdd,
  onDelete,
  onView,
  onViewResult,
  onVote,
}) => {
  const [search, setSearch] = React.useState('');

  const { classes } = useStyles();
  const [debounced] = useDebouncedValue(search, 200);
  const { data: getPolls, isLoading } = useGetPolls();

  const columns = React.useMemo<ColumnDef<Data.Poll>[]>(
    () => [
      {
        accessorKey: 'title',
        header: 'TITLE',
      },
      {
        cell: ({ row }) => (
          <Text>{row.original?.pollChoices?.length || 0}</Text>
        ),
        header: 'CHOICES',
      },
      {
        cell: ({ row }) => <Text>{row.original?.allowedAnswer || 0}</Text>,
        header: 'ALLOWED ANSWER',
      },
      {
        cell: ({ row }) => (
          <Text>{dayjs(row.original.endDate).format('MM/DD/YYYY')}</Text>
        ),
        header: 'END DATE',
      },
      {
        cell: ({ row }) => (
          <Text>{dayjs(row.original.createdAt).format('MM/DD/YYYY')}</Text>
        ),
        header: 'DATE ADDED',
      },
      ...(onVote
        ? [
            {
              cell: ({ row }: CellContext<Data.Poll, unknown>) => (
                <Text>{row.original?.allowedAnswer || 0}</Text>
              ),
              header: 'ALLOWED ANSWER',
            },
          ]
        : []),
      {
        cell: ({ row }) => (
          <ActionButton
            id={row.original.id}
            onDelete={onDelete}
            onView={onView}
            onViewResult={onViewResult}
            onVote={onVote}
          />
        ),
        header: 'ACTIONS',
      },
    ],
    [onDelete, onView, onViewResult, onVote]
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

      {!isLoading && !getPolls?.data?.length && (
        <EmptyItems title="No Polls Yet..." onCreate={onAdd} />
      )}

      {!isLoading && Boolean(getPolls?.data?.length) && (
        <>
          <SearchAndAdd
            resource="Poll"
            onAdd={onAdd}
            onSearch={handleChangedSearch}
          />
          <TableInstance
            columns={columns}
            data={getPolls?.data || []}
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
