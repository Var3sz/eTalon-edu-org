import { QueryClient } from '@tanstack/react-query';

import { GetStudentsByCourseId } from '@/api/models/serviceEndpoints/course';
import { CourseStudentsDTO } from '@/models/Api';

export const prefetchStudentsByCourseIdQuery = async (client: QueryClient, courseId: number) => {
  await client.prefetchQuery({
    queryKey: ['students-by-course-id', courseId],
    queryFn: () => GetStudentsByCourseId<CourseStudentsDTO[]>(courseId),
  });
};
