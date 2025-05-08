'use server';

import { httpRequestGET, httpRequestPOST, httpRequestPUT } from '@/api/models/api';
import { FetchResponse } from '@/api/types/fetch-response';

const getCoursesUrl = () => {
  return `${process.env.SERVER_BASE_URL}courses/GetCourses`;
};

const getActiveCoursesUrl = () => {
  return `${process.env.SERVER_BASE_URL}courses/GetActiveCourses`;
};

const getCourseByIdUrl = (courseId: string) => {
  return `${process.env.SERVER_BASE_URL}courses/GetCourseById/${courseId}`;
};

const updateCourseByIdUrl = (courseId: number) => {
  return `${process.env.SERVER_BASE_URL}courses/UpdateCourse/${courseId}`;
};

const getCourseDetailsByIdUrl = (courseId: number) => {
  return `${process.env.SERVER_BASE_URL}courses/GetCourseDetailsById/${courseId}`;
};

const upsertCoursesDataUrl = () => {
  return `${process.env.SERVER_BASE_URL}courses/CreateOrUpdateCourses`;
};

const updateStudentDetailsUrl = (studentId: number) => {
  return `${process.env.SERVER_BASE_URL}students/UpdateStudentDetails/${studentId}`;
};

const createCourseDatesUrl = (courseId: number) => {
  return `${process.env.SERVER_BASE_URL}courses/CreateCourseDatesForCourse/${courseId}`;
};

// HTTP functions
export const GetCourses = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getCoursesUrl(), process.env.JWT_TOKEN!);
};

export const GetActiveCourses = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getActiveCoursesUrl(), process.env.JWT_TOKEN!);
};

export const GetCourseById = async <ResponseType>(courseId: string): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getCourseByIdUrl(courseId), process.env.JWT_TOKEN!);
};

export const UpdateCourseData = async <RequestType, ResponseType>(
  courseId: number,
  body: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPUT<RequestType, ResponseType>(updateCourseByIdUrl(courseId), process.env.JWT_TOKEN!, body);
};

export const GetCourseDetailsById = async <ResponseType>(courseId: number): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET(getCourseDetailsByIdUrl(courseId), process.env.JWT_TOKEN!);
};

export const UpsertCoursesData = async <RequestType, ResponseType>(
  requestBody: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST(upsertCoursesDataUrl(), process.env.JWT_TOKEN!, requestBody);
};

export const UpdateStudentDetails = async <RequestType, ResponseType>(
  studentId: number,
  studentBody: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPUT(updateStudentDetailsUrl(studentId), process.env.JWT_TOKEN!, studentBody);
};

export const CreateCourseDates = async <RequestType, ResponseType>(
  courseId: number,
  courseDateBody: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST(createCourseDatesUrl(courseId), process.env.JWT_TOKEN!, courseDateBody);
};
