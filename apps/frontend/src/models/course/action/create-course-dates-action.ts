'use server';

import { CreateLessonDates } from '@/api/models/serviceEndpoints/course';
import { CreateCourseDatesFormModel } from '../types';
import { CreateLessonDateDto } from '@/models/Api';
import { parseDateToISO } from '@/lib/utils';

const parseCreateBody = (courseId: string, formModel: CreateCourseDatesFormModel): CreateLessonDateDto => {
  return {
    courseId: parseInt(courseId),
    dateInfo: formModel.CourseDateList.map((date) => {
      return {
        description: date.description,
        date: parseDateToISO(date.date)!,
      };
    }),
  };
};

export const CreateCourseDatesRequest = async (courseId: string, formModel: CreateCourseDatesFormModel) => {
  const parsedBody = parseCreateBody(courseId, formModel);
  return await CreateLessonDates<CreateLessonDateDto, any>(parsedBody);
};
