'use server';

import { httpRequestGET, httpRequestPATCH } from '@/api/models/Api';
import { FetchResponse } from '@/api/types/FetchResponse';

const getAllCoursesUrl = () => {
  return `${process.env.SERVER_BASE_URL}courses/GetCourses`;
};

const getStudentsByCourseIdUrl = (courseId: number) => {
  return `${process.env.SERVER_BASE_URL}students/GetStudentsByCourseId/${courseId}`;
};

const getStudentDetailsByStudentIdUrl = (studentId: number) => {
  return `${process.env.SERVER_BASE_URL}students/GetStudentDetailsById/${studentId}`;
};

const updateStudentDetailsUrl = (studentId: number) => {
  return `${process.env.SERVER_BASE_URL}students/UpdateChildrenDetails/${studentId}`;
};

export const GetAllCourses = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getAllCoursesUrl(), process.env.JWT_TOKEN!);
};

export const GetStudentsByCourseId = async <ResponseType>(courseId: number): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET(getStudentsByCourseIdUrl(courseId), process.env.JWT_TOKEN!);
};

export const GetStudentDetailsByStudentId = async <ResponseType>(
  studentId: number
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET(getStudentDetailsByStudentIdUrl(studentId), process.env.JWT_TOKEN!);
};

export const UpdateStudentDetails = async <RequestType, ResponseType>(
  studentId: number,
  studentBody: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPATCH(updateStudentDetailsUrl(studentId), process.env.JWT_TOKEN!, studentBody);
};
