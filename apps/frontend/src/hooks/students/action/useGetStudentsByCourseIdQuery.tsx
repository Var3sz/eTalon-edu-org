import { useSuspenseQuery } from '@tanstack/react-query';

import { GetStudentsByCourseId } from '@/api/models/serviceEndpoints/course';
import { CourseStudentsDTO } from '@/models/Api';

export default function useGetStudentsByCourseIdQuery(courseId: number) {
  return useSuspenseQuery({
    queryKey: ['students-by-course-id', courseId],
    queryFn: () => GetStudentsByCourseId<CourseStudentsDTO[]>(courseId),
  });
}
