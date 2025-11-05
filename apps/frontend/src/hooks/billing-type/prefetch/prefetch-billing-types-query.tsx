import { QueryClient } from '@tanstack/react-query';

import { GetBillingTypes } from '@/api/models/serviceEndpoints/helpers';
import { BillingAddressTypeDto } from '@/models/Api';

export const prefetchBillingTypesQuery = async (client: QueryClient, token: string) => {
  await client.prefetchQuery({
    queryKey: ['billing-types'],
    queryFn: () => GetBillingTypes<BillingAddressTypeDto[]>(token),
  });
};
