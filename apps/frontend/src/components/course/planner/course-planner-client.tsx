'use client';

import { useSession } from 'next-auth/react';

import CoursePlanColumns from '@/components/columns/course/course-plan-columns';
import { DataTable } from '@/components/tables/data-table';

import CreateCoursesDialog from '../../dialogs/course/create-courses-dialog';
import useInitCoursePlannerClient from '@/hooks/courses/course-plan/use-init-course-planner-client';
import LoadingFullScreen from '@/app/loading';

export default function CoursePlannerClient() {
  const { data: session } = useSession();

  const { coursesData, isPending, inactiveCourseFunction } = useInitCoursePlannerClient(
    session?.tokens.accessToken ?? ''
  );

  const toolbarProps = {
    title: 'Kurzustervező',
    hasAddButton: true,
    addButtonTitle: 'Új kurzusok',
    dialogTitle: 'Kurzusok létrehozása',
    dialogComponent: <CreateCoursesDialog token={session?.tokens.accessToken ?? ''} />,
  };

  return (
    <div className='w-3/4 py-10 mx-auto'>
      {isPending && <LoadingFullScreen />}
      <DataTable
        columns={CoursePlanColumns({
          inactiveCourseFunction: inactiveCourseFunction,
        })}
        data={coursesData ?? []}
        hasToolbar
        toolbarProps={toolbarProps}
      />
    </div>
  );
}
