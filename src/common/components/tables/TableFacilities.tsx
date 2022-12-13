import { Badge, createStyles, Loader, Paper, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { ColumnDef } from '@tanstack/react-table';
import currency from 'currency.js';
import dayjs from 'dayjs';
import React from 'react';

import { useGetFacilities } from '../../hooks/api';
import { ActionButton } from '../widgets/ActionButton';
import { EmptyItems } from '../widgets/EmptyItems';
import { SearchAndAdd } from '../widgets/SearchAndAdd';
import { TableInstance } from './TableInstance';

type Props = {
  onAdd?: () => void;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onView?: (id: number) => void;
};

export const TableFacilities: React.FC<Props> = ({
  onAdd,
  onDelete,
  onEdit,
  onView,
}) => {
  const [search, setSearch] = React.useState('');

  const { classes } = useStyles();
  const [debounced] = useDebouncedValue(search, 200);
  const { data: getFacilities, isLoading } = useGetFacilities();

  const columns = React.useMemo<ColumnDef<Data.Facility>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'NAME',
      },
      {
        cell: ({ row }) => {
          const facility = row.original;

          let color: 'yellow' | 'violet' = 'yellow';
          if (facility.facilityPaymentSetting.type === 'PerHour') {
            color = 'yellow';
          } else {
            color = 'violet';
          }

          return (
            <Badge color={color} variant="outline">
              {facility.facilityPaymentSetting.type === 'PerHour'
                ? 'Per Hour'
                : 'Whole Day'}
            </Badge>
          );
        },
        header: 'PAYMENT RATE',
      },
      {
        cell: ({ row }) => (
          <Text>
            PHP{' '}
            {currency(row.original.facilityPaymentSetting.amount, {
              precision: 2,
              symbol: '',
            }).format()}
          </Text>
        ),
        header: 'AMOUNT',
      },
      {
        cell: ({ row }) => {
          const downPayment = row.original.facilityPaymentSetting.downPayment;

          return (
            <Text>
              {downPayment &&
                `PHP ${currency(downPayment, { precision: 2, symbol: '' })}`}

              {!downPayment && (
                <Badge color="red" variant="filled">
                  N/A
                </Badge>
              )}
            </Text>
          );
        },
        header: 'DOWN PAYMENT',
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

      {!isLoading && !getFacilities?.data?.length && (
        <EmptyItems title="No Facilities Yet..." onCreate={onAdd} />
      )}

      {!isLoading && Boolean(getFacilities?.data?.length) && (
        <>
          <SearchAndAdd
            resource="Facility"
            onAdd={onAdd}
            onSearch={handleChangedSearch}
          />
          <TableInstance
            columns={columns}
            data={getFacilities?.data || []}
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
