import { useSuspenseQuery } from '@tanstack/react-query';

import { GetStudentsByCourseId } from '@/api/models/serviceEndpoints/course';

export default function useGetStudentDetailsByIdQuery(id: string) {
  return useSuspenseQuery({
    queryKey: ['students-by-course-id', id],
    queryFn: () => GetStudentsByCourseId(id),
  });
}
