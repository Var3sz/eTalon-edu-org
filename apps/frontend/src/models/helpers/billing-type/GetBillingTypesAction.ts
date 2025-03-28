'use server';

import { GetBillingTypes } from '@/api/models/serviceEndpoints/helpers';
import { BillingTypeDTO } from '@/models/Api';

export const GetBillingTypesAction = async () => {
  return await GetBillingTypes<BillingTypeDTO[]>();
};
