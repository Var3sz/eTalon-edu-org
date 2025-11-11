import { ActiveCourseDto } from '@/models/Api';
import { useMemo } from 'react';
import useGetActiveCoursesQuery from '../courses/use-get-active-courses-query';

export default function useInitPaymentsTableClient(token: string) {
  const { data: coursesDataResponse } = useGetActiveCoursesQuery(token);

  const courses: ActiveCourseDto[] | [] =
    coursesDataResponse.status === 200 && coursesDataResponse.data.length > 0 ? coursesDataResponse.data : [];

  return useMemo(() => ({ courses }), [courses]);
}
