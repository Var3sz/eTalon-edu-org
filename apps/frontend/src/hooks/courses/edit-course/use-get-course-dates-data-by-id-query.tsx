import { GetCourseDatesByCourseId } from '@/api/models/serviceEndpoints/course';
import { LessonDateDto } from '@/models/Api';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export function useGetCourseDatesDataByIdQuery(courseId: string) {
  return useQuery({
    queryKey: ['course-dates', { id: courseId }],
    queryFn: () => GetCourseDatesByCourseId<LessonDateDto[]>(courseId),
  });
}
