'use server';

import { AssingPackagesToCourses } from '@/api/models/serviceEndpoints/packages';
import { AssignPackageToCourseDto } from '@/models/Api';

export const AssingPackagesToCoursesRequest = async (dto: AssignPackageToCourseDto[], token: string) => {
  return await AssingPackagesToCourses<AssignPackageToCourseDto[], any>(dto, token);
};
