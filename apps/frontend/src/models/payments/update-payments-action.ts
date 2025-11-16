'use server';

import { UpdateStudentPayments } from '@/api/models/serviceEndpoints/students';

import { UpdatePaymentsDto } from '../Api';

export const UpdatePaymentsRequest = async (body: UpdatePaymentsDto[], token: string) => {
  return await UpdateStudentPayments<UpdatePaymentsDto[], any[]>(body, token);
};
