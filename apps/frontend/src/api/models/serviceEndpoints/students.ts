'use server';

import { FetchResponse } from '@/api/types/fetch-response';

import { httpRequestGET, httpRequestPUT } from '../api';

const getStudentsByCourseWithAttendancesUrl = (courseId: number) => {
  return `${process.env.SERVER_BASE_URL}students/GetStudentsByCourseWithAttendances/${courseId}`;
};

const getUpdateAttendancesUrl = () => {
  return `${process.env.SERVER_BASE_URL}students/UpdateAttendances`;
};

const getUpdateStudentDetailsUrl = () => {
  return `${process.env.SERVER_BASE_URL}students/UpdateStudentDetails`;
};

export const GetStudentsByCourseWithAttendances = async <ResponseType>(
  courseId: number,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET(getStudentsByCourseWithAttendancesUrl(courseId), token);
};

export const UpdateAttendances = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPUT(getUpdateAttendancesUrl(), token, body);
};

export const UpdateStudentDetails = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPUT(getUpdateStudentDetailsUrl(), token, body);
};
