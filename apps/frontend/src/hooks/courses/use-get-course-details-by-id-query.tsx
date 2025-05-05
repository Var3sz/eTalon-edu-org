import { useSuspenseQuery } from '@tanstack/react-query';

import { GetCourseDetailsById } from '@/api/models/serviceEndpoints/course';
import { StudentAttendanceDto } from '@/models/Api';
import { GetStudentsByCourseWithAttendances } from '@/api/models/serviceEndpoints/students';

export default function useGetCourseDetailsById(courseId: number) {
  return useSuspenseQuery({
    queryKey: ['course-details-by-id', courseId],
    queryFn: () => GetStudentsByCourseWithAttendances<StudentAttendanceDto>(courseId),
  });
}
