import { CreateCourseDatesFormModel } from '@/models/course/types';

export const CreateCourseDatesFormDefault = (): CreateCourseDatesFormModel => {
  return {
    CourseDateList: [
      {
        id: null,
        date: null,
        description: null,
      },
    ],
    Helpers: {
      inEdit: true,
    },
  };
};
