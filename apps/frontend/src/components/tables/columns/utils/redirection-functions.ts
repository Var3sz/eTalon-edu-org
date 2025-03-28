import { CoursesDTO } from '@/models/Api';

export const CourseRedirectionFunction = (row: CoursesDTO) => {
  let baseUrl = '/course/';
  baseUrl += row.id;
  return baseUrl;
};
