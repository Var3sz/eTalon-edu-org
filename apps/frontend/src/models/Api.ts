export interface CourseDto {
  description: string;
  id: number;
  courseId: string;
  headcount?: number | null;
  maxHeadCount: number;
  /** @format date-time */
  startDate: string;
  startTime: string;
  endTime: string;
  active: boolean;
  locked: boolean;
  groupId: number;
  locationId: number;
}

export interface ActiveCourseDto {
  description: string;
  id: number;
  courseId: string;
  groupDescription: string;
  occupancy: number;
  headcount?: number | null;
  maxHeadCount: number;
  price: number;
  /** @format date-time */
  startDate: string;
  startTime: string;
  endTime: string;
  active: boolean;
  locked: boolean;
}

export interface UpdateCourseDto {
  description: string;
  courseId: string;
  headcount?: number | null;
  maxHeadCount: number;
  /** @format date-time */
  startDate: string;
  startTime: string;
  endTime: string;
  active: boolean;
  locked: boolean;
  groupId: number;
  locationId: number;
}

export interface LessonDateDto {
  id: number;
  description: string | null;
  /** @format date-time */
  date: string;
}

export interface LessonDateInfoDto {
  /** @format date-time */
  date: string;
  description: string | null;
}

export interface CreateLessonDateDto {
  courseId: number;
  dateInfo: LessonDateInfoDto[];
}

export interface UpdateLessonDateDto {
  id: number;
  /** @format date-time */
  date: string;
  description: string | null;
}

export interface AttendanceDto {
  lessonDateId: number;
  /** @format date-time */
  date: string;
  description?: string;
  attended: boolean;
}

export interface StudentDto {
  id: number;
  sapId: number;
  /** @format date-time */
  subdate: string;
  email: string;
  firstname: string;
  lastname: string;
  billCompany: string;
  city: string;
  zip: number;
  address: string;
  coupon: string;
  vatNum: string;
  billingAddressTypeId: number;
  childName: string;
  childMail: string;
  childGrade: number;
  childTAJ: string;
  specialDiet: boolean;
  specialDietDesc: string;
  mobile: string;
  packageType: string;
  packageCode: string;
  disease: boolean;
  diseaseDesc: string;
  discount: string;
  discount2: string;
  attendance: AttendanceDto[];
}

export interface StudentAttendanceDto {
  courseId: string;
  students: StudentDto[];
}

export interface UpdateStudentDetailsDTO {
  id: number;
  sapId: number;
  email: string;
  firstname: string;
  lastname: string;
  billCompany: string;
  city: string;
  zip: number;
  address: string;
  coupon: string;
  vatNum: string;
  billingAddressTypeId: number;
  childName: string;
  childMail: string;
  childGrade: number;
  childTAJ: string;
  specialDiet: boolean;
  specialDietDesc: string;
  mobile: string;
  packageType: string;
  packageCode: string;
  disease: boolean;
  diseaseDesc: string;
  discount: string;
  discount2: string;
}

export interface StudentDetailsDTO {
  id: number;
  sapId: number;
  /** @format date-time */
  subdate: string;
  email: string;
  firstname: string;
  lastname: string;
  billCompany: string;
  city: string;
  zip: number;
  address: string;
  coupon: string;
  vatNum: string;
  billingAddressTypeId: number;
  childName: string;
  childMail: string;
  childGrade: number;
  childTAJ: string;
  specialDiet: boolean;
  specialDietDesc: string;
  mobile: string;
  packageType: string;
  packageCode: string;
  disease: boolean;
  diseaseDesc: string;
  discount: string;
  discount2: string;
}

export interface BillingAddressTypeDto {
  id: number;
  description: string;
}

export interface LocationDto {
  id: number;
  description: string;
}

export interface GroupDto {
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
