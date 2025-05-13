import { toast } from '@/components/ui/use-toast';
import { CreateCoursesRequest } from '@/models/course/action/create-courses-action';
import { CreateCoursesFormModel } from '@/models/course/types';
import { CreateCoursesFormDefault } from '@/validation/default-values/course/create-courses-form.default';
import { CreateCoursesSchema } from '@/validation/schemas/course/create-courses-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

type UseInitCreateCoursesDialogProps = {
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function useInitCreateCoursesDialog({ setOpenChangeDialog }: UseInitCreateCoursesDialogProps) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm<CreateCoursesFormModel>({
    defaultValues: CreateCoursesFormDefault(),
    resolver: yupResolver<CreateCoursesFormModel>(CreateCoursesSchema),
  });

  const onValidSubmit = (formModel: CreateCoursesFormModel) => {
    startTransaction(async () => {
      const createResponse = await CreateCoursesRequest(formModel);
      if (createResponse.status === 200 || createResponse.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['courses'] });
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
