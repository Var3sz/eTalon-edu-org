import { QueryClient } from '@tanstack/react-query';

import { GetCourseDatesByCourseId } from '@/api/models/serviceEndpoints/course';
import { LessonDateDto } from '@/models/Api';

export const prefetchCourseDatesDataByIdQuery = async (client: QueryClient, courseId: string, token: string) => {
  await client.prefetchQuery({
    queryKey: ['course-dates', { id: courseId }],
    queryFn: () => GetCourseDatesByCourseId<LessonDateDto[]>(courseId, token),
  });
};
