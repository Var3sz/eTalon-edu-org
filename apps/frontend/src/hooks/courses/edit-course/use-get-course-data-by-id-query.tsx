'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { GetCourseById } from '@/api/models/serviceEndpoints/course';
import { CourseDto } from '@/models/Api';

export function useGetCourseDataByIdQuery(courseId: string, token: string) {
  return useSuspenseQuery({
    queryKey: ['course', { id: courseId }],
    queryFn: () => GetCourseById<CourseDto>(courseId, token),
    staleTime: 60 * 60 * 1000,
  });
}
