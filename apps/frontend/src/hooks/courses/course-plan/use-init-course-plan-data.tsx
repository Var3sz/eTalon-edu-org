import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { RawCourseDTO } from '@/models/Api';
import { upsertCoursesDataAction } from '@/models/course/action/upsert-courses-data-action';
import { UpdateCourseListModel } from '@/models/course/types';
import {
  UpdateCoursesDataFormData,
  UpdateCoursesDataFormDefault,
} from '@/validation/default-values/course/update-courses-data-form-default';
import { UpdateStudentDetailsFormDefault } from '@/validation/default-values/student/update-student-details-form-default';
import { updateCoursesDataSchema } from '@/validation/schemas/course/update-courses-data-schema';

type UseInitCoursePlanDataProps = {
  coursesData: RawCourseDTO[];
};

export default function useInitCoursePlanData({ coursesData }: UseInitCoursePlanDataProps) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm<UpdateCourseListModel>({
    defaultValues: coursesData.length > 0 ? UpdateCoursesDataFormData(coursesData) : UpdateCoursesDataFormDefault(),
    resolver: yupResolver<UpdateCourseListModel>(updateCoursesDataSchema),
  });

  const onValidFormSubmit = async (formModel: UpdateCourseListModel) => {
    startTransaction(async () => {
      const upsertResponse = await upsertCoursesDataAction(formModel);
      if (upsertResponse.status === 200 && upsertResponse.data.saved) {
        await queryClient.invalidateQueries({ queryKey: ['courses-for-modification'] });
        toast({ variant: 'success', title: upsertResponse.data.title, description: upsertResponse.data.description });
        form.setValue('Helpers.inEdit', false);
      } else {
        toast({
          title: 'Sikertelen létrehozás!',
          description: upsertResponse.status === 500 && upsertResponse.error.Message,
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
    if (!form.getValues().Helpers.inEdit) form.reset(UpdateCoursesDataFormData(coursesData));
  }, [form.getValues().Helpers.inEdit]);

  return useMemo(
    () => ({ form, isPending, onValidFormSubmit, onInvalidFormSubmit }),
    [form, isPending, onValidFormSubmit, onInvalidFormSubmit]
  );
}
