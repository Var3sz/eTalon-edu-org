import { useSuspenseQuery } from '@tanstack/react-query';

import { GetAllCourses } from '@/api/models/serviceEndpoints/course';
import { CoursesDTO } from '@/models/Api';

export default function useGetCurrentCoursesQuery() {
  return useSuspenseQuery({
    queryKey: ['courses'],
    queryFn: () => GetAllCourses<CoursesDTO[]>(),
  });
}
