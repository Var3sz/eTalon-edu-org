import { AddNewCourseModel } from '@/models/course/types';

export const AddNewCourseFormDefault = (): AddNewCourseModel => {
  return {
    group: null,
    active: false,
    packageCodes: [],
    courseId: null,
    description: null,
    location: null,
    unitPrice: null,
  };
};
