'use server';

import { UpdateAttendances } from '@/api/models/serviceEndpoints/students';

import { UpdateAttendanceDto } from '@/models/Api';

export const UpdateAttendancesRequest = async (body: UpdateAttendanceDto[], token: string) => {
  return await UpdateAttendances<UpdateAttendanceDto[], any[]>(body, token);
};
