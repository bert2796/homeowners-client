import { Badge, createStyles, Loader, Paper, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { CellContext, ColumnDef } from '@tanstack/react-table';
import currency from 'currency.js';
import dayjs from 'dayjs';
import React from 'react';

import { useGetReservations } from '../../hooks/api';
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

export const TableReservations: React.FC<Props> = ({
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
  const { data: getReservations, isLoading } = useGetReservations(userId);

  const columns = React.useMemo<ColumnDef<Data.Reservation>[]>(
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
        cell: ({ row }) => <Text>{row.original.facility.name}</Text>,
        header: 'FACILITY',
      },
      {
        cell: ({ row }) => (
          <Text>
            PHP{' '}
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
          <Text>
            {dayjs(row.original.startDate).format('MMM D, YYYY h:mm A')}
          </Text>
        ),
        header: 'START DATE',
      },
      {
        cell: ({ row }) => (
          <Text>
            {dayjs(row.original.endDate).format('MMM D, YYYY h:mm A')}
          </Text>
        ),
        header: 'END DATE',
      },
      ...(userId
        ? [
            {
              cell: ({ row }: CellContext<Data.Reservation, unknown>) => {
                const payments = row.original.reservationPayments;

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
          const reservation = row.original;
          if (
            userId &&
            reservation?.reservationPayments?.[0]?.status === 'Pending'
          ) {
            const reservationPayment = reservation.reservationPayments[0];

            return (
              <ActionButton
                id={row.original.id}
                onDelete={onDelete}
                onEdit={onEdit}
                onView={onView}
                onViewPayment={() => {
                  if (reservationPayment && onViewPayment) {
                    onViewPayment(reservationPayment.id);
                  }
                }}
              />
            );
          }

          if (
            userId &&
            reservation?.reservationPayments?.[0]?.status === 'Approved'
          ) {
            const reservationPayment = reservation.reservationPayments[0];

            return (
              <ActionButton
                id={row.original.id}
                onView={onView}
                onViewPayment={() => {
                  if (reservationPayment && onViewPayment) {
                    onViewPayment(reservationPayment.id);
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

      {!isLoading && !getReservations?.data?.length && (
        <EmptyItems title={'No reservations...'} onCreate={onAdd} />
      )}

      {!isLoading && Boolean(getReservations?.data?.length) && (
        <>
          <SearchAndAdd
            resource="Reservation"
            onAdd={onAdd}
            onSearch={handleChangedSearch}
          />
          <TableInstance
            columns={columns}
            data={getReservations?.data || []}
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
