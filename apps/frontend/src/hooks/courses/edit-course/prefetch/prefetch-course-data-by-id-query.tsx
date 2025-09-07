import { QueryClient } from '@tanstack/react-query';

import { GetCourseById } from '@/api/models/serviceEndpoints/course';
import { CourseDto } from '@/models/Api';

export const prefetchCourseDataByIdQuery = async (client: QueryClient, courseId: string) => {
  await client.prefetchQuery({
    queryKey: ['course', { id: courseId }],
    queryFn: () => GetCourseById<CourseDto>(courseId),
  });
};
