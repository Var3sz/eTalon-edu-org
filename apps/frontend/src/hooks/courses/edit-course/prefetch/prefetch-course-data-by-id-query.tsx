import { QueryClient } from '@tanstack/react-query';

import { GetCourseById } from '@/api/models/serviceEndpoints/course';

export const prefetchCourseDataByIdQuery = async (client: QueryClient, courseId: string) => {
  await client.prefetchQuery({
    queryKey: ['course', { id: courseId }],
    queryFn: () => GetCourseById(courseId),
  });
};
