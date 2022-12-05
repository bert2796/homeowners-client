/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createStyles,
  Group,
  Pagination,
  ScrollArea,
  Select,
  Table,
  Text,
} from '@mantine/core';
import { rankItem } from '@tanstack/match-sorter-utils';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import React from 'react';

type Props<T extends object> = Partial<TableOptions<T>> & {
  search?: string;
  columns: ColumnDef<T>[];
  data: T[];
};

// eslint-disable-next-line @typescript-eslint/ban-types
export const TableInstance = <T extends {}>(props: Props<T>) => {
  const [scrolled, setScrolled] = React.useState(false);

  const fuzzyFilter = (row: any, columnId: any, value: any, addMeta: any) => {
    // Rank the item
    const itemRank = rankItem(row.getValue(columnId), value);

    // Store the itemRank info
    addMeta({
      itemRank,
    });

    // Return if the item should be filtered in/out
    return itemRank.passed;
  };

  const { classes } = useStyles();
  const table = useReactTable({
    ...props,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: fuzzyFilter,
  });

  return (
    <ScrollArea
      sx={{ minHeight: 300 }}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table highlightOnHover={false} sx={{ minWidth: 700 }} withBorder={false}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th className={classes.header} key={header.id}>
                  <Text c="gray.6" fw="700" fz="sm">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </Text>
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {Boolean(table.getRowModel().rows?.length) &&
            table.getRowModel().rows.map((row) => (
              <tr className={classes.bodyRow} key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className={classes.cell} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </Table>

      {Boolean(table.getRowModel().rows?.length) && (
        <Group mt="md" mx="xs" position="apart">
          <Group>
            <Text c="gray.6">Show</Text>
            <Select
              data={[
                { label: '1', value: '1' },
                { label: '10', value: '10' },
                { label: '20', value: '20' },
              ]}
              sx={{ width: 70 }}
              value={`${table.getState().pagination.pageSize}`}
              onChange={(value) => table.setPageSize(Number(value))}
            />
          </Group>

          <Pagination
            initialPage={table.getPageCount() >= 10 ? 10 : table.getPageCount()}
            page={table.getState().pagination.pageIndex + 1}
            siblings={1}
            total={table.getPageCount()}
            onChange={(page) => table.setPageIndex(page - 1)}
          />
        </Group>
      )}

      {!table.getRowModel().rows?.length && (
        <Text align="center" mt="xl">
          No data found with {props.state?.globalFilter}
        </Text>
      )}
    </ScrollArea>
  );
};

const useStyles = createStyles((theme, _params, getRef) => {
  const cell = getRef('cell');

  return {
    bodyRow: {
      [`&:last-of-type .${cell}`]: {
        borderBottom: 'none',
      },

      [`& .${cell}`]: {
        borderBottom: `1px dashed ${theme.colors.gray[3]}`,
      },
    },
    cell: {
      '&:last-child': {
        paddingRight: 0,
        textAlign: 'right',
      },

      color: theme.colors.gray[7],
      paddingBottom: `${theme.spacing.md}px !important`,
      paddingTop: `${theme.spacing.md}px !important`,
      ref: cell,
    },
    header: {
      '&:last-child': {
        paddingRight: 0,
        textAlign: 'right',
      },

      borderBottom: `1px dashed ${theme.colors.gray[3]} !important`,
      paddingBottom: `${theme.spacing.lg}px !important`,
      paddingTop: `${theme.spacing.lg}px !important`,
    },
  };
});
