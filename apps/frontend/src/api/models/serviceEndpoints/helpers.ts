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

export const GetBillingTypes = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getBillingTypesUrl(), process.env.JWT_TOKEN!);
};

export const GetLocations = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getLocationsUrl(), process.env.JWT_TOKEN!);
};

export const GetGroups = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getGroupsUrl(), process.env.JWT_TOKEN!);
};
