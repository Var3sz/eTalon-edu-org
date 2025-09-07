'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { GetCourseById } from '@/api/models/serviceEndpoints/course';
import { CourseDto } from '@/models/Api';

export function useGetCourseDataByIdQuery(courseId: string) {
  const { data: courseDataResponse } = useSuspenseQuery({
    queryKey: ['course', { id: courseId }],
    queryFn: () => GetCourseById<CourseDto>(courseId),
    staleTime: 60_000,
  });

  if (courseDataResponse.status === 200) {
    return courseDataResponse.data;
  }
}
