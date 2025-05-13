'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import CountingTableColumn from '@/components/tables/columns/components/action-columns/counting-table-column';
import DateTableColumn from '@/components/tables/columns/components/basic-columns/date-table-columns';
import TextTableColumn from '@/components/tables/columns/components/basic-columns/text-table-column';
import EditCourseDateActionsColumn from '@/components/tables/columns/components/special-columns/course-dates/edit-course-date-actions-column';
import { TableLocales } from '@/locales/table-locales';
import { LessonDateDto } from '@/models/Api';

export default function CourseDatesColumns(courseId: string): ColumnDef<LessonDateDto>[] {
  return useMemo(
    () => [
      CountingTableColumn<LessonDateDto>({
        id: 'No.',
        headerTitle: '',
        accessorKey: 'Id',
        size: 20,
      }),
      DateTableColumn<LessonDateDto>({
        id: 'date',
        accessorKey: 'date',
        headerTitle: TableLocales.courseDate.date,
      }),
      TextTableColumn<LessonDateDto>({
        id: 'description',
        accessorKey: 'description',
        headerTitle: TableLocales.courseDate.description,
      }),
      EditCourseDateActionsColumn<LessonDateDto>({
        id: 'actions',
        accessorKey: 'actions',
        headerTitle: TableLocales.actions,
        editable: true,
        courseId: courseId,
        size: 60,
      }),
    ],
    []
  );
}
