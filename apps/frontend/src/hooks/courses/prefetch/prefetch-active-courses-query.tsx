import { QueryClient } from '@tanstack/react-query';

import { GetActiveCourses } from '@/api/models/serviceEndpoints/course';
import { ActiveCourseDto } from '@/models/Api';

export const prefetchActiveCoursesQuery = async (client: QueryClient, token: string) => {
  await client.prefetchQuery({
    queryKey: ['active-courses'],
    queryFn: () => GetActiveCourses<ActiveCourseDto[]>(token),
  });
};
