import { useSuspenseQuery } from '@tanstack/react-query';

import { GetBillingTypes } from '@/api/models/serviceEndpoints/helpers';
import { BillingAddressTypeDto } from '@/models/Api';

export default function useGetBillingTypesQuery(token: string) {
  const { data: billingTypeResponse } = useSuspenseQuery({
    queryKey: ['billing-types'],
    queryFn: () => GetBillingTypes<BillingAddressTypeDto[]>(token),
    staleTime: 60 * 60 * 1000,
  });

  if (billingTypeResponse.status === 200) {
    return billingTypeResponse.data;
  }
}
