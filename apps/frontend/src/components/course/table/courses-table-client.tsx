'use client';

import LoadingFullScreen from '@/app/Loading';
import CourseColumns from '@/components/columns/course/course-columns';
import { DataTable } from '@/components/tables/data-table';
import useGetCurrentCoursesQuery from '@/hooks/courses/action/useGetCurrentCoursesQuery';

export default function CoursesTableClient() {
  const { data, isFetching } = useGetCurrentCoursesQuery();

  return (
    <div className='container mx-auto py-10'>
      {isFetching && <LoadingFullScreen />}
      <DataTable columns={CourseColumns()} data={data} />
    </div>
  );
}
