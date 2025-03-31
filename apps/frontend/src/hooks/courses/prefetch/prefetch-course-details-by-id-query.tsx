import { QueryClient } from '@tanstack/react-query';

import { GetCourseDetailsById } from '@/api/models/serviceEndpoints/course';
import { CourseStudentsDTO } from '@/models/Api';

export const prefetchCourseDetailsById = async (client: QueryClient, courseId: number) => {
  await client.prefetchQuery({
    queryKey: ['course-details-by-id', courseId],
    queryFn: () => GetCourseDetailsById<CourseStudentsDTO[]>(courseId),
  });
};
