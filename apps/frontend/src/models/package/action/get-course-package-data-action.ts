'use server';

import { GetCoursePackageData } from '@/api/models/serviceEndpoints/packages';
import { PackageCourseAssignDto } from '@/models/Api';

export const GetCoursePackageDataRequest = async (type: string, groupId: number, locationId: number) => {
  return await GetCoursePackageData<PackageCourseAssignDto>(type, groupId, locationId);
};
