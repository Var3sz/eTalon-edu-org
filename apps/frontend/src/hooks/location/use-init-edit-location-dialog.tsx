import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { LocationDto } from '@/models/Api';
import { updateLocationDataRequest } from '@/models/location/action/update-location-request';
import { UpdateLocationFormModel } from '@/models/location/type';
import { UpdateLocationFormData } from '@/validation/default-values/location/update-location-form-data';
import { updateLocationSchema } from '@/validation/schemas/location/updateLocationSchema';

type UseInitEditLocationsDialogModel = {
  rowData: LocationDto;
  token: string;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function useInitEditLocationsDialog({
  rowData,
  token,
  setOpenChangeDialog,
}: UseInitEditLocationsDialogModel) {
  const queryClient = useQueryClient();
  const [isPending, startTransaction] = useTransition();

  const form = useForm<UpdateLocationFormModel>({
    defaultValues: UpdateLocationFormData(rowData),
    resolver: yupResolver<UpdateLocationFormModel>(updateLocationSchema),
  });

  const onValidSubmit = (formModel: UpdateLocationFormModel) => {
    startTransaction(async () => {
      const updateResponse = await updateLocationDataRequest(formModel, token);
      if (updateResponse.status === 200 || updateResponse.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['locations'] });
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
    if (!form.getValues().Helpers.inEdit) form.reset(UpdateLocationFormData(rowData));
  }, [form.getValues().Helpers.inEdit]);

  return useMemo(
    () => ({ form, isPending, onInvalidSubmit, onValidSubmit }),
    [form, isPending, onInvalidSubmit, onValidSubmit]
  );
}
