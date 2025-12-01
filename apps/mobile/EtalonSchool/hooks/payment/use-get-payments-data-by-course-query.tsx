import { useQuery } from '@tanstack/react-query';

import { GetPaymentsByCourse } from '../../api/models/serviceEndpoints/main';
import { StudentPaymentResponse } from '../../models/payment/type';

type UseGetPaymentsDataByCourseQueryProps = {
  courseId: number;
  getAccessToken: () => Promise<string | null>;
};

export default function useGetPaymentsDataByCourseQuery({
  courseId,
  getAccessToken,
}: UseGetPaymentsDataByCourseQueryProps) {
  return useQuery({
    queryKey: ['payments-by-course', { courseId: courseId }],
    queryFn: async () => {
      const token = await getAccessToken();
      return await GetPaymentsByCourse<StudentPaymentResponse>(courseId, token ?? '');
    },
  });
}
