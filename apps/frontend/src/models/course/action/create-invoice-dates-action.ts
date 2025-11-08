'use server';

import { CreateInvoiceDates } from '@/api/models/serviceEndpoints/course';
import { parseDateToISO } from '@/lib/utils';
import { CreateInvoiceDateDto, InvoiceDateDto } from '@/models/Api';

import { CreateInvoiceDatesFormModel } from '../types';

const parseCreateBody = (courseId: string, formModel: CreateInvoiceDatesFormModel): CreateInvoiceDateDto => {
  return {
    courseId: parseInt(courseId),
    dateInfo: formModel.InvoiceDateList.map((date) => {
      return {
        description: date.description,
        date: parseDateToISO(date.date)!,
      };
    }),
  };
};

export const CreateInvoiceDatesRequest = async (
  courseId: string,
  formModel: CreateInvoiceDatesFormModel,
  token: string
) => {
  const parsedBody = parseCreateBody(courseId, formModel);
  return await CreateInvoiceDates<CreateInvoiceDateDto, InvoiceDateDto[]>(parsedBody, token);
};
