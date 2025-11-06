import { toast } from '@/components/ui/use-toast';
import { InvoiceDateDto } from '@/models/Api';
import { UpdateInvoiceDateFormModel } from '@/models/course/types';
import { invoiceDateSchema } from '@/validation/schemas/course/edit-invoice-date-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateInvoiceDateData } from '@/validation/default-values/course/update-invoice-date-data';
import { UpdateInvoiceDateRequest } from '@/models/course/action/update-invoice-date-action';

type UseInitEditCourseDateDialogProps = {
  courseId: string;
  rowData: InvoiceDateDto;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function useInitEditInvoiceDateDialog({
  courseId,
  rowData,
  setOpenChangeDialog,
  token,
}: UseInitEditCourseDateDialogProps) {
  const queryClient = useQueryClient();
  const [isPending, startTransaction] = useTransition();

  const form = useForm<UpdateInvoiceDateFormModel>({
    defaultValues: UpdateInvoiceDateData(rowData),
    resolver: yupResolver<UpdateInvoiceDateFormModel>(invoiceDateSchema),
  });

  const onValidSubmit = (formModel: UpdateInvoiceDateFormModel) => {
    startTransaction(async () => {
      const updateResponse = await UpdateInvoiceDateRequest(formModel, token);
      if (updateResponse.status === 200 || updateResponse.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['invoice-dates', { id: courseId }] });
        toast({
          title: 'Sikeres frissítés!',
          variant: 'success',
        });
        setOpenChangeDialog && setOpenChangeDialog(false);
      } else {
        toast({
          title: 'Sikertelen frissítés!',
          description: updateResponse.status === 500 && updateResponse.error.Message,
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

  useEffect(() => {
    if (!form.getValues().Helpers.inEdit) form.reset(UpdateInvoiceDateData(rowData));
  }, [form.getValues().Helpers.inEdit]);

  return useMemo(
    () => ({ form, isPending, onInvalidSubmit, onValidSubmit }),
    [form, isPending, onInvalidSubmit, onValidSubmit]
  );
}
