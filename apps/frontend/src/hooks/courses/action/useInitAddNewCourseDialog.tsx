import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { AddNewCourseModel } from '@/models/course/types';
import { AddNewCourseFormDefault } from '@/validation/default-values/course/add-new-course-form-default';
import { AddNewCourseSchema } from '@/validation/schemas/course/add-new-course-schema';

export default function useInitAddNewCourseDialog() {
  const form = useForm<AddNewCourseModel>({
    resolver: yupResolver<AddNewCourseModel>(AddNewCourseSchema),
    defaultValues: AddNewCourseFormDefault(),
  });

  return useMemo(() => ({ form }), [form]);
}
