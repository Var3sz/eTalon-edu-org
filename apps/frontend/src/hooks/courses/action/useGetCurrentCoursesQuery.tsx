import { useSuspenseQuery } from '@tanstack/react-query';

import { GetCurrentCourses } from '@/api/endpoints/courses';
import { Course } from '@/models/course/types';

export default function useGetCurrentCoursesQuery() {
  return useSuspenseQuery({
    queryKey: ['courses'],
    queryFn: () => GetCurrentCourses<Course[]>(),
  });
}
