import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { CreatePackagesRequest } from '@/models/package/action/create-packages-action';
import { CreatePackagesFormModel } from '@/models/package/types';
import { CreatePackagesFormDefault } from '@/validation/default-values/package/create-packages-form-default';
import { CreatePackagesSchema } from '@/validation/schemas/package/create-packages-schema';

type UseInitCreatePackagesDialogProps = {
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function useInitCreatePackagesDialog({ setOpenChangeDialog }: UseInitCreatePackagesDialogProps) {
  const queryClient = useQueryClient();
  const [isPending, startTransaction] = useTransition();
  const form = useForm<CreatePackagesFormModel>({
    defaultValues: CreatePackagesFormDefault(),
    resolver: yupResolver<CreatePackagesFormModel>(CreatePackagesSchema),
  });

  const onValidSubmit = (formModel: CreatePackagesFormModel) => {
    startTransaction(async () => {
      const createResponse = await CreatePackagesRequest(formModel);
      if (createResponse.status === 200 || createResponse.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['packages'] });
        toast({
          variant: 'success',
          title: 'Sikeres létrehozás!',
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
