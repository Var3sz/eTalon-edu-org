'use server';

import { httpRequestGET } from '@/api/models/api';
import { FetchResponse } from '@/api/types/fetch-response';

const getBillingTypesUrl = () => {
  return `${process.env.SERVER_BASE_URL}billingType/GetBillingTypes`;
};

export const GetBillingTypes = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getBillingTypesUrl(), process.env.JWT_TOKEN!);
};
