import { Badge, createStyles, Loader, Paper, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import currency from 'currency.js';
import dayjs from 'dayjs';
import React from 'react';

import { useGetLeases } from '../../hooks/api';
import { ActionButton } from '../widgets/ActionButton';
import { EmptyItems } from '../widgets/EmptyItems';
import { SearchAndAdd } from '../widgets/SearchAndAdd';
import { TableInstance } from './TableInstance';

type Props = {
  userId?: number;
  onAdd?: () => void;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onPay?: (id: number) => void;
  onView?: (id: number) => void;
  onViewPayment?: (id: number) => void;
};

export const TableLeases: React.FC<Props> = ({
  userId,
  onAdd,
  onDelete,
  onEdit,
  onPay,
  onView,
  onViewPayment,
}) => {
  const [search, setSearch] = React.useState('');

  const { classes } = useStyles();
  const [debounced] = useDebouncedValue(search, 200);
  const { data: getLeases, isLoading } = useGetLeases(userId);

  const columns = React.useMemo<ColumnDef<Data.Lease>[]>(
    () => [
      {
        cell: ({ row }) => (
          <Text>
            {row.original.tenant.firstName} {row.original.tenant.lastName}
          </Text>
        ),
        header: 'TENANT',
      },
      {
        cell: ({ row }) => (
          <Text>
            {row.original.property.code}: {row.original.property.name}
          </Text>
        ),
        header: 'PROPERTY',
      },
      {
        cell: ({ row }) => (
          <Text>
            {currency(row.original.totalAmount, {
              precision: 2,
              symbol: '',
            }).format()}
          </Text>
        ),
        header: 'TOTAL',
      },
      {
        cell: ({ row }) => (
          <Text>{dayjs(row.original.date).format('MM/DD/YYYY')}</Text>
        ),
        header: 'DATE',
      },
      ...(userId
        ? [
            {
              cell: ({ row }: CellContext<Data.Lease, unknown>) => {
                const payments = row.original.leasePayments;

                let color: 'gray' | 'red' | 'blue' | 'green' = 'red';
                const status = payments?.length ? payments[0].status : 'None';

                if (status === 'Pending') {
                  color = 'blue';
                } else if (status === 'Approved') {
                  color = 'green';
                } else if (status === 'Rejected') {
                  color = 'red';
                } else {
                  color = 'gray';
                }

                return (
                  <Badge color={color} variant="filled">
                    {status}
                  </Badge>
                );
              },
              header: 'Payment Status',
            },
          ]
        : []),
      {
        cell: ({ row }) => {
          const lease = row.original;
          if (userId && lease?.leasePayments?.[0]?.status === 'Pending') {
            const leasePayment = lease.leasePayments[0];

            return (
              <ActionButton
                id={row.original.id}
                onDelete={onDelete}
                onEdit={onEdit}
                onView={onView}
                onViewPayment={() => {
                  if (leasePayment && onViewPayment) {
                    onViewPayment(leasePayment.id);
                  }
                }}
              />
            );
          }

          if (userId && lease?.leasePayments?.[0]?.status === 'Approved') {
            const leasePayment = lease.leasePayments[0];

            return (
              <ActionButton
                id={row.original.id}
                onView={onView}
                onViewPayment={() => {
                  if (leasePayment && onViewPayment) {
                    onViewPayment(leasePayment.id);
                  }
                }}
              />
            );
          }

          return (
            <ActionButton
              id={row.original.id}
              onDelete={onDelete}
              onEdit={onEdit}
              onPay={onPay}
              onView={onView}
            />
          );
        },
        header: 'ACTIONS',
      },
    ],
    [onDelete, onEdit, onPay, onView, onViewPayment, userId]
  );

  const handleChangedSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(event.currentTarget.value);

  return (
    <Paper p="xl">
      {isLoading && (
        <div className={classes.loader}>
          <Loader mt="xl" />
        </div>
      )}

      {!isLoading && !getLeases?.data?.length && (
        <EmptyItems title={'No leases...'} onCreate={onAdd} />
      )}

      {!isLoading && Boolean(getLeases?.data?.length) && (
        <>
          <SearchAndAdd
            resource="Lease"
            onAdd={onAdd}
            onSearch={handleChangedSearch}
          />
          <TableInstance
            columns={columns}
            data={getLeases?.data || []}
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
