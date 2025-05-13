import { convertStringToDate } from '@/lib/utils';
import { LessonDateDto } from '@/models/Api';
import { UpdateCourseDateFormModel } from '@/models/course/types';

export const UpdateCourseDateData = (courseDate: LessonDateDto): UpdateCourseDateFormModel => {
  return {
    id: courseDate.id,
    date: convertStringToDate(courseDate.date),
    description: courseDate.description,
    Helpers: {
      inEdit: false,
    },
  };
};
