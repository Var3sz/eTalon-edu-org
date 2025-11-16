import { useSuspenseQuery } from '@tanstack/react-query';

import { GetInvoiceDatesByCourseId } from '@/api/models/serviceEndpoints/course';
import { InvoiceDateDto } from '@/models/Api';

export function useGetInvoiceDatesDataByIdQuery(courseId: string, token: string) {
  return useSuspenseQuery({
    queryKey: ['invoice-dates', { id: courseId }],
    queryFn: () => GetInvoiceDatesByCourseId<InvoiceDateDto[]>(courseId, token),
    staleTime: 60 * 60 * 1000,
  });
}
