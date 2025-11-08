import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { CreateLocationsRequest } from '@/models/location/action/create-locations-request';
import { AddLocationsFormModel } from '@/models/location/type';
import { AddLocationsFormDefault } from '@/validation/default-values/location/add-locations-form-default';
import { AddLocationsSchema } from '@/validation/schemas/location/add-locations-schema';

type UseInitAddLocationsDialogModel = {
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function useInitAddLocationsDialog({ token, setOpenChangeDialog }: UseInitAddLocationsDialogModel) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm<AddLocationsFormModel>({
    defaultValues: AddLocationsFormDefault(),
    resolver: yupResolver<AddLocationsFormModel>(AddLocationsSchema),
  });

  const onValidSubmit = (formModel: AddLocationsFormModel) => {
    startTransaction(async () => {
      const createResponse = await CreateLocationsRequest(formModel, token);
      if (createResponse.status === 200 || createResponse.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['locations'] });
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
