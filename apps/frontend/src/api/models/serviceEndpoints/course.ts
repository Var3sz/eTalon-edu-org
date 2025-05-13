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

const createCoursesUrl = () => {
  return `${process.env.SERVER_BASE_URL}courses/CreateCourses`;
};

// LessonDates
const getCourseDatesByCourseIdUrl = (courseId: string) => {
  return `${process.env.SERVER_BASE_URL}courses/CourseDatesByCourseId/${courseId}`;
};

const createLessonDatesUrl = () => {
  return `${process.env.SERVER_BASE_URL}courses/CreateLessonDates`;
};

const updateLessonDateUrl = () => {
  return `${process.env.SERVER_BASE_URL}courses/UpdateLessonDate`;
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

export const CreateCourses = async <RequestType, ResponseType>(
  body: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST<RequestType, ResponseType>(createCoursesUrl(), process.env.JWT_TOKEN!, body);
};

// LessonDates
export const GetCourseDatesByCourseId = async <ResponseType>(
  courseId: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET(getCourseDatesByCourseIdUrl(courseId), process.env.JWT_TOKEN!);
};

export const CreateLessonDates = async <RequestType, ResponseType>(
  body: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST(createLessonDatesUrl(), process.env.JWT_TOKEN!, body);
};

export const UpdateLessonDate = async <RequestType, ResponseType>(
  body: RequestType
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPUT(updateLessonDateUrl(), process.env.JWT_TOKEN!, body);
};
