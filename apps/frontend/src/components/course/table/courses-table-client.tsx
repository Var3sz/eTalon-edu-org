'use client';

import CourseColumns from '@/components/columns/course/course-columns';
import { DataTable } from '@/components/tables/data-table';
import useInitCourseTableClient from '@/hooks/courses/use-init-course-table-client';

export default function CoursesTableClient() {
  const { courses } = useInitCourseTableClient();

  const courseToolbarProps = {
    title: 'Aktív kurzusok',
  };

  return (
    <div className='w-3/4 py-10 mx-auto'>
      <DataTable columns={CourseColumns()} data={courses} hasToolbar toolbarProps={courseToolbarProps} />
    </div>
  );
}
