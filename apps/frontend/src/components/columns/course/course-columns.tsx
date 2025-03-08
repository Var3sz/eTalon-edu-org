'use client';

import { ColumnDef } from '@tanstack/react-table';

import { DataTableColumnHeader } from '@/components/tables/columns/components/data-table-column-header';
import { Checkbox } from '@/components/ui/checkbox';
import { Course } from '@/models/course/types';
export const courseColumns: ColumnDef<Course>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(Boolean(value))}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'id',
    accessorKey: 'id',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Kurzus azonosító' />,
  },
  {
    id: 'type',
    accessorKey: 'type',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Kurzus típus' />,
  },
  {
    id: 'grade',
    accessorKey: 'grade',
    header: ({ column }) => <DataTableColumnHeader column={column} title='Évfolyam' />,
  },
];
