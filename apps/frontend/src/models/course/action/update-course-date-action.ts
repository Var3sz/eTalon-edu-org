'use server';

import { UpdateLessonDate } from '@/api/models/serviceEndpoints/course';
import { parseDateToISO } from '@/lib/utils';
import { LessonDateDto, UpdateLessonDateDto } from '@/models/Api';

import { UpdateCourseDateFormModel } from '../types';

const parseCourseDateData = (formModel: UpdateCourseDateFormModel): LessonDateDto => {
  return {
    id: formModel.id!,
    date: parseDateToISO(formModel.date)!,
    description: formModel.description,
  };
};

export const UpdateCourseDateRequest = async (formModel: UpdateCourseDateFormModel, token: string) => {
  const parsedBody = parseCourseDateData(formModel);
  return await UpdateLessonDate<UpdateLessonDateDto, LessonDateDto>(parsedBody, token);
};
