import { useQuery } from '@tanstack/react-query';

import { GetCourseDatesByCourseId } from '@/api/models/serviceEndpoints/course';
import { LessonDateDto } from '@/models/Api';

export function useGetCourseDatesDataByIdQuery(courseId: string) {
  return useQuery({
    queryKey: ['course-dates', { id: courseId }],
    queryFn: () => GetCourseDatesByCourseId<LessonDateDto[]>(courseId),
  });
}
