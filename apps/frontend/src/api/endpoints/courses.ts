'use server';

import { getRequest } from '@/api/api-methods';

export async function GetCurrentCourses<ResponseType>() {
  return await getRequest<ResponseType>('http://localhost:3001/courses');
}

export async function GetCourseDetailsById<ResponseType>(courseId: string) {
  return await getRequest<ResponseType>(`http://localhost:3001/students/GetStudentsByCourseId/${courseId}`);
}
