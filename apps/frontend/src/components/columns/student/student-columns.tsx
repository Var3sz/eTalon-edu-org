'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import TextTableColumn from '@/components/tables/columns/components/basic-columns/text-table-column';
import TextTableGroupColumn from '@/components/tables/columns/components/other-columns/text-table-group-column';
import ClickableTableColumn from '@/components/tables/columns/components/special-columns/clickable-table-column';
import HiddenTableColumn from '@/components/tables/columns/components/special-columns/hidden-table-column';
import { StudentAttendance } from '@/hooks/courses/use-init-course-client';
import { StudentLocales } from '@/locales/student-locales';
import { Control, FieldValues } from 'react-hook-form';
import CheckboxTableColumn from '@/components/tables/columns/components/input-columns/checkbox-input-column';

type StudentAttendanceProps<T extends FieldValues> = {
  courseData: StudentAttendance[];
  dateColumns: { id: number; date: string; description: string }[];
  formControl: Control<T>;
};
export default function StudentColumns<T extends FieldValues>(
  courseData: StudentAttendance[],
  dateColumns: { id: number; date: string; description: string }[],
  formControl: Control<T>
): ColumnDef<StudentAttendance>[] {
  return useMemo(() => {
    const staticColumns: ColumnDef<StudentAttendance>[] = [
      ClickableTableColumn<StudentAttendance>({
        id: 'children',
        accessorKey: 'children',
        headerTitle: StudentLocales.table.name,
        dialogTitle: 'Gyermek adatai',
        size: 120,
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

    const dynamicColumns: ColumnDef<StudentAttendance>[] = dateColumns.map(({ date, description }) => {
      const accessorKey = `attendance[index].${date}`;

      const attendanceColumn = CheckboxTableColumn<T, StudentAttendance>({
        id: `${date}-attendance`,
        accessorKey,
        headerTitle: 'Jelenlét',
        disabled: false,
        formControl,
        inEdit: true,
      });

      return TextTableGroupColumn<StudentAttendance>({
        id: `group-${date}`,
        accessorKey: '',
        headerTitle: `${description} - ${date}`,
        columns: [attendanceColumn],
      });
    });

    return [...staticColumns, ...dynamicColumns];
  }, [courseData, dateColumns]); // Ezek végtelen triggert eredményeznek és F5-nél nem jelenik meg a tábla tartalma!
}
