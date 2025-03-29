'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import ActionsTableColumn from '@/components/tables/columns/components/action-columns/actions-table-column';
import TextWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/text-with-filter-table-column';
import LockedTableColumn from '@/components/tables/columns/components/special-columns/LockTableColumn';
import ProgressBarColumn from '@/components/tables/columns/components/special-columns/progress-bar-column';
import { CourseRedirectionFunction } from '@/components/tables/columns/utils/redirection-functions';
import { GroupLocales } from '@/locales/group-locales';
import { CoursesDTO } from '@/models/Api';

export default function CourseColumns(): ColumnDef<CoursesDTO>[] {
  return useMemo(
    () => [
      ActionsTableColumn<CoursesDTO>({
        id: 'actions',
        accessorKey: 'actions',
        headerTitle: '',
        edit: true,
        redirect: true,
        redirection: CourseRedirectionFunction,
        dialogTitle: 'Kurzus dátumok módosítása',
        size: 50,
      }),
      TextWithFilterTableColumn<CoursesDTO>({
        id: 'groupDescription',
        accessorKey: 'groupDescription',
        headerTitle: GroupLocales.table.courseType,
        size: 100,
      }),
      TextWithFilterTableColumn<CoursesDTO>({
        id: 'courseId',
        accessorKey: 'courseId',
        headerTitle: GroupLocales.table.courseId,
        size: 200,
      }),
      TextWithFilterTableColumn<CoursesDTO>({
        id: 'description',
        accessorKey: 'description',
        headerTitle: GroupLocales.table.description,
        size: 450,
      }),
      TextWithFilterTableColumn<CoursesDTO>({
        id: 'price',
        accessorKey: 'price',
        headerTitle: GroupLocales.table.price,
        size: 100,
      }),
      TextWithFilterTableColumn<CoursesDTO>({
        id: 'headcount',
        accessorKey: 'headcount',
        headerTitle: GroupLocales.table.headcount,
        size: 50,
      }),
      TextWithFilterTableColumn<CoursesDTO>({
        id: 'maxHeadcount',
        accessorKey: 'maxHeadcount',
        headerTitle: GroupLocales.table.maxHeadcount,
        size: 50,
      }),
      ProgressBarColumn<CoursesDTO>({
        id: 'occupancy',
        accessorKey: 'occupancy',
        headerTitle: GroupLocales.table.occupancy,
        size: 500,
      }),
      LockedTableColumn<CoursesDTO>({
        id: 'locked',
        accessorKey: 'locked',
        headerTitle: GroupLocales.table.lock,
      }),
    ],
    []
  );
}
