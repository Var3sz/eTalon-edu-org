import { useSuspenseQuery } from '@tanstack/react-query';

import { GetCourseDetailsById } from '@/api/models/serviceEndpoints/course';
import { CourseDetailsDto } from '@/models/Api';

export default function useGetCourseDetailsById(courseId: number) {
  return useSuspenseQuery({
    queryKey: ['course-details-by-id', courseId],
    queryFn: () => GetCourseDetailsById<CourseDetailsDto>(courseId),
  });
}
