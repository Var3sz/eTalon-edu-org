'use client';

import { useSession } from 'next-auth/react';

import CoursePlanColumns from '@/components/columns/course/course-plan-columns';
import { DataTable } from '@/components/tables/data-table';
import useGetCoursesDataQuery from '@/hooks/courses/course-plan/use-get-courses-data-query';

import CreateCoursesDialog from '../../dialogs/course/create-courses-dialog';

export default function CoursePlannerClient() {
  const { data: session } = useSession();

  const coursesData = useGetCoursesDataQuery(session?.tokens.accessToken ?? '');

  const toolbarProps = {
    title: 'Kurzustervező',
    hasAddButton: true,
    addButtonTitle: 'Új kurzusok',
    dialogTitle: 'Kurzusok létrehozása',
    dialogComponent: <CreateCoursesDialog token={session?.tokens.accessToken ?? ''} />,
  };

  return (
    <div className='w-3/4 py-10 mx-auto'>
      <DataTable columns={CoursePlanColumns()} data={coursesData ?? []} hasToolbar toolbarProps={toolbarProps} />
    </div>
  );
}
