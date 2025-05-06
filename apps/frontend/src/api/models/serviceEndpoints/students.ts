'use server';

import { FetchResponse } from '@/api/types/fetch-response';
import { httpRequestGET, httpRequestPUT } from '../api';

const getStudentsByCourseWithAttendancesUrl = (courseId: number) => {
  return `${process.env.SERVER_BASE_URL}students/GetStudentsByCourseWithAttendances/${courseId}`;
};

const getUpdateAttendancesUrl = () => {
  return `${process.env.SERVER_BASE_URL}students/UpdateAttendances`;
};

export const GetStudentsByCourseWithAttendances = async <ResponseType>(
  courseId: number
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET(getStudentsByCourseWithAttendancesUrl(courseId), process.env.JWT_TOKEN!);
};

export const UpdateAttendances = async <RequestType, ResponseType>(
  body: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPUT(getUpdateAttendancesUrl(), process.env.JWT_TOKEN!, body);
};
