import { useSuspenseQuery } from '@tanstack/react-query';

import { GetStudentDetailsByStudentId } from '@/api/models/serviceEndpoints/course';
import { StudentDetailsDTO } from '@/models/Api';

export function useStudentDetailsQuery(studentId: number) {
  return useSuspenseQuery({
    queryKey: ['student-details', studentId],
    queryFn: () => GetStudentDetailsByStudentId<StudentDetailsDTO>(studentId),
  });
}
