import { UpdateStudentDetailsDTO } from '@/models/Api';

export type UpdateStudentDetailsFormModel = {
  Helpers: {
    inEdit: boolean;
  };
} & UpdateStudentDetailsDTO;

export type AttendanceDateColumnType = {
  lessonDateId: number;
  date: string;
  description: string;
};
