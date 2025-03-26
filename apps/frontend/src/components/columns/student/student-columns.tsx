'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import ActionsTableColumn from '@/components/tables/columns/components/action-columns/actions-table-column';
import TextTableColumn from '@/components/tables/columns/components/basic-columns/text-table-column';
import { StudentLocales } from '@/locales/student-locales';
import { Student } from '@/models/course/types';

export default function StudentColumns(): ColumnDef<Student>[] {
  return useMemo(
    () => [
      ActionsTableColumn<Student>({
        id: 'select',
        accessorKey: 'select',
        headerTitle: '',
        select: true,
      }),
      TextTableColumn<Student>({ id: 'name', accessorKey: 'name', headerTitle: StudentLocales.table.name }),
    ],
    []
  );
}
