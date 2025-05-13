'use server';

import { LessonDateDto, UpdateLessonDateDto } from '@/models/Api';
import { UpdateCourseDateFormModel } from '../types';
import { UpdateLessonDate } from '@/api/models/serviceEndpoints/course';
import { parseDateToISO } from '@/lib/utils';

const parseCourseDateData = (formModel: UpdateCourseDateFormModel): LessonDateDto => {
  return {
    id: formModel.id!,
    date: parseDateToISO(formModel.date)!,
    description: formModel.description,
  };
};

export const UpdateCourseDateRequest = async (formModel: UpdateCourseDateFormModel) => {
  const parsedBody = parseCourseDateData(formModel);
  return await UpdateLessonDate<UpdateLessonDateDto, any>(parsedBody);
};
