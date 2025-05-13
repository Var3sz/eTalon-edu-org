'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { CourseDto } from '@/models/Api';
import { UpdateCourseDataRequest } from '@/models/course/action/update-course-data-action';
import { UpdateCourseFormModel } from '@/models/course/types';
import { UpdateCourseFormData } from '@/validation/default-values/course/update-course-form-data';
import { updateCourseSchema } from '@/validation/schemas/course/update-course-schema';

export default function useInitEditCourseClientFormBase(courseId: string, courseData: CourseDto) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const form = useForm<UpdateCourseFormModel>({
    resolver: yupResolver<UpdateCourseFormModel>(updateCourseSchema),
    defaultValues: UpdateCourseFormData(courseData),
  });

  const onValidFormSubmit = (formModel: UpdateCourseFormModel) => {
    startTransaction(async () => {
      const updateResponse = await UpdateCourseDataRequest(formModel);
      if (updateResponse.status === 200) {
        await queryClient.invalidateQueries({ queryKey: ['course', { id: courseId }] });
        toast({
          variant: 'success',
          title: 'Sikeres frissítés!',
          description: 'Kurzus frissítése sikeres!',
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
    if (!form.getValues().Helpers.inEdit) form.reset(UpdateCourseFormData(courseData));
  }, [form.getValues().Helpers.inEdit]);

  return useMemo(
    () => ({ form, isPending, onValidFormSubmit, onInvalidFormSubmit }),
    [form, isPending, onValidFormSubmit, onInvalidFormSubmit]
  );
}
