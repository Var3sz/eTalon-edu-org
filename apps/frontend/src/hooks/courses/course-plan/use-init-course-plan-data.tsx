import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { RawCourseDTO } from '@/models/Api';
import { UpdateCourseListModel } from '@/models/course/types';
import {
  UpdateCoursesDataFormData,
  UpdateCoursesDataFormDefault,
} from '@/validation/default-values/course/update-courses-data-form-default';
import { updateCoursesDataSchema } from '@/validation/schemas/course/update-courses-data-schema';

type UseInitCoursePlanDataProps = {
  coursesData: RawCourseDTO[];
};

export default function useInitCoursePlanData({ coursesData }: UseInitCoursePlanDataProps) {
  const form = useForm<UpdateCourseListModel>({
    defaultValues: coursesData.length > 0 ? UpdateCoursesDataFormData(coursesData) : UpdateCoursesDataFormDefault(),
    resolver: yupResolver<UpdateCourseListModel>(updateCoursesDataSchema),
  });

  const onValidFormSubmit = () => {};
  const onInvalidFormSubmit = () => {};

  return useMemo(
    () => ({ form, onValidFormSubmit, onInvalidFormSubmit }),
    [form, onValidFormSubmit, onInvalidFormSubmit]
  );
}
