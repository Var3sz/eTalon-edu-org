'use server';

import { FetchResponse } from '@/api/types/fetch-response';
import { httpRequestGET, httpRequestPOST } from '../api';

const getPackagesUrl = () => {
  return `${process.env.SERVER_BASE_URL}packages/GetPackages`;
};

const getCreatePackagesUrl = () => {
  return `${process.env.SERVER_BASE_URL}packages/CreatePackages`;
};

export const GetPackages = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getPackagesUrl(), process.env.JWT_TOKEN!);
};

export const CreatePackages = async <RequestType, ResponseType>(
  body: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST<RequestType, ResponseType>(getCreatePackagesUrl(), process.env.JWT_TOKEN!, body);
};
