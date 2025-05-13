import { QueryClient } from '@tanstack/react-query';

import { GetStudentsByCourseWithAttendances } from '@/api/models/serviceEndpoints/students';
import { StudentAttendanceDto } from '@/models/Api';

export const prefetchCourseDetailsById = async (client: QueryClient, courseId: number) => {
  await client.prefetchQuery({
    queryKey: ['course-details-by-id', courseId],
    queryFn: () => GetStudentsByCourseWithAttendances<StudentAttendanceDto[]>(courseId),
  });
};
