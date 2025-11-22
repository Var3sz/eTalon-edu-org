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
