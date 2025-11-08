'use server';

import { FetchResponse } from '@/api/types/fetch-response';

import { httpRequestGET, httpRequestPOST } from '../api';

const getPackagesUrl = () => {
  return `${process.env.SERVER_BASE_URL}packages/GetPackages`;
};

const getCreatePackagesUrl = () => {
  return `${process.env.SERVER_BASE_URL}packages/CreatePackages`;
};

const getCoursePackageDataurl = (type: string, locationId: number) => {
  return `${process.env.SERVER_BASE_URL}packages/GetPackagesAndCoursesByLocGroupType?type=${type}&locationId=${locationId}`;
};

const assignPackagesToCoursesUrl = () => {
  return `${process.env.SERVER_BASE_URL}packages/AssignPackagesToCourses`;
};

export const GetPackages = async <ResponseType>(token: string): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getPackagesUrl(), token);
};

export const CreatePackages = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST<RequestType, ResponseType>(getCreatePackagesUrl(), token, body);
};

export const GetCoursePackageData = async <ResponseType>(
  type: string,
  locationId: number,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getCoursePackageDataurl(type, locationId), token);
};

export const AssingPackagesToCourses = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST(assignPackagesToCoursesUrl(), token, body);
};
