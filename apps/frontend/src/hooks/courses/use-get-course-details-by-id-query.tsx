import { useQuery } from '@tanstack/react-query';

import { GetStudentsByCourseWithAttendances } from '@/api/models/serviceEndpoints/students';
import { StudentAttendanceDto } from '@/models/Api';

export default function useGetCourseDetailsById(courseId: number, token: string) {
  return useQuery({
    queryKey: ['course-details-by-id', courseId],
    queryFn: () => GetStudentsByCourseWithAttendances<StudentAttendanceDto>(courseId, token),
  });
}
