import ActionsTableColumn from '@/components/tables/columns/components/action-columns/actions-table-column';
import DateWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/date-with-filter-table-column';
import TextWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/text-with-filter-table-column';
import {
  CourseEditRedirectionFunction,
  CourseRedirectionFunction,
} from '@/components/tables/columns/utils/redirection-functions';
import { TableLocales } from '@/locales/table-locales';
import { CourseDto } from '@/models/Api';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

export default function CoursePlanColumns(): ColumnDef<CourseDto>[] {
  return useMemo(
    () => [
      ActionsTableColumn<CourseDto>({
        id: 'actions',
        accessorKey: 'actions',
        headerTitle: '',
        redirect: true,
        redirection: CourseEditRedirectionFunction,
        size: 20,
      }),
      TextWithFilterTableColumn<CourseDto>({
        id: 'courseId',
        accessorKey: 'courseId',
        headerTitle: TableLocales.course.courseId,
      }),
      DateWithFilterTableColumn<CourseDto>({
        id: 'startDate',
        accessorKey: 'startDate',
        headerTitle: TableLocales.course.date,
      }),
      TextWithFilterTableColumn<CourseDto>({
        id: 'startTime',
        accessorKey: 'startTime',
        headerTitle: TableLocales.course.from,
        size: 150,
      }),
      TextWithFilterTableColumn<CourseDto>({
        id: 'endTime',
        accessorKey: 'endTime',
        headerTitle: TableLocales.course.to,
        size: 150,
      }),
      TextWithFilterTableColumn<CourseDto>({
        id: 'maxHeadCount',
        accessorKey: 'maxHeadCount',
        headerTitle: TableLocales.course.maxHeadcount,
        size: 150,
      }),
    ],
    []
  );
}
