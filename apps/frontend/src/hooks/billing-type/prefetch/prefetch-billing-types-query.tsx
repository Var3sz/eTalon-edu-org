import { QueryClient } from '@tanstack/react-query';

import { GetBillingTypes } from '@/api/models/serviceEndpoints/helpers';
import { BillingTypeDTO } from '@/models/Api';

export const prefetchBillingTypesQuery = async (client: QueryClient) => {
  await client.prefetchQuery({ queryKey: ['billing-types'], queryFn: () => GetBillingTypes<BillingTypeDTO[]>() });
};
