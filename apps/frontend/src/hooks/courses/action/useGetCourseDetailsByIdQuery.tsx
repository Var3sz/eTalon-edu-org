import { useSuspenseQuery } from '@tanstack/react-query';

import { GetCourseDetailsById } from '@/api/endpoints/courses';
import { Student } from '@/models/course/types';

export default function useGetCourseDetailsByIdQuery(courseId: string) {
  return useSuspenseQuery({
    queryKey: ['courses', { id: courseId }],
    queryFn: () => GetCourseDetailsById<Student[]>(courseId),
  });
}
