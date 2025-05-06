'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import ActionsTableColumn from '@/components/tables/columns/components/action-columns/actions-table-column';
import TextWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/text-with-filter-table-column';
import LockedTableColumn from '@/components/tables/columns/components/special-columns/lock-table-column';
import ProgressBarColumn from '@/components/tables/columns/components/special-columns/progress-bar-column';
import { CourseRedirectionFunction } from '@/components/tables/columns/utils/redirection-functions';
import { GroupLocales } from '@/locales/group-locales';
import { ActiveCourseDto } from '@/models/Api';

export default function CourseColumns(): ColumnDef<ActiveCourseDto>[] {
  return useMemo(
    () => [
      ActionsTableColumn<ActiveCourseDto>({
        id: 'actions',
        accessorKey: 'actions',
        headerTitle: '',
        edit: true,
        redirect: true,
        redirection: CourseRedirectionFunction,
        dialogTitle: 'Kurzus dátumok módosítása',
        size: 50,
      }),
      TextWithFilterTableColumn<ActiveCourseDto>({
        id: 'groupDescription',
        accessorKey: 'groupDescription',
        headerTitle: GroupLocales.table.courseType,
        size: 100,
      }),
      TextWithFilterTableColumn<ActiveCourseDto>({
        id: 'courseId',
        accessorKey: 'courseId',
        headerTitle: GroupLocales.table.courseId,
        size: 200,
      }),
      TextWithFilterTableColumn<ActiveCourseDto>({
        id: 'description',
        accessorKey: 'description',
        headerTitle: GroupLocales.table.description,
        size: 450,
      }),
      /* TextWithFilterTableColumn<ActiveCourseDto>({
        id: 'price',
        accessorKey: 'price',
        headerTitle: GroupLocales.table.price,
        size: 100,
      }), */
      TextWithFilterTableColumn<ActiveCourseDto>({
        id: 'headcount',
        accessorKey: 'headcount',
        headerTitle: GroupLocales.table.headcount,
        size: 50,
      }),
      TextWithFilterTableColumn<ActiveCourseDto>({
        id: 'maxHeadCount',
        accessorKey: 'maxHeadCount',
        headerTitle: GroupLocales.table.maxHeadcount,
        size: 50,
      }),
      ProgressBarColumn<ActiveCourseDto>({
        id: 'occupancy',
        accessorKey: 'occupancy',
        headerTitle: GroupLocales.table.occupancy,
        size: 500,
      }),
      LockedTableColumn<ActiveCourseDto>({
        id: 'locked',
        accessorKey: 'locked',
        headerTitle: GroupLocales.table.lock,
      }),
    ],
    []
  );
}
