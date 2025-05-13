'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Control, FieldValues } from 'react-hook-form';

import CheckboxTableColumn from '@/components/tables/columns/components/input-columns/checkbox-input-column';
import ClickableTableColumn from '@/components/tables/columns/components/special-columns/clickable-table-column';
import { StudentAttendance } from '@/hooks/courses/use-init-course-client';
import { StudentLocales } from '@/locales/student-locales';
import { AttendanceDateColumnType } from '@/models/students/types';

type StudentAttendanceProps<T extends FieldValues> = {
  courseId: string;
  courseData: StudentAttendance[];
  dateColumns: AttendanceDateColumnType[];
  formControl: Control<T>;
};
export default function StudentColumns<T extends FieldValues>({
  courseId,
  courseData,
  dateColumns,
  formControl,
}: StudentAttendanceProps<T>): ColumnDef<StudentAttendance>[] {
  return useMemo(() => {
    const staticColumns: ColumnDef<StudentAttendance>[] = [
      ClickableTableColumn<StudentAttendance>({
        id: 'childName',
        accessorKey: 'childName',
        headerTitle: StudentLocales.table.name,
        dialogTitle: 'Gyermek adatai',
        courseId: courseId,
        size: 200,
      }),
    ];

    const dynamicColumns: ColumnDef<StudentAttendance>[] = dateColumns.map(({ lessonDateId, date, description }) => {
      const accessorKey = `attendance[index].${lessonDateId}`;

      return CheckboxTableColumn<T, StudentAttendance>({
        id: `${lessonDateId}-attendance`,
        accessorKey,
        size: 80,
        headerTitle: `${description} - ${date}`,
        disabled: false,
        formControl,
        inEdit: true,
      });
    });

    return [...staticColumns, ...dynamicColumns];
  }, [courseData, dateColumns]);
}
