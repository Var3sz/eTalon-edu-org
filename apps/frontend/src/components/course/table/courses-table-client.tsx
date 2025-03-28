'use client';

import CourseColumns from '@/components/columns/course/course-columns';
import { DataTable } from '@/components/tables/data-table';
import useGetCurrentCoursesQuery from '@/hooks/courses/action/useGetCurrentCoursesQuery';
import { CoursesDTO } from '@/models/Api';

export default function CoursesTableClient() {
  const { data: coursesDataResponse } = useGetCurrentCoursesQuery();

  const courses: CoursesDTO[] | [] =
    coursesDataResponse.status === 200 && coursesDataResponse.data.length > 0 ? coursesDataResponse.data : [];

  const courseToolbarProps = {
    title: 'Aktív kurzusok',
  };

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={CourseColumns()} data={courses} hasToolbar toolbarProps={courseToolbarProps} />
    </div>
  );
}
