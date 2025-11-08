import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { GetCourseDatesByCourseId } from '@/api/models/serviceEndpoints/course';
import { LessonDateDto } from '@/models/Api';

export function useGetCourseDatesDataByIdQuery(courseId: string, token: string) {
  return useSuspenseQuery({
    queryKey: ['course-dates', { id: courseId }],
    queryFn: () => GetCourseDatesByCourseId<LessonDateDto[]>(courseId, token),
    staleTime: 60 * 60 * 1000,
  });
}
