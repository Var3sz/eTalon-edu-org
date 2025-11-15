import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import DateWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/date-with-filter-table-column';
import NumberWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/number-with-filter-table-column';
import TextWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/text-with-filter-table-column';
import { CourseEditRedirectionFunction } from '@/components/tables/columns/utils/redirection-functions';
import { TableLocales } from '@/locales/table-locales';
import { CourseDto } from '@/models/Api';
import HiddenTableColumn from '@/components/tables/columns/components/special-columns/hidden-table-column';
import CourseActionsTableColumn from '@/components/tables/columns/components/special-columns/course/course-actions-table-column';

type CoursePlanColumnsType = {
  inactiveCourseFunction?: (courseId: number) => void;
};

export default function CoursePlanColumns({ inactiveCourseFunction }: CoursePlanColumnsType): ColumnDef<CourseDto>[] {
  return useMemo(
    () => [
      CourseActionsTableColumn<CourseDto>({
        id: 'actions',
        accessorKey: 'actions',
        headerTitle: '',
        redirect: true,
        deletable: true,
        redirection: CourseEditRedirectionFunction,
        confirmTitle: 'Figyelem!',
        confirmDesc: 'Biztosan inaktiválja a kiválasztott kurzust?',
        deleteFunction: inactiveCourseFunction,
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
      HiddenTableColumn<CourseDto>({
        id: 'id',
        accessorKey: 'id',
      }),
    ],
    []
  );
}
