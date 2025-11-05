'use server';

import { httpRequestGET } from '@/api/models/api';
import { FetchResponse } from '@/api/types/fetch-response';

const getBillingTypesUrl = () => {
  return `${process.env.SERVER_BASE_URL}billingAddressType/GetBillingAddressTypes`;
};

const getLocationsUrl = () => {
  return `${process.env.SERVER_BASE_URL}locations/GetLocations`;
};

const getGroupsUrl = () => {
  return `${process.env.SERVER_BASE_URL}groups/GetGroups`;
};

export const GetBillingTypes = async <ResponseType>(token: string): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getBillingTypesUrl(), token);
};

export const GetLocations = async <ResponseType>(token: string): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getLocationsUrl(), token);
};

export const GetGroups = async <ResponseType>(token: string): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getGroupsUrl(), token);
};
