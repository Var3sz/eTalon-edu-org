import { useSuspenseQuery } from '@tanstack/react-query';

import { GetCourses } from '@/api/models/serviceEndpoints/course';
import { CourseDto } from '@/models/Api';

export default function useGetCoursesDataQuery() {
  const { data: coursesResponse } = useSuspenseQuery({
    queryKey: ['courses'],
    queryFn: () => GetCourses<CourseDto[]>(),
  });

  if (coursesResponse.status === 200) {
    return coursesResponse.data;
  }
}
