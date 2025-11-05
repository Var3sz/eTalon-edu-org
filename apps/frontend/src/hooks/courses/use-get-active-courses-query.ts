import { useSuspenseQuery } from '@tanstack/react-query';

import { GetActiveCourses } from '@/api/models/serviceEndpoints/course';
import { ActiveCourseDto } from '@/models/Api';

export default function useGetActiveCoursesQuery(token: string) {
  return useSuspenseQuery({
    queryKey: ['active-courses'],
    queryFn: () => GetActiveCourses<ActiveCourseDto[]>(token),
  });
}
