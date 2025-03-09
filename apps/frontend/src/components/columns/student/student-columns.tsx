'use client';

import { ColumnDef } from '@tanstack/react-table';

import ActionsTableColumn from '@/components/tables/columns/components/action-columns/actions-table-column';
import TextTableColumn from '@/components/tables/columns/components/basic-columns/text-table-column';
import { StudentLocales } from '@/locales/student-locales';
import { Student } from '@/models/course/types';

export const studentColumns: ColumnDef<Student>[] = [
  ActionsTableColumn<Student>({
    id: 'select',
    accessorKey: 'select',
    headerTitle: '',
    select: true,
  }),
  TextTableColumn<Student>({ id: 'id', accessorKey: 'id', headerTitle: StudentLocales.table.studentId }),
  TextTableColumn<Student>({
    id: 'parentEmail',
    accessorKey: 'parentEmail',
    headerTitle: StudentLocales.table.parentEmail,
  }),
  TextTableColumn<Student>({ id: 'name', accessorKey: 'name', headerTitle: StudentLocales.table.name }),
  TextTableColumn<Student>({
    id: 'parentName',
    accessorKey: 'parentName',
    headerTitle: StudentLocales.table.parentName,
  }),
  TextTableColumn<Student>({
    id: 'parentMobile',
    accessorKey: 'parentMobile',
    headerTitle: StudentLocales.table.parentMobile,
  }),
];
