import { QueryClient } from '@tanstack/react-query';

import { GetInvoiceDatesByCourseId } from '@/api/models/serviceEndpoints/course';
import { InvoiceDateDto } from '@/models/Api';

export const prefetchInvoiceDatesDataByIdQuery = async (client: QueryClient, courseId: string, token: string) => {
  await client.prefetchQuery({
    queryKey: ['invoice-dates', { id: courseId }],
    queryFn: () => GetInvoiceDatesByCourseId<InvoiceDateDto[]>(courseId, token),
  });
};
