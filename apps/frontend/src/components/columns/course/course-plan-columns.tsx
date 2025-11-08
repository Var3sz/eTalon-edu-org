import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import ActionsTableColumn from '@/components/tables/columns/components/action-columns/actions-table-column';
import DateWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/date-with-filter-table-column';
import NumberWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/number-with-filter-table-column';
import TextWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/text-with-filter-table-column';
import { CourseEditRedirectionFunction } from '@/components/tables/columns/utils/redirection-functions';
import { TableLocales } from '@/locales/table-locales';
import { CourseDto } from '@/models/Api';

export default function CoursePlanColumns(): ColumnDef<CourseDto>[] {
  return useMemo(
    () => [
      ActionsTableColumn<CourseDto>({
        id: 'actions',
        accessorKey: 'actions',
        headerTitle: '',
        redirect: true,
        redirection: CourseEditRedirectionFunction,
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
        cellStyle: ' flex justify-end',
      }),
      TextWithFilterTableColumn<CourseDto>({
        id: 'endTime',
        accessorKey: 'endTime',
        headerTitle: TableLocales.course.to,
        cellStyle: ' flex justify-end',
      }),
      NumberWithFilterTableColumn<CourseDto>({
        id: 'maxHeadCount',
        accessorKey: 'maxHeadCount',
        headerTitle: TableLocales.course.maxHeadcount,
        unitOfMeasure: 'Fő',
      }),
    ],
    []
  );
}
