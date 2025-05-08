import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from '@/components/ui/use-toast';
import { upsertCoursesDataAction } from '@/models/course/action/upsert-courses-data-action';
import { UpdateCourseListModel } from '@/models/course/types';
import {
  UpdateCoursesDataFormData,
  UpdateCoursesDataFormDefault,
} from '@/validation/default-values/course/update-courses-data-form-default';
import { UpdateStudentDetailsFormDefault } from '@/validation/default-values/student/update-student-details-form-default';
import { updateCoursesDataSchema } from '@/validation/schemas/course/update-courses-data-schema';
import { CourseDto } from '@/models/Api';

type UseInitCoursePlanDataProps = {
  coursesData: CourseDto[];
};

export default function useInitCoursePlanData({ coursesData }: UseInitCoursePlanDataProps) {}
