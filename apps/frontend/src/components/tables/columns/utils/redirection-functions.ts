import { Course } from '@/models/course/types';

export const CourseRedirectionFunction = (row: Course) => {
  let baseUrl = '/course/';
  baseUrl += row.id;
  return baseUrl;
};
