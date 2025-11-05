import { useSuspenseQuery } from '@tanstack/react-query';

import { GetCourses } from '@/api/models/serviceEndpoints/course';
import { CourseDto } from '@/models/Api';

export default function useGetCoursesDataQuery(token: string) {
  const { data: coursesResponse } = useSuspenseQuery({
    queryKey: ['courses'],
    queryFn: () => GetCourses<CourseDto[]>(token),
  });

  if (coursesResponse.status === 200) {
    return coursesResponse.data;
  }
}
