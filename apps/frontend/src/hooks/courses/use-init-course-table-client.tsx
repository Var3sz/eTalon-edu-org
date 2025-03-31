import { useMemo } from 'react';

import useGetActiveCoursesQuery from '@/hooks/courses/use-get-active-courses-query';
import { CoursesDTO } from '@/models/Api';

export default function useInitCourseTableClient() {
  const { data: coursesDataResponse } = useGetActiveCoursesQuery();

  const courses: CoursesDTO[] | [] =
    coursesDataResponse.status === 200 && coursesDataResponse.data.length > 0 ? coursesDataResponse.data : [];

  return useMemo(() => ({ courses }), [courses]);
}
