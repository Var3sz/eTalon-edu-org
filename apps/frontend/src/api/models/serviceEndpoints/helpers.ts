'use server';

import { httpRequestGET, httpRequestPUT } from '@/api/models/api';
import { FetchResponse } from '@/api/types/fetch-response';

const getBillingTypesUrl = () => {
  return `${process.env.SERVER_BASE_URL}billingAddressType/GetBillingAddressTypes`;
};

const getLocationsUrl = () => {
  return `${process.env.SERVER_BASE_URL}locations/GetLocations`;
};

const getUpdateLocationDataUrl = () => {
  return `${process.env.SERVER_BASE_URL}locations/UpdateLocations`;
};

const getGroupsUrl = () => {
  return `${process.env.SERVER_BASE_URL}groups/GetGroups`;
};

const getUpdateGroupDataUrl = () => {
  return `${process.env.SERVER_BASE_URL}groups/UpdateGroups`;
};

export const GetBillingTypes = async <ResponseType>(token: string): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getBillingTypesUrl(), token);
};

export const GetLocations = async <ResponseType>(token: string): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getLocationsUrl(), token);
};

export const UpdateLocationData = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return httpRequestPUT<RequestType, ResponseType>(getUpdateLocationDataUrl(), token, body);
};

export const GetGroups = async <ResponseType>(token: string): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getGroupsUrl(), token);
};

export const UpdateGroupData = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return httpRequestPUT<RequestType, ResponseType>(getUpdateGroupDataUrl(), token, body);
};
