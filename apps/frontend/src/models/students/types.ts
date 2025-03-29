import { UpdateStudentDetailsDTO } from '@/models/Api';

export type UpdateStudentDetailsFormModel = {
  Helpers: {
    inEdit: boolean;
  };
} & UpdateStudentDetailsDTO;
