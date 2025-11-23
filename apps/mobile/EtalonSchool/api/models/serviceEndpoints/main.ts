import { FetchResponse } from '../../types/fetch-response';
import { httpRequestGET, httpRequestPUT } from '../api';
import { SERVER_BASE_URL } from './auth';

// Kurzusok
const getActiveCoursesUrl = () => {
  return `${SERVER_BASE_URL}courses/GetCourses`;
};

const getUpdateCourseStatusUrl = (courseId: number) => {
  return `${SERVER_BASE_URL}courses/UpdateCourse/${courseId}`;
};

// Jelenlétek
const getAttendanceByCourseUrl = (courseId: number) => {
  return `${SERVER_BASE_URL}students/GetStudentsByCourseWithAttendances/${courseId}`;
};

const getUpdateAttendancesUrl = () => {
  return `${SERVER_BASE_URL}students/UpdateAttendances`;
};

// Befizetések
const getPaymentsByCourseUrl = (courseId: number) => {
  return `${SERVER_BASE_URL}students/GetStudentsByCourseWithPayments/${courseId}`;
};

// Profil adatok
const getMyProfileDataUrl = (userId: number) => {
  return `${SERVER_BASE_URL}user/${userId}`;
};

// Kurzusok
export const GetActiveCourses = async <ResponseType>(token: string): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getActiveCoursesUrl(), token);
};

export const UpdateCourseStatus = async <RequestType, ResponseType>(
  body: RequestType,
  courseId: number,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return httpRequestPUT<RequestType, ResponseType>(getUpdateCourseStatusUrl(courseId), token, body);
};

// Jelenlétek
export const GetAttendanceByCourse = async <ResponseType>(
  courseId: number,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getAttendanceByCourseUrl(courseId), token);
};

export const UpdateAttendances = async <RequestType, ResponseType>(
  body: RequestType,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return httpRequestPUT<RequestType, ResponseType>(getUpdateAttendancesUrl(), token, body);
};

// Befizetések
export const GetPaymentsByCourse = async <ResponseType>(
  courseId: number,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getPaymentsByCourseUrl(courseId), token);
};

// Profil adatok
export const GetMyProfile = async <ResponseType>(
  userId: number,
  token: string
): Promise<FetchResponse<ResponseType>> => {
  return httpRequestGET<ResponseType>(getMyProfileDataUrl(userId), token);
};
