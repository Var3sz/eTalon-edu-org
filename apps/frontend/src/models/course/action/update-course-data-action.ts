'use server';

import { UpdateCourseData } from '@/api/models/serviceEndpoints/course';
import { parseDateToISO } from '@/lib/utils';
import { CourseDto, UpdateCourseDto } from '@/models/Api';

import { UpdateCourseFormModel } from '../types';

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

export const UpdateCourseDataRequest = async (formModel: UpdateCourseFormModel, token: string) => {
  const parsedBody = parseUpdateCourseData(formModel);
  return await UpdateCourseData<UpdateCourseDto, CourseDto>(formModel.id!, parsedBody, token);
};
