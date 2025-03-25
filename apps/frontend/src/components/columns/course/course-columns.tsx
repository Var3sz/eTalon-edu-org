'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import ActionsTableColumn from '@/components/tables/columns/components/action-columns/actions-table-column';
import TextWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/text-with-filter-table-column';
import LockedTableColumn from '@/components/tables/columns/components/special-columns/LockTableColumn';
import ProgressBarColumn from '@/components/tables/columns/components/special-columns/progress-bar-column';
import { CourseRedirectionFunction } from '@/components/tables/columns/utils/redirection-functions';
import { GroupLocales } from '@/locales/group-locales';
import { Course } from '@/models/course/types';

export default function CourseColumns(): ColumnDef<Course>[] {
  return useMemo(
    () => [
      ActionsTableColumn<Course>({
        id: 'select',
        accessorKey: 'select',
        headerTitle: '',
        redirect: true,
        redirection: CourseRedirectionFunction,
      }),
      TextWithFilterTableColumn<Course>({
        id: 'groupDescription',
        accessorKey: 'groupDescription',
        headerTitle: GroupLocales.table.courseType,
      }),
      TextWithFilterTableColumn<Course>({
        id: 'courseId',
        accessorKey: 'courseId',
        headerTitle: GroupLocales.table.courseId,
      }),
      TextWithFilterTableColumn<Course>({
        id: 'description',
        accessorKey: 'description',
        headerTitle: GroupLocales.table.description,
        size: 300,
      }),
      TextWithFilterTableColumn<Course>({
        id: 'price',
        accessorKey: 'price',
        headerTitle: GroupLocales.table.price,
      }),
      TextWithFilterTableColumn<Course>({
        id: 'headcount',
        accessorKey: 'headcount',
        headerTitle: GroupLocales.table.headcount,
      }),
      TextWithFilterTableColumn<Course>({
        id: 'maxHeadcount',
        accessorKey: 'maxHeadcount',
        headerTitle: GroupLocales.table.maxHeadcount,
      }),
      ProgressBarColumn<Course>({
        id: 'occupancy',
        accessorKey: 'occupancy',
        headerTitle: GroupLocales.table.occupancy,
        size: 500,
      }),
      LockedTableColumn<Course>({
        id: 'locked',
        accessorKey: 'locked',
        headerTitle: GroupLocales.table.lock,
      }),
    ],
    []
  );
}
