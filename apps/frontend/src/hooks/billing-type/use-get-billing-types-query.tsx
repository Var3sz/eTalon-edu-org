import { useSuspenseQuery } from '@tanstack/react-query';

import { GetBillingTypes } from '@/api/models/serviceEndpoints/helpers';
import { BillingTypeDTO } from '@/models/Api';

export default function useGetBillingTypesQuery() {
  const { data: billingTypeResponse } = useSuspenseQuery({
    queryKey: ['billing-types'],
    queryFn: () => GetBillingTypes<BillingTypeDTO[]>(),
  });

  if (billingTypeResponse.status === 200) {
    return billingTypeResponse.data;
  }
}
