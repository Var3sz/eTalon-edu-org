'use client';

import { GetCourseById } from '@/api/models/serviceEndpoints/course';
import { CourseDto } from '@/models/Api';
import { useSuspenseQuery } from '@tanstack/react-query';

export function useGetCourseDataByIdQuery(courseId: string) {
  return useSuspenseQuery({
    queryKey: ['course', { id: courseId }],
    queryFn: () => GetCourseById<CourseDto>(courseId),
  });
}
