'use client';

import { studentColumns } from '@/components/columns/student/student-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import useGetCourseDetailsByIdQuery from '@/hooks/courses/action/useGetCourseDetailsByIdQuery';

type CourseClientModel = {
  courseId: string;
};

export default function CourseClient({ courseId }: CourseClientModel) {
  const { data } = useGetCourseDetailsByIdQuery(courseId);

  return <SimpleTable columns={studentColumns} defaultData={data} />;
}
