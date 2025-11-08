'use server';

import { UpdateAttendances } from '@/api/models/serviceEndpoints/students';

import { UpdateAttendancesType } from '../types';

export const UpdateAttendancesRequest = async (body: UpdateAttendancesType[], token: string) => {
  return await UpdateAttendances<UpdateAttendancesType[], any[]>(body, token);
};
