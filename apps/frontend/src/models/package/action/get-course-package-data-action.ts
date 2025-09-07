'use server';

import { GetCoursePackageData } from '@/api/models/serviceEndpoints/packages';
import { PackageCourseAssignDto } from '@/models/Api';

export const GetCoursePackageDataRequest = async (type: string, locationId: number) => {
  return await GetCoursePackageData<PackageCourseAssignDto>(type, locationId);
};
