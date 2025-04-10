/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface CoursesDTO {
  id: number;
  courseId: string;
  groupDescription: string;
  occupancy: number;
  description: string;
  headcount: number;
  maxHeadcount: number;
  price: number;
  /** @format date-time */
  startDate: string;
  startTime: string;
  endTime: string;
  active: boolean;
  locked: boolean;
}

export interface RawCourseDTO {
  id: number;
  courseId: string;
  description: string;
  price: number | null;
  active: boolean;
  endTime: string;
  groupId: number;
  headcount: number | null;
  locationId: number;
  maxHeadcount: number;
  /** @format date-time */
  startDate: string;
  startTime: string;
  locked: boolean;
}

export interface AttendanceRecordDto {
  studentId?: number;
  courseDateId?: number;
  attended: boolean;
}

export interface StudentDto {
  id: number;
  children: string;
  email: string;
  lastname: string;
  firstname: string;
  billCompany: string;
  city: string;
  zip: number;
  address: string;
  vatNumber: string;
  childrenMail: string;
  mobile: string;
  billingTypeId: number;
  attendance: AttendanceRecordDto[];
}

export interface CourseStudentDto {
  id: number;
  courseId: number;
  studentId: number;
  student: StudentDto;
}

export interface CourseDateDto {
  id: number;
  /** @format date-time */
  date: string;
  description: string;
  attendance: AttendanceRecordDto[];
}

export interface CourseCourseDateDto {
  id: number;
  courseId: number;
  courseDateId: number;
  courseDate: CourseDateDto;
}

export interface CourseDetailsDto {
  id: number;
  courseId: string;
  students: CourseStudentDto[];
  courseDates: CourseCourseDateDto[];
}

export interface UpsertCourseDTO {
  startDate: string;
  id: number | null;
  courseId: string;
  description: string;
  price: number | null;
  active: boolean;
  endTime: string;
  groupId: number;
  headCount: number | null;
  locationId: number;
  maxHeadcount: number | null;
  startTime: string;
  locked: boolean;
}

export interface SaveResultDto {
  saved: boolean;
  title: string;
  description: string;
}

export interface CreateCourseDateDto {
  date: string;
  description: string;
}

export interface UpdateStudentDetailsDTO {
  email: string;
  lastname: string;
  firstname: string;
  billCompany?: string;
  city: string;
  zip: number;
  address: string;
  vatNumber?: string;
  children: string;
  childrenMail?: string;
  mobile: string;
  billingTypeId: number;
}

export interface StudentDetailsDTO {
  id: number;
  email: string;
  lastname: string;
  firstname: string;
  billCompany: string;
  city: string;
  zip: number;
  address: string;
  vatNumber: string;
  children: string;
  childrenMail: string;
  mobile: string;
  billingTypeId: number;
}

export interface BillingTypeDTO {
  id: number;
  description: string;
}

export interface LocationDTO {
  id: number;
  description: string;
}

export interface GroupDTO {
  id: number;
  description: string;
}

export interface ProfileDto {
  id: number;
  email: string;
  name: string;
  roleId: number;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  username: string;
  password: string;
}
