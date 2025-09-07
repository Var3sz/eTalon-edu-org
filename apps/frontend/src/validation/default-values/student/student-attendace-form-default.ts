import { AttendanceForm, StudentAttendanceForm } from '@/hooks/courses/use-init-course-client';

export const StudentAttendanceFormDefault = (): StudentAttendanceForm => {
  return {
    attendance: [],
    Helpers: {
      inEdit: false,
    },
  } as StudentAttendanceForm;
};

export const StudentAttendanceFormData = (data: AttendanceForm[]): StudentAttendanceForm => {
  return {
    attendance: data,
    Helpers: {
      inEdit: false,
    },
  };
};
