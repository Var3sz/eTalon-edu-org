import { GetCourseById } from '@/api/models/serviceEndpoints/course';
import { QueryClient } from '@tanstack/react-query';

export const prefetchCourseDataByIdQuery = async (client: QueryClient, courseId: string) => {
  await client.prefetchQuery({
    queryKey: ['course', { id: courseId }],
    queryFn: () => GetCourseById(courseId),
  });
};
