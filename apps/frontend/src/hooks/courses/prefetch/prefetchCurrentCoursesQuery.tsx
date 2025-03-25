import { QueryClient } from '@tanstack/react-query';

import { GetCurrentCourses } from '@/api/endpoints/courses';

export const prefetchCurrentCoursesQuery = async (client: QueryClient) => {
  await client.prefetchQuery({ queryKey: ['courses'], queryFn: () => GetCurrentCourses() });
};
