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

export const GetPackages = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getPackagesUrl(), process.env.JWT_TOKEN!);
};

export const CreatePackages = async <RequestType, ResponseType>(
  body: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST<RequestType, ResponseType>(getCreatePackagesUrl(), process.env.JWT_TOKEN!, body);
};

export const GetCoursePackageData = async <ResponseType>(
  type: string,
  locationId: number
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getCoursePackageDataurl(type, locationId), process.env.JWT_TOKEN!);
};

export const AssingPackagesToCourses = async <RequestType, ResponseType>(
  body: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST(assignPackagesToCoursesUrl(), process.env.JWT_TOKEN!, body);
};
