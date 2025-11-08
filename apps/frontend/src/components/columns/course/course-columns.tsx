'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import ActionsTableColumn from '@/components/tables/columns/components/action-columns/actions-table-column';
import NumberWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/number-with-filter-table-column';
import TextWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/text-with-filter-table-column';
import LockedTableColumn from '@/components/tables/columns/components/special-columns/lock-table-column';
import ProgressBarColumn from '@/components/tables/columns/components/special-columns/progress-bar-column';
import { CourseRedirectionFunction } from '@/components/tables/columns/utils/redirection-functions';
import { TableLocales } from '@/locales/table-locales';
import { ActiveCourseDto } from '@/models/Api';

export default function CourseColumns(): ColumnDef<ActiveCourseDto>[] {
  return useMemo(
    () => [
      ActionsTableColumn<ActiveCourseDto>({
        id: 'actions',
        accessorKey: 'actions',
        headerTitle: '',
        redirect: true,
        redirection: CourseRedirectionFunction,
        dialogTitle: 'Kurzus dátumok módosítása',
        size: 50,
      }),
      TextWithFilterTableColumn<ActiveCourseDto>({
        id: 'groupDescription',
        accessorKey: 'groupDescription',
        headerTitle: TableLocales.course.courseType,
        size: 100,
      }),
      TextWithFilterTableColumn<ActiveCourseDto>({
        id: 'courseId',
        accessorKey: 'courseId',
        headerTitle: TableLocales.course.courseId,
        size: 200,
      }),
      TextWithFilterTableColumn<ActiveCourseDto>({
        id: 'description',
        accessorKey: 'description',
        headerTitle: TableLocales.course.description,
        size: 450,
      }),
      NumberWithFilterTableColumn<ActiveCourseDto>({
        id: 'headcount',
        accessorKey: 'headcount',
        headerTitle: TableLocales.course.headcount,
        size: 50,
        unitOfMeasure: 'Fő',
      }),
      NumberWithFilterTableColumn<ActiveCourseDto>({
        id: 'maxHeadCount',
        accessorKey: 'maxHeadCount',
        headerTitle: TableLocales.course.maxHeadcount,
        size: 50,
        unitOfMeasure: 'Fő',
      }),
      ProgressBarColumn<ActiveCourseDto>({
        id: 'occupancy',
        accessorKey: 'occupancy',
        headerTitle: TableLocales.course.occupancy,
      }),
      LockedTableColumn<ActiveCourseDto>({
        id: 'locked',
        accessorKey: 'locked',
        headerTitle: TableLocales.course.lock,
        size: 20,
      }),
    ],
    []
  );
}
