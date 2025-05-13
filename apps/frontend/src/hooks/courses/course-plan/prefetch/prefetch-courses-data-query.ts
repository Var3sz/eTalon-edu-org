import { QueryClient } from '@tanstack/react-query';

import { GetCourses } from '@/api/models/serviceEndpoints/course';
import { CourseDto } from '@/models/Api';

export const prefetchCoursesDataQuery = async (client: QueryClient) => {
  await client.prefetchQuery({
    queryKey: ['courses'],
    queryFn: () => GetCourses<CourseDto[]>(),
  });
};
