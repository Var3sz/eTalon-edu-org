'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { RawPackageDto } from '@/models/Api';
import { UpdatePackageDataRequest } from '@/models/package/action/update-package-data-action';
import { UpdatePackageFormModel } from '@/models/package/types';
import { UpdatePackageFormData } from '@/validation/default-values/package/update-package-form-data';
import { updatePackageSchema } from '@/validation/schemas/package/update-package-schema';

export default function useInitEditPackageClientFormBase(packageId: string, packageData: RawPackageDto, token: string) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm<UpdatePackageFormModel>({
    resolver: yupResolver<UpdatePackageFormModel>(updatePackageSchema),
    defaultValues: UpdatePackageFormData(packageData),
  });

  const onValidFormSubmit = (formModel: UpdatePackageFormModel) => {
    startTransaction(async () => {
      const updateResponse = await UpdatePackageDataRequest(formModel, token);
      if (updateResponse.status === 200) {
        await queryClient.invalidateQueries({ queryKey: ['package', { id: packageId }] });
        toast({
          variant: 'success',
          title: 'Sikeres frissítés!',
          description: 'Csomag frissítése sikeres!',
        });
        form.setValue('Helpers.inEdit', false);
      } else {
        toast({
          title: 'Sikertelen frissítés!',
          description: updateResponse.status === 500 && updateResponse.error.Message,
          variant: 'destructive',
        });
      }
    });
  };

  const onInvalidFormSubmit = (e: any) => {
    console.error(e);
    toast({
      title: 'Hibás adatok!',
      description: 'Hiba történt a validáció során!',
      variant: 'destructive',
    });
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'details');
    window.history.replaceState(null, '', url.toString());
  }, []);

  useEffect(() => {
    if (!form.getValues().Helpers.inEdit) form.reset(UpdatePackageFormData(packageData));
  }, [form.getValues().Helpers.inEdit]);

  return useMemo(
    () => ({ form, isPending, onValidFormSubmit, onInvalidFormSubmit }),
    [form, isPending, onValidFormSubmit, onInvalidFormSubmit]
  );
}
