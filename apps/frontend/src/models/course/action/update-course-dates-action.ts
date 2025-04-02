'use server';

import { CreateCourseDates } from '@/api/models/serviceEndpoints/course';
import { parseDateToISO } from '@/lib/utils';
import { CreateCourseDateDto } from '@/models/Api';
import { EditCourseDatesFormModel } from '@/models/course/types';

const parseBody = (formModel: EditCourseDatesFormModel): CreateCourseDateDto[] => {
  return formModel.CourseDates.map((cd) => {
    return {
      date: parseDateToISO(cd.date)!,
      description: cd.description!,
    };
  });
};

export const updateCourseDatesRequest = async (courseId: number, data: EditCourseDatesFormModel) => {
  const parsedBody = parseBody(data);
  return await CreateCourseDates<CreateCourseDateDto[], any>(courseId, parsedBody);
};
