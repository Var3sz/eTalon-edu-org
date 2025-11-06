import { convertStringToDate } from '@/lib/utils';
import { InvoiceDateDto } from '@/models/Api';
import { UpdateInvoiceDateFormModel } from '@/models/course/types';

export const UpdateInvoiceDateData = (invoiceDate: InvoiceDateDto): UpdateInvoiceDateFormModel => {
  return {
    id: invoiceDate.id,
    date: convertStringToDate(invoiceDate.date),
    description: invoiceDate.description,
    Helpers: {
      inEdit: false,
    },
  };
};
