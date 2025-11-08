import { toast } from '@/components/ui/use-toast';
import { GroupDto } from '@/models/Api';
import { updateGroupDataRequest } from '@/models/group/action/update-group-request';
import { UpdateGroupFormModel } from '@/models/group/types';
import { UpdateGroupFormData } from '@/validation/default-values/group/update-group-form-data';
import { updateGroupSchema } from '@/validation/schemas/group/updateGroupSchema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

type UseInitEditGroupDialogModel = {
  rowData: GroupDto;
  token: string;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function useInitEditGroupDialog({ rowData, token, setOpenChangeDialog }: UseInitEditGroupDialogModel) {
  const queryClient = useQueryClient();
  const [isPending, startTransaction] = useTransition();

  const form = useForm<UpdateGroupFormModel>({
    defaultValues: UpdateGroupFormData(rowData),
    resolver: yupResolver<UpdateGroupFormModel>(updateGroupSchema),
  });

  const onValidSubmit = (formModel: UpdateGroupFormModel) => {
    startTransaction(async () => {
      const updateResponse = await updateGroupDataRequest(formModel, token);
      if (updateResponse.status === 200 || updateResponse.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['groups'] });
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
    if (!form.getValues().Helpers.inEdit) form.reset(UpdateGroupFormData(rowData));
  }, [form.getValues().Helpers.inEdit]);

  return useMemo(
    () => ({ form, isPending, onInvalidSubmit, onValidSubmit }),
    [form, isPending, onInvalidSubmit, onValidSubmit]
  );
}
