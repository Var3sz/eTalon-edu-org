'use client';

import { ColumnDef } from '@tanstack/react-table';

import ActionsTableColumn from '@/components/tables/columns/components/action-columns/actions-table-column';
import TextWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/text-with-filter-table-column';
import { CourseRedirectionFunction } from '@/components/tables/columns/utils/redirection-functions';
import { GroupLocales } from '@/locales/group-locales';
import { Course } from '@/models/course/types';

export const courseColumns: ColumnDef<Course>[] = [
  ActionsTableColumn<Course>({
    id: 'select',
    accessorKey: 'select',
    headerTitle: '',
    redirect: true,
    redirection: CourseRedirectionFunction,
  }),
  TextWithFilterTableColumn<Course>({ id: 'id', accessorKey: 'id', headerTitle: GroupLocales.table.courseId }),
  TextWithFilterTableColumn<Course>({ id: 'type', accessorKey: 'type', headerTitle: GroupLocales.table.courseType }),
  TextWithFilterTableColumn<Course>({ id: 'grade', accessorKey: 'grade', headerTitle: GroupLocales.table.grade }),
  TextWithFilterTableColumn<Course>({ id: 'date', accessorKey: 'date', headerTitle: GroupLocales.table.date }),
  TextWithFilterTableColumn<Course>({ id: 'from', accessorKey: 'from', headerTitle: GroupLocales.table.from }),
  TextWithFilterTableColumn<Course>({ id: 'to', accessorKey: 'to', headerTitle: GroupLocales.table.to }),
  TextWithFilterTableColumn<Course>({
    id: 'location',
    accessorKey: 'location',
    headerTitle: GroupLocales.table.location,
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
];
