import { CreateInvoiceDatesFormModel } from '@/models/course/types';

export const CreateInvoiceDatesFormDefault = (): CreateInvoiceDatesFormModel => {
  return {
    InvoiceDateList: [
      {
        id: null,
        date: null,
        description: null,
      },
    ],
    Helpers: {
      inEdit: true,
    },
  };
};
