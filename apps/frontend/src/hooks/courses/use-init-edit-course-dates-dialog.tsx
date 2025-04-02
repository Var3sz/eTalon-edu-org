import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { updateCourseDatesRequest } from '@/models/course/action/update-course-dates-action';
import { EditCourseDatesFormModel } from '@/models/course/types';
import { editCourseDatesSchema } from '@/validation/schemas/course/edit-couse-dates-schema';

type UseInitEditCourseDatesDialogProps = {
  courseId: number;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function useInitEditCourseDatesDialog({
  courseId,
  setOpenChangeDialog,
}: UseInitEditCourseDatesDialogProps) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm<EditCourseDatesFormModel>({
    defaultValues: { CourseDates: [{ id: null, date: null, description: null }] },
    resolver: yupResolver<EditCourseDatesFormModel>(editCourseDatesSchema),
  });

  const onValidFormSubmit = async (formModel: EditCourseDatesFormModel) => {
    startTransaction(async () => {
      const response = await updateCourseDatesRequest(courseId, formModel);
      if (response.status === 200 || response.status === 201) {
        await queryClient.invalidateQueries({ queryKey: ['active-courses'] });
        toast({ variant: 'success', title: 'Dátumok létrehozása sikeres volt!' });
        setOpenChangeDialog && setOpenChangeDialog(false);
      } else {
        toast({
          title: 'Sikertelen létrehozás!',
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

  return useMemo(
    () => ({ form, isPending, onValidFormSubmit, onInvalidFormSubmit }),
    [form, isPending, onValidFormSubmit, onInvalidFormSubmit]
  );
}
