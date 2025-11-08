import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { CreateInvoiceDatesRequest } from '@/models/course/action/create-invoice-dates-action';
import { CreateInvoiceDatesFormModel } from '@/models/course/types';
import { CreateInvoiceDatesFormDefault } from '@/validation/default-values/course/create-invoice-dates-form-default';
import { CreateInvoiceDatesFormSchema } from '@/validation/schemas/course/create-invoice-dates-schema';

type UseInitCreateInvoiceDatesDialogProps = {
  courseId: string;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function useInitCreateInvoiceDatesDialog({
  courseId,
  setOpenChangeDialog,
  token,
}: UseInitCreateInvoiceDatesDialogProps) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm<CreateInvoiceDatesFormModel>({
    defaultValues: CreateInvoiceDatesFormDefault(),
    resolver: yupResolver<CreateInvoiceDatesFormModel>(CreateInvoiceDatesFormSchema),
  });

  const onValidSubmit = (formModel: CreateInvoiceDatesFormModel) => {
    startTransaction(async () => {
      const createResponse = await CreateInvoiceDatesRequest(courseId, formModel, token);
      if (createResponse.status === 200 || createResponse.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['invoice-dates', { id: courseId }] });
        toast({
          title: 'Sikeres Létrehozás!',
          variant: 'success',
        });
        setOpenChangeDialog && setOpenChangeDialog(false);
      } else {
        toast({
          title: 'Sikertelen létrehozás!',
          description: createResponse.status === 500 && createResponse.error.Message,
          variant: 'destructive',
        });
      }
    });
  };

  const onInvalidSubmit = (e: any) => {
    console.error(e);
    toast({
      title: 'Hibás adatok!',
      description: 'Hiba történt a validáció során!',
      variant: 'destructive',
    });
  };

  return useMemo(
    () => ({ form, isPending, onValidSubmit, onInvalidSubmit }),
    [form, isPending, onValidSubmit, onInvalidSubmit]
  );
}
