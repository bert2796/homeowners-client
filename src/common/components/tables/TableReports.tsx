import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import { ColumnDef } from '@tanstack/react-table';
import currency from 'currency.js';
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import React from 'react';

import { ExportExcel } from '../exports/ExportExcel';
import { EmptyItems } from '../widgets/EmptyItems';
import { TableInstance } from './TableInstance';

dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);

type Props = {
  period: 'weekly' | 'monthly' | 'yearly';
  type:
    | 'lease-payments'
    | 'utility-charges'
    | 'extra-charges'
    | 'reservation-payments';
  reports: Data.Report[];
};

export const TableReports: React.FC<Props> = ({ period, type, reports }) => {
  const convertedReports = React.useMemo<Data.Report[]>(() => {
    return reports?.map((report) => {
      const isWeekly = period === 'weekly';
      const isMonthly = period === 'monthly';

      let date = report.date;
      if (isWeekly) {
        const weekOfYear = +date.split('-')[1];
        const isoWeekDate = dayjs().isoWeek(weekOfYear);
        date = `${isoWeekDate
          .startOf('w')
          .format('MMM D, YYYY')} - ${isoWeekDate
          .endOf('w')
          .format('MMM D, YYYY')}`;
      }

      if (isMonthly) {
        const [year, month] = date.split('-');

        date = dayjs()
          .set('m', +month)
          .set('y', +year)
          .format('MMM - YYYY');
      }

      return {
        date,
        total: report.total,
      };
    });
  }, [period, reports]);

  const columns = React.useMemo<ColumnDef<Data.Report>[]>(
    () => [
      {
        cell: ({ row }) => {
          const isWeekly = period === 'weekly';
          const isMonthly = period === 'monthly';

          if (isWeekly) {
            const weekOfYear = +row.original.date.split('-')[1];
            const date = dayjs().isoWeek(weekOfYear);
            return (
              <Text>
                {date.startOf('w').format('MMM D, YYYY')} -{' '}
                {date.endOf('w').format('MMM D, YYYY')}
              </Text>
            );
          }

          if (isMonthly) {
            const [year, month] = row.original.date.split('-');

            return (
              <Text>
                {dayjs()
                  .set('m', +month)
                  .set('y', +year)
                  .format('MMM - YYYY')}
              </Text>
            );
          }

          return <Text>{row.original.date}</Text>;
        },
        header: 'DATE',
      },
      {
        cell: ({ row }) => (
          <Text>
            PHP{' '}
            {currency(row.original.total, {
              precision: 2,
              symbol: '',
            }).format()}
          </Text>
        ),
        header: 'TOTAL',
      },
    ],
    [period]
  );

  return (
    <Paper p="xl" shadow="sm">
      {!reports.length && (
        <EmptyItems title="No Data Yet... Can't generate report" />
      )}

      {Boolean(reports.length) && (
        <>
          <TableInstance
            columns={columns}
            data={reports || []}
            hasPagination={false}
          />

          <SimpleGrid
            breakpoints={[{ cols: 1, maxWidth: 'sm' }]}
            cols={2}
            mt="md"
          >
            <Group position="left">
              <ExportExcel
                fileName={`${type}-${period}-${dayjs().format('MMM D, YYYY')}`}
                reports={convertedReports}
              />
            </Group>

            <Group position="right">
              <Text>
                Overall Total:{' '}
                {currency(
                  reports.reduce((prev, current) => prev + current.total, 0),
                  {
                    precision: 2,
                    symbol: '',
                  }
                ).format()}
              </Text>
            </Group>
          </SimpleGrid>
        </>
      )}
    </Paper>
  );
};
