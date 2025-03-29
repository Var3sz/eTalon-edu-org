'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import TextTableColumn from '@/components/tables/columns/components/basic-columns/text-table-column';
import ClickableTableColumn from '@/components/tables/columns/components/special-columns/ClickableTableColumn';
import HiddenTableColumn from '@/components/tables/columns/components/special-columns/HiddenTableColumn';
import { StudentLocales } from '@/locales/student-locales';
import { CourseStudentsDTO } from '@/models/Api';

export default function StudentColumns(): ColumnDef<CourseStudentsDTO>[] {
  return useMemo(
    () => [
      TextTableColumn<CourseStudentsDTO>({
        id: 'courseCode',
        accessorKey: 'courseCode',
        headerTitle: StudentLocales.table.courseId,
      }),
      ClickableTableColumn<CourseStudentsDTO>({
        id: 'children',
        accessorKey: 'children',
        headerTitle: StudentLocales.table.name,
        dialogTitle: 'Gyermek adatai',
      }),
      HiddenTableColumn<CourseStudentsDTO>({
        id: 'id',
        accessorKey: 'id',
      }),
      HiddenTableColumn<CourseStudentsDTO>({
        id: 'email',
        accessorKey: 'email',
      }),
      HiddenTableColumn<CourseStudentsDTO>({
        id: 'lastname',
        accessorKey: 'lastname',
      }),
      HiddenTableColumn<CourseStudentsDTO>({
        id: 'firstname',
        accessorKey: 'firstname',
      }),
      HiddenTableColumn<CourseStudentsDTO>({
        id: 'billCompany',
        accessorKey: 'billCompany',
      }),
      HiddenTableColumn<CourseStudentsDTO>({
        id: 'city',
        accessorKey: 'city',
      }),
      HiddenTableColumn<CourseStudentsDTO>({
        id: 'zip',
        accessorKey: 'zip',
      }),
      HiddenTableColumn<CourseStudentsDTO>({
        id: 'address',
        accessorKey: 'address',
      }),
      HiddenTableColumn<CourseStudentsDTO>({
        id: 'vatNumber',
        accessorKey: 'vatNumber',
      }),
      HiddenTableColumn<CourseStudentsDTO>({
        id: 'childrenMail',
        accessorKey: 'childrenMail',
      }),
      HiddenTableColumn<CourseStudentsDTO>({
        id: 'mobile',
        accessorKey: 'mobile',
      }),
      HiddenTableColumn<CourseStudentsDTO>({
        id: 'billingTypeId',
        accessorKey: 'billingTypeId',
      }),
    ],
    []
  );
}
