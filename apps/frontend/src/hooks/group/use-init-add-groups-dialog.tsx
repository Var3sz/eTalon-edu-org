import { toast } from '@/components/ui/use-toast';
import { CreateGroupsRequest } from '@/models/group/action/create-groups-request';
import { AddGroupsFormModel } from '@/models/group/types';
import { AddGroupsFormDefault } from '@/validation/default-values/group/add-groups-form-default';
import { AddGroupsSchema } from '@/validation/schemas/group/add-groups-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

type UseInitAddGroupsDialogModel = {
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function useInitAddGroupsDialog({ token, setOpenChangeDialog }: UseInitAddGroupsDialogModel) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm<AddGroupsFormModel>({
    defaultValues: AddGroupsFormDefault(),
    resolver: yupResolver<AddGroupsFormModel>(AddGroupsSchema),
  });

  const onValidSubmit = (formModel: AddGroupsFormModel) => {
    startTransaction(async () => {
      const createResponse = await CreateGroupsRequest(formModel, token);
      if (createResponse.status === 200 || createResponse.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['groups'] });
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
