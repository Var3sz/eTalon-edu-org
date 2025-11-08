'use server';

import { parseDateToISO } from '@/lib/utils';
import { InvoiceDateDto, LessonDateDto, UpdateInvoiceDateDto, UpdateLessonDateDto } from '@/models/Api';
import { UpdateInvoiceDateFormModel } from '../types';
import { UpdateInvoiceDate } from '@/api/models/serviceEndpoints/course';

const parseInvoiceDateData = (formModel: UpdateInvoiceDateFormModel): LessonDateDto => {
  return {
    id: formModel.id!,
    date: parseDateToISO(formModel.date)!,
    description: formModel.description,
  };
};

export const UpdateInvoiceDateRequest = async (formModel: UpdateInvoiceDateFormModel, token: string) => {
  const parsedBody = parseInvoiceDateData(formModel);
  return await UpdateInvoiceDate<UpdateInvoiceDateDto, InvoiceDateDto>(parsedBody, token);
};
