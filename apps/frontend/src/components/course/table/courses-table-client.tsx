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
    <div className='container mx-auto py-10'>
      <DataTable columns={CourseColumns()} data={courses} hasToolbar toolbarProps={courseToolbarProps} />
    </div>
  );
}
