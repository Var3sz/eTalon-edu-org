'use client';

import CourseColumns from '@/components/columns/course/course-columns';
import { DataTable } from '@/components/tables/data-table';
import useInitCourseTableClient from '@/hooks/courses/use-init-course-table-client';
import { useSession } from 'next-auth/react';

export default function CoursesTableClient() {
  const { data: session } = useSession();

  const { courses } = useInitCourseTableClient(session?.tokens.accessToken ?? '');

  const courseToolbarProps = {
    title: 'Aktív kurzusok',
  };

  return (
    <div className='w-3/4 py-10 mx-auto'>
      <DataTable columns={CourseColumns()} data={courses} hasToolbar toolbarProps={courseToolbarProps} />
    </div>
  );
}
