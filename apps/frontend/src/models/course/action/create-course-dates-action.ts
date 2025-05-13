'use server';

import { CreateLessonDates } from '@/api/models/serviceEndpoints/course';
import { parseDateToISO } from '@/lib/utils';
import { CreateLessonDateDto } from '@/models/Api';

import { CreateCourseDatesFormModel } from '../types';

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
