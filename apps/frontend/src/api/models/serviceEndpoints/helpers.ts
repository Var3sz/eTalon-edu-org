'use server';

import { httpRequestGET } from '@/api/models/Api';
import { FetchResponse } from '@/api/types/FetchResponse';

const getBillingTypesUrl = () => {
  return `${process.env.SERVER_BASE_URL}billingType/GetBillingType`;
};

export const GetBillingTypes = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getBillingTypesUrl(), process.env.JWT_TOKEN!);
};
