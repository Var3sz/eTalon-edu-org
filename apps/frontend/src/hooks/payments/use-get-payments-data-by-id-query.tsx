import { useQuery } from '@tanstack/react-query';

import { GetStudentsByCourseWithPayments } from '@/api/models/serviceEndpoints/students';
import { PaymentsDto } from '@/models/Api';

export default function useGetPaymentsDataByCourseId(courseId: string, token: string) {
  return useQuery({
    queryKey: ['payments-data', courseId],
    queryFn: () => GetStudentsByCourseWithPayments<PaymentsDto>(courseId, token),
  });
}
