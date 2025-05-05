import { QueryClient } from '@tanstack/react-query';

import { GetCourseDetailsById } from '@/api/models/serviceEndpoints/course';
import { StudentAttendanceDto } from '@/models/Api';
import { GetStudentsByCourseWithAttendances } from '@/api/models/serviceEndpoints/students';

export const prefetchCourseDetailsById = async (client: QueryClient, courseId: number) => {
  await client.prefetchQuery({
    queryKey: ['course-details-by-id', courseId],
    queryFn: () => GetStudentsByCourseWithAttendances<StudentAttendanceDto[]>(courseId),
  });
};
