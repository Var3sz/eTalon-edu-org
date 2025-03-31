import { QueryClient } from '@tanstack/react-query';

import { GetActiveCourses } from '@/api/models/serviceEndpoints/course';
import { CoursesDTO } from '@/models/Api';

export const prefetchActiveCoursesQuery = async (client: QueryClient) => {
  await client.prefetchQuery({ queryKey: ['active-courses'], queryFn: () => GetActiveCourses<CoursesDTO[]>() });
};
