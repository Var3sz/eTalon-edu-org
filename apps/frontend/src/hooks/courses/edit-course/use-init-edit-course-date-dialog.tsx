import { toast } from '@/components/ui/use-toast';
import { LessonDateDto } from '@/models/Api';
import { UpdateCourseDateRequest } from '@/models/course/action/update-course-date-action';
import { UpdateCourseDateFormModel } from '@/models/course/types';
import { UpdateCourseDateData } from '@/validation/default-values/course/update-course-date-data';
import { courseDateSchema } from '@/validation/schemas/course/edit-couse-date-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useEffect, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

type UseInitEditCourseDateDialogProps = {
  courseId: string;
  rowData: LessonDateDto;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function useInitEditCourseDateDialog({
  courseId,
  rowData,
  setOpenChangeDialog,
}: UseInitEditCourseDateDialogProps) {
  const queryClient = useQueryClient();
  const [isPending, startTransaction] = useTransition();

  const form = useForm<UpdateCourseDateFormModel>({
    defaultValues: UpdateCourseDateData(rowData),
    resolver: yupResolver<UpdateCourseDateFormModel>(courseDateSchema),
  });

  const onValidSubmit = (formModel: UpdateCourseDateFormModel) => {
    startTransaction(async () => {
      const updateResponse = await UpdateCourseDateRequest(formModel);
      if (updateResponse.status === 200 || updateResponse.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['course-dates', { id: courseId }] });
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
    if (!form.getValues().Helpers.inEdit) form.reset(UpdateCourseDateData(rowData));
  }, [form.getValues().Helpers.inEdit]);

  return useMemo(
    () => ({ form, isPending, onInvalidSubmit, onValidSubmit }),
    [form, isPending, onInvalidSubmit, onValidSubmit]
  );
}
