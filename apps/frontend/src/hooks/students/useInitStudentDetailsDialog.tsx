'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { StudentDetailsDTO } from '@next-nest-template/backend/dist/student/entities/student.entity';
import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, SetStateAction, TransitionStartFunction, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { UpdateStudentDetailsAction } from '@/models/students/action/UpdateStudentDetailsAction';
import { UpdateStudentDetailsFormDefault } from '@/validation/default-values/student/update-student-details-form-default';
import { updateStudentDetailsSchema } from '@/validation/schemas/student/update-student-details-schema';
import { UpdateStudentDetailsFormModel } from '@/models/students/types';

type UseInitStudentDetailsDialogProps = {
  studentData: StudentDetailsDTO;
  startTransaction: TransitionStartFunction;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function useInitStudentDetailsDialog({
  studentData,
  startTransaction,
  setOpenChangeDialog,
}: UseInitStudentDetailsDialogProps) {
  const queryClient = useQueryClient();

  const form = useForm<UpdateStudentDetailsFormModel>({
    defaultValues: UpdateStudentDetailsFormDefault(studentData),
    resolver: yupResolver<UpdateStudentDetailsFormModel>(updateStudentDetailsSchema),
  });

  const onValidFormSubmit = (formModel: UpdateStudentDetailsFormModel) => {
    startTransaction(async () => {
      const updateResponse = await UpdateStudentDetailsAction(studentData.id, formModel);
      if (updateResponse.status === 200) {
        await queryClient.invalidateQueries({ queryKey: ['students-by-course-id', studentData.courseId] });
        toast({ variant: 'success', title: 'Sikeres frissítés!' });
        setOpenChangeDialog && setOpenChangeDialog(false);
      } else {
        toast({
          variant: 'destructive',
          title: 'Sikertelen frissítés!',
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
    if (!form.getValues().Helpers.inEdit) form.reset(UpdateStudentDetailsFormDefault(studentData));
  }, [form.getValues().Helpers.inEdit]);

  return useMemo(
    () => ({
      form,
      studentData,
      onValidFormSubmit,
      onInvalidFormSubmit,
    }),
    [form, studentData, onValidFormSubmit, onInvalidFormSubmit]
  );
}
