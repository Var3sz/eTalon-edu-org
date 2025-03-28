import { QueryClient } from '@tanstack/react-query';

import { GetAllCourses } from '@/api/models/serviceEndpoints/course';
import { CoursesDTO } from '@/models/Api';

export const prefetchAllCoursesQuery = async (client: QueryClient) => {
  await client.prefetchQuery({ queryKey: ['courses'], queryFn: () => GetAllCourses<CoursesDTO[]>() });
};
