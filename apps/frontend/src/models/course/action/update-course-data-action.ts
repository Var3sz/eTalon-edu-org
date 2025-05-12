'use server';

import { UpdateCourseDto } from '@/models/Api';
import { UpdateCourseFormModel } from '../types';
import { parseDateToISO } from '@/lib/utils';
import { UpdateCourseData } from '@/api/models/serviceEndpoints/course';

const parseUpdateCourseData = (formModel: UpdateCourseFormModel): UpdateCourseDto => {
  return {
    description: formModel.description!,
    courseId: formModel.courseId!,
    headcount: formModel.headcount,
    maxHeadCount: formModel.maxHeadCount!,
    startDate: parseDateToISO(formModel.startDate)!,
    startTime: formModel.startTime!,
    endTime: formModel.endTime!,
    active: formModel.active,
    locked: formModel.locked,
    groupId: formModel.groupId!,
    locationId: formModel.locationId!,
  };
};

export const UpdateCourseDataRequest = async (formModel: UpdateCourseFormModel) => {
  const parsedBody = parseUpdateCourseData(formModel);
  return await UpdateCourseData<UpdateCourseDto, any>(formModel.id!, parsedBody);
};
