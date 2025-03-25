import { QueryClient } from '@tanstack/react-query';

import { GetCourseDetailsById } from '@/api/endpoints/courses';

export const prefetchCourseDetailsByIdQuery = async (client: QueryClient, courseId: string) => {
  await client.prefetchQuery({
    queryKey: ['courses', { id: courseId }],
    queryFn: () => GetCourseDetailsById(courseId),
  });
};
