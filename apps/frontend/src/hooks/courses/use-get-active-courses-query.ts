import { useSuspenseQuery } from '@tanstack/react-query';

import { GetActiveCourses } from '@/api/models/serviceEndpoints/course';
import { CoursesDTO } from '@/models/Api';

export default function useGetActiveCoursesQuery() {
  return useSuspenseQuery({
    queryKey: ['active-courses'],
    queryFn: () => GetActiveCourses<CoursesDTO[]>(),
  });
}
