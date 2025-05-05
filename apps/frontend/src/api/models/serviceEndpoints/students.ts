'use server';

import { FetchResponse } from '@/api/types/fetch-response';
import { httpRequestGET } from '../api';

const getStudentsByCourseWithAttendancesUrl = (courseId: number) => {
  return `${process.env.SERVER_BASE_URL}students/GetStudentsByCourseWithAttendances/${courseId}`;
};

export const GetStudentsByCourseWithAttendances = async <ResponseType>(
  courseId: number
): Promise<FetchResponse<ResponseType>> => {
  return await httpRequestGET(getStudentsByCourseWithAttendancesUrl(courseId), process.env.JWT_TOKEN!);
};
