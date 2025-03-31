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

export interface BillingTypeDTO {
  id: number;
  description: string;
}
