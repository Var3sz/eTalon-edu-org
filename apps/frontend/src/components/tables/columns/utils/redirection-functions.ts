import { ActiveCourseDto, CourseDto, PackageDto } from '@/models/Api';

export const CourseEditRedirectionFunction = (row: CourseDto) => {
  let baseUrl = '/course/edit/';
  baseUrl += row.id;
  return baseUrl;
};

export const CourseRedirectionFunction = (row: ActiveCourseDto) => {
  let baseUrl = '/course/';
  baseUrl += row.id;
  return baseUrl;
};

export const CoursePaymentsRedirectionFunction = (row: ActiveCourseDto) => {
  let baseUrl = '/course/payment/';
  baseUrl += row.id;
  return baseUrl;
};

export const PackageEditRedirectionFunction = (row: PackageDto) => {
  let baseUrl = '/package/edit/';
  baseUrl += row.id;
  return baseUrl;
};
