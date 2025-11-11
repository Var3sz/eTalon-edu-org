'use server';

import { FetchResponse } from '@/api/types/fetch-response';

import { httpRequestGET, httpRequestPUT } from '../api';

const getStudentsByCourseWithAttendancesUrl = (courseId: string) => {
  return `${process.env.SERVER_BASE_URL}students/GetStudentsByCourseWithAttendances/${courseId}`;
};

const getUpdateAttendancesUrl = () => {
  return `${process.env.SERVER_BASE_URL}students/UpdateAttendances`;
};

const getUpdateStudentDetailsUrl = () => {
  return `${process.env.SERVER_BASE_URL}students/UpdateStudentDetails`;
};

const getStudentsByCourseWithPaymentsUrl = (courseId: string) => {
  return `${process.env.SERVER_BASE_URL}students/GetStudentsByCourseWithPayments/${courseId}`;
};

const getUpdateStudentPaymentsUrl = () => {
  return `${process.env.SERVER_BASE_URL}invoice/UpdateStudentPayments`;
};

export const GetStudentsByCourseWithAttendances = async <ResponseType>(
  courseId: string,
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

export const GetStudentsByCourseWithPayments = async <ResponseType>(
  courseId: string,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET(getStudentsByCourseWithPaymentsUrl(courseId), token);
};

export const UpdateStudentPayments = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPUT(getUpdateStudentPaymentsUrl(), token, body);
};
