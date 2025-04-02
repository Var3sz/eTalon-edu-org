import { QueryClient } from '@tanstack/react-query';

import { GetCoursesForModification } from '@/api/models/serviceEndpoints/course';
import { RawCourseDTO } from '@/models/Api';

export const prefetchCoursesForModificationQuery = async (client: QueryClient) => {
  await client.prefetchQuery({
    queryKey: ['courses-for-modification'],
    queryFn: () => GetCoursesForModification<RawCourseDTO[]>(),
  });
};
