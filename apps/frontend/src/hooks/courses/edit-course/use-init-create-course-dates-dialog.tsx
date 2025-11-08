import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { CreateCourseDatesRequest } from '@/models/course/action/create-course-dates-action';
import { CreateCourseDatesFormModel } from '@/models/course/types';
import { CreateCourseDatesFormDefault } from '@/validation/default-values/course/create-course-dates-form-default';
import { CreateCourseDatesFormSchema } from '@/validation/schemas/course/create-course-dates-schema';

type UseInitCreateCourseDatesDialogProps = {
  courseId: string;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function useInitCreateCourseDatesDialog({
  courseId,
  setOpenChangeDialog,
  token,
}: UseInitCreateCourseDatesDialogProps) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm<CreateCourseDatesFormModel>({
    defaultValues: CreateCourseDatesFormDefault(),
    resolver: yupResolver<CreateCourseDatesFormModel>(CreateCourseDatesFormSchema),
  });

  const onValidSubmit = (formModel: CreateCourseDatesFormModel) => {
    startTransaction(async () => {
      const createResponse = await CreateCourseDatesRequest(courseId, formModel, token);
      if (createResponse.status === 200 || createResponse.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['course-dates', { id: courseId }] });
        toast({
          title: 'Sikeres létrehozás!',
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
