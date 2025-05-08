'use client';

import EditCourseClientFormBase from './edit-course-client-form-base';
import { CourseDto } from '@/models/Api';
import { useGetCourseDataByIdQuery } from '@/hooks/courses/edit-course/use-get-course-data-by-id-query';

type EditCourseClientProps = {
  courseId: string;
};

export default function EditCourseClient({ courseId }: EditCourseClientProps) {
  const { data: courseDataResponse } = useGetCourseDataByIdQuery(courseId);

  const courseData: CourseDto | null =
    courseDataResponse.status === 200 && courseDataResponse.data !== undefined ? courseDataResponse.data : null;

  return <EditCourseClientFormBase courseId={courseId} courseData={courseData} />;
}
