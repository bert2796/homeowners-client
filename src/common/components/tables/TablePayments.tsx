import {
  Badge,
  Box,
  createStyles,
  Loader,
  Paper,
  Tabs,
  Text,
} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { IconFileDislike, IconFileLike, IconFileReport } from '@tabler/icons';
import { ColumnDef } from '@tanstack/react-table';
import currency from 'currency.js';
import dayjs from 'dayjs';
import React from 'react';

import { useGetPayments } from '../../hooks/api';
import { ActionButton } from '../widgets/ActionButton';
import { EmptyItems } from '../widgets/EmptyItems';
import { TableInstance } from './TableInstance';

type Props = {
  userId?: number;
  onApprovePayment?: (id: number, paymentType: 'lease' | 'facility') => void;
  onRejectPayment?: (id: number, paymentType: 'lease' | 'facility') => void;
  onView?: (id: number, paymentType: 'lease' | 'facility') => void;
};

export const TablePayments: React.FC<Props> = ({
  userId,
  onApprovePayment,
  onRejectPayment,
  onView,
}) => {
  const [search, setSearch] = React.useState('');

  const { classes } = useStyles();
  const [debounced] = useDebouncedValue(search, 200);
  const { data: getPayments, isLoading } = useGetPayments(userId);

  const pendingPayments =
    getPayments?.data?.filter((v) => v.status === 'Pending') || [];
  const approvedPayments =
    getPayments?.data?.filter((v) => v.status === 'Approved') || [];
  const rejectedPayments =
    getPayments?.data?.filter((v) => v.status === 'Rejected') || [];

  const getColumns = (params?: {
    showApproveButton?: boolean;
    showRejectButton?: boolean;
    forApproval?: boolean;
    forRejected?: boolean;
  }) => {
    const columns: ColumnDef<Data.Payment>[] = [
      {
        cell: ({ row }) => (
          <Text>{`${row.original.user.firstName} ${row.original.user.lastName}`}</Text>
        ),
        header: 'NAME',
      },
      {
        cell: ({ row }) => {
          const payment = row.original;

          let color: 'gray' | 'red' | 'blue' | 'green' = 'red';
          if (payment.paymentType === 'lease') {
            color = 'blue';
          } else {
            color = 'gray';
          }

          return (
            <Badge color={color} variant="filled">
              {payment.paymentType}
            </Badge>
          );
        },
        header: 'PAYMENT TYPE',
      },
      {
        cell: ({ row }) => (
          <Text>
            {currency(row.original.amount, {
              precision: 2,
              symbol: '',
            }).format()}
          </Text>
        ),
        header: 'TOTAL',
      },
      {
        cell: ({ row }) => {
          const payment = row.original;
          return <Text>{dayjs(payment.date).format('MMM D, YYYY')}</Text>;
        },
        header: 'DUE DATE',
      },
      {
        cell: ({ row }) => {
          const payment = row.original;
          const isForApproval = params?.forApproval;
          const isForRejected = params?.forRejected;
          return (
            <Text>
              {dayjs(
                isForApproval || isForRejected
                  ? payment.updatedAt
                  : payment.createdAt
              ).format('MMM D, YYYY h:mm A')}
            </Text>
          );
        },
        header: params?.forApproval
          ? 'DATE APPROVED'
          : params?.forRejected
          ? 'DATE REJECTED'
          : 'DATE SUBMITTED',
      },
      {
        cell: ({ row }) => {
          const payment = row.original;
          return (
            <ActionButton
              id={payment.id}
              {...(params?.showApproveButton && {
                onApprovePayment: () => {
                  if (onApprovePayment) {
                    onApprovePayment(payment.id, payment.paymentType);
                  }
                },
              })}
              {...(params?.showRejectButton && {
                onRejectPayment: () => {
                  if (onRejectPayment) {
                    onRejectPayment(payment.id, payment.paymentType);
                  }
                },
              })}
              onView={() => {
                if (onView) {
                  onView(payment.id, payment.paymentType);
                }
              }}
            />
          );
        },
        header: 'ACTIONS',
      },
    ];

    return columns;
  };

  // const handleChangedSearch = (event: React.ChangeEvent<HTMLInputElement>) =>
  //   setSearch(event.currentTarget.value);

  return (
    <Paper p="xl">
      {isLoading && (
        <div className={classes.loader}>
          <Loader mt="xl" />
        </div>
      )}

      {!isLoading && !getPayments?.data?.length && (
        <EmptyItems title={`No payments...`} />
      )}

      {!isLoading && Boolean(getPayments?.data?.length) && (
        // <>
        //   <SearchAndAdd resource="Payment" onSearch={handleChangedSearch} />
        //   <TableInstance
        //     columns={getColumns()}
        //     data={getPayments?.data || []}
        //     state={{ globalFilter: debounced }}
        //     onGlobalFilterChange={setSearch}
        //   />
        // </>
        <Tabs defaultValue="pendingPayments">
          <Tabs.List style={{ backgroundColor: '#fff' }}>
            <Tabs.Tab icon={<IconFileReport />} value="pendingPayments">
              Pending
            </Tabs.Tab>
            <Tabs.Tab icon={<IconFileLike />} value="approvedPayments">
              Approved
            </Tabs.Tab>
            <Tabs.Tab icon={<IconFileDislike />} value="rejectedPayments">
              Rejected
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="pendingPayments">
            {!pendingPayments.length && (
              <EmptyItems title="No Pending Payments" />
            )}

            {Boolean(pendingPayments.length) && (
              <Box mt="xl">
                <TableInstance
                  columns={getColumns({
                    showApproveButton: true,
                    showRejectButton: true,
                  })}
                  data={pendingPayments}
                  state={{ globalFilter: debounced }}
                  onGlobalFilterChange={setSearch}
                />
              </Box>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="approvedPayments">
            {!approvedPayments.length && (
              <EmptyItems title="No Approved Payments" />
            )}

            {Boolean(approvedPayments.length) && (
              <Box mt="xl">
                <TableInstance
                  columns={getColumns()}
                  data={approvedPayments}
                  state={{ globalFilter: debounced }}
                  onGlobalFilterChange={setSearch}
                />
              </Box>
            )}
          </Tabs.Panel>

          <Tabs.Panel value="rejectedPayments">
            {!rejectedPayments.length && (
              <EmptyItems title="No Rejected Payments" />
            )}

            {Boolean(rejectedPayments.length) && (
              <Box mt="xl">
                <TableInstance
                  columns={getColumns()}
                  data={rejectedPayments}
                  state={{ globalFilter: debounced }}
                  onGlobalFilterChange={setSearch}
                />
              </Box>
            )}
          </Tabs.Panel>
        </Tabs>
      )}
    </Paper>
  );
};

const useStyles = createStyles(() => ({
  loader: {
    textAlign: 'center',
  },
}));
