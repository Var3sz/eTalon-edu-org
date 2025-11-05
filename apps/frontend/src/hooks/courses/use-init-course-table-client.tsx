import { useMemo } from 'react';

import useGetActiveCoursesQuery from '@/hooks/courses/use-get-active-courses-query';
import { ActiveCourseDto } from '@/models/Api';

export default function useInitCourseTableClient(token: string) {
  const { data: coursesDataResponse } = useGetActiveCoursesQuery(token);

  const courses: ActiveCourseDto[] | [] =
    coursesDataResponse.status === 200 && coursesDataResponse.data.length > 0 ? coursesDataResponse.data : [];

  return useMemo(() => ({ courses }), [courses]);
}
