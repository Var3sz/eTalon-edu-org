'use server';

import { UpdateAttendances } from '@/api/models/serviceEndpoints/students';
import { UpdateAttendancesType } from '../types';

export const UpdateAttendancesRequest = async (body: UpdateAttendancesType[]) => {
  return await UpdateAttendances<UpdateAttendancesType[], any>(body);
};
