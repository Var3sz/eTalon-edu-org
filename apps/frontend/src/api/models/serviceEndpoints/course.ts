'use server';

import { httpRequestGET, httpRequestPUT } from '@/api/models/api';
import { FetchResponse } from '@/api/types/fetch-response';

const getActiveCoursesUrl = () => {
  return `${process.env.SERVER_BASE_URL}courses/GetActiveCourses`;
};

const getCourseDetailsByIdUrl = (courseId: number) => {
  return `${process.env.SERVER_BASE_URL}courses/GetCourseDetailsById/${courseId}`;
};

const updateStudentDetailsUrl = (studentId: number) => {
  return `${process.env.SERVER_BASE_URL}students/UpdateStudentDetails/${studentId}`;
};

export const GetActiveCourses = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getActiveCoursesUrl(), process.env.JWT_TOKEN!);
};

export const GetCourseDetailsById = async <ResponseType>(courseId: number): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET(getCourseDetailsByIdUrl(courseId), process.env.JWT_TOKEN!);
};

export const UpdateStudentDetails = async <RequestType, ResponseType>(
  studentId: number,
  studentBody: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPUT(updateStudentDetailsUrl(studentId), process.env.JWT_TOKEN!, studentBody);
};
