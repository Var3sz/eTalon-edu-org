import { QueryClient } from '@tanstack/react-query';

import { CourseDto } from '@/models/Api';
import { GetCourses } from '@/api/models/serviceEndpoints/course';

export const prefetchCoursesDataQuery = async (client: QueryClient) => {
  await client.prefetchQuery({
    queryKey: ['courses'],
    queryFn: () => GetCourses<CourseDto[]>(),
  });
};
