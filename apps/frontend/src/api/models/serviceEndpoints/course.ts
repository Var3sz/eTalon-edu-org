'use server';

import { httpRequestGET, httpRequestPOST, httpRequestPUT } from '@/api/models/api';
import { FetchResponse } from '@/api/types/fetch-response';

const getActiveCoursesUrl = () => {
  return `${process.env.SERVER_BASE_URL}courses/GetActiveCourses`;
};

const getCoursesForModificationUrl = () => {
  return `${process.env.SERVER_BASE_URL}courses/GetCoursesForModification`;
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

export const GetActiveCourses = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getActiveCoursesUrl(), process.env.JWT_TOKEN!);
};

export const GetCoursesForModification = async <ResponseType>(): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getCoursesForModificationUrl(), process.env.JWT_TOKEN!);
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
