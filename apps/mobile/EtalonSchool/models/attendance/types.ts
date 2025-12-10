export type LessonAttendance = {
  lessonDateId: number;
  date: string;
  description: string;
  attended: boolean;
};

export type Student = {
  id: number;
  firstname: string;
  lastname: string;
  childName: string;
  email: string;
  mobile: string;
  city: string;
  zip: number;
  address: string;
  sapId: number;
  attendance: LessonAttendance[];
};

export type CourseAttendanceResponse = {
  courseId: string;
  students: Student[];
};

export type UpdateAttendanceDto = {
  studentId: number;
  lessondateId: number;
  attended: boolean;
};
