'use server';

import { httpRequestDELETE, httpRequestGET, httpRequestPOST, httpRequestPUT } from '@/api/models/api';
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

// InvoiceDates
const getInvoiceDatesByCourseIdUrl = (courseId: string) => {
  return `${process.env.SERVER_BASE_URL}courses/InvoiceDatesByCourseId/${courseId}`;
};

const createInvoiceDatesUrl = () => {
  return `${process.env.SERVER_BASE_URL}courses/CreateInvoiceDates`;
};

const updateInvoiceDateUrl = () => {
  return `${process.env.SERVER_BASE_URL}courses/UpdateInvoiceDate`;
};

const getInactivateCourseUrl = (courseId: number) => {
  return `${process.env.SERVER_BASE_URL}courses/InactivateCourse/${courseId}`;
};

// HTTP functions
export const GetCourses = async <ResponseType>(token: string): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getCoursesUrl(), token);
};

export const GetActiveCourses = async <ResponseType>(token: string): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getActiveCoursesUrl(), token);
};

export const GetCourseById = async <ResponseType>(
  courseId: string,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET<ResponseType>(getCourseByIdUrl(courseId), token);
};

export const UpdateCourseData = async <RequestType, ResponseType>(
  courseId: number,
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPUT<RequestType, ResponseType>(updateCourseByIdUrl(courseId), token, body);
};

export const CreateCourses = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST<RequestType, ResponseType>(createCoursesUrl(), token, body);
};

// LessonDates
export const GetCourseDatesByCourseId = async <ResponseType>(
  courseId: string,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET(getCourseDatesByCourseIdUrl(courseId), token);
};

export const CreateLessonDates = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST(createLessonDatesUrl(), token, body);
};

export const UpdateLessonDate = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPUT(updateLessonDateUrl(), token, body);
};

// InvoiceDate
export const GetInvoiceDatesByCourseId = async <ResponseType>(
  courseId: string,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET(getInvoiceDatesByCourseIdUrl(courseId), token);
};

export const CreateInvoiceDates = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPOST(createInvoiceDatesUrl(), token, body);
};

export const UpdateInvoiceDate = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestPUT(updateInvoiceDateUrl(), token, body);
};

export const InactivateCourse = async <RequestType, ResponseType>(
  courseId: number,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestDELETE<RequestType, ResponseType>(getInactivateCourseUrl(courseId), token);
};
