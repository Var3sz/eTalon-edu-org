import { CreateCoursesFormModel } from '@/models/course/types';

export const CreateCoursesFormDefault = (): CreateCoursesFormModel => {
  return {
    CourseList: [
      {
        description: null,
        courseId: null,
        headcount: 0,
        maxHeadCount: null,
        startDate: null,
        startTime: null,
        endTime: null,
        active: true,
        locked: false,
        groupId: null,
        locationId: null,
      },
    ],
    Helpers: {
      inEdit: true,
    },
  };
};
