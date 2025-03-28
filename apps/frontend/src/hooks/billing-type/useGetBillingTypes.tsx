import { TransitionStartFunction, useCallback, useEffect, useMemo, useState } from 'react';

import { BillingTypeDTO } from '@/models/Api';
import { GetBillingTypesAction } from '@/models/helpers/billing-type/GetBillingTypesAction';

type UseGetBillingTypesProps = {
  startTransaction: TransitionStartFunction;
};

export default function useGetBillingTypes({ startTransaction }: UseGetBillingTypesProps) {
  const [billingTypes, setBillingTypes] = useState<BillingTypeDTO[]>([]);

  const getBillingTypesFunction = useCallback(() => {
    startTransaction(async () => {
      const billingTypesResponse = await GetBillingTypesAction();
      if (billingTypesResponse.status === 200) {
        setBillingTypes(billingTypesResponse.data);
      } else {
        setBillingTypes([]);
      }
    });
  }, []);

  useEffect(() => {
    getBillingTypesFunction();
  }, []);

  return useMemo(() => ({ billingTypes }), [billingTypes]);
}
