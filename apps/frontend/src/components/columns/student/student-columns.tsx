'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import TextTableColumn from '@/components/tables/columns/components/basic-columns/text-table-column';
import TextTableGroupColumn from '@/components/tables/columns/components/other-columns/text-table-group-column';
import ClickableTableColumn from '@/components/tables/columns/components/special-columns/clickable-table-column';
import HiddenTableColumn from '@/components/tables/columns/components/special-columns/hidden-table-column';
import { StudentAttendance } from '@/hooks/courses/use-init-course-client';
import { StudentLocales } from '@/locales/student-locales';

export default function StudentColumns(
  courseData: StudentAttendance[],
  dateColumns: { id: number; date: string; description: string }[]
): ColumnDef<StudentAttendance>[] {
  return useMemo(() => {
    const staticColumns: ColumnDef<StudentAttendance>[] = [
      TextTableColumn<StudentAttendance>({
        id: 'courseId',
        accessorKey: 'courseId',
        headerTitle: StudentLocales.table.courseId,
      }),
      ClickableTableColumn<StudentAttendance>({
        id: 'children',
        accessorKey: 'children',
        headerTitle: StudentLocales.table.name,
        dialogTitle: 'Gyermek adatai',
      }),
      HiddenTableColumn<StudentAttendance>({ id: 'studentId', accessorKey: 'studentId' }),
      HiddenTableColumn<StudentAttendance>({ id: 'email', accessorKey: 'email' }),
      HiddenTableColumn<StudentAttendance>({ id: 'lastname', accessorKey: 'lastname' }),
      HiddenTableColumn<StudentAttendance>({ id: 'firstname', accessorKey: 'firstname' }),
      HiddenTableColumn<StudentAttendance>({ id: 'billCompany', accessorKey: 'billCompany' }),
      HiddenTableColumn<StudentAttendance>({ id: 'city', accessorKey: 'city' }),
      HiddenTableColumn<StudentAttendance>({ id: 'zip', accessorKey: 'zip' }),
      HiddenTableColumn<StudentAttendance>({ id: 'address', accessorKey: 'address' }),
      HiddenTableColumn<StudentAttendance>({ id: 'vatNumber', accessorKey: 'vatNumber' }),
      HiddenTableColumn<StudentAttendance>({ id: 'childrenMail', accessorKey: 'childrenMail' }),
      HiddenTableColumn<StudentAttendance>({ id: 'mobile', accessorKey: 'mobile' }),
      HiddenTableColumn<StudentAttendance>({ id: 'billingTypeId', accessorKey: 'billingTypeId' }),
    ];

    const dynamicDateGroupColumns: ColumnDef<StudentAttendance>[] = dateColumns.map(({ date, description }) => {
      return TextTableGroupColumn<StudentAttendance>({
        id: `group-${date}`,
        accessorKey: '',
        headerTitle: date,
        columns: [
          TextTableColumn<StudentAttendance>({
            id: `${date}-attendance`,
            accessorKey: date,
            headerTitle: 'Jelenlét',
            size: 100,
          }),
          TextTableColumn<StudentAttendance>({
            id: 'description',
            accessorKey: '',
            headerTitle: description,
            size: 100,
          }),
        ],
      });
    });

    return [...staticColumns, ...dynamicDateGroupColumns];
  }, [courseData]);
}
