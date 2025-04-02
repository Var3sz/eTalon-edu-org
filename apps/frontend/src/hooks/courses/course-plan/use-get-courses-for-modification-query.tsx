import { useSuspenseQuery } from '@tanstack/react-query';

import { GetCoursesForModification } from '@/api/models/serviceEndpoints/course';
import { RawCourseDTO } from '@/models/Api';

export default function useGetCoursesForModificationQuery() {
  const { data: coursesResponse } = useSuspenseQuery({
    queryKey: ['courses-for-modification'],
    queryFn: () => GetCoursesForModification<RawCourseDTO[]>(),
  });

  if (coursesResponse.status === 200) {
    return coursesResponse.data;
  }
}
