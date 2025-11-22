import { UpdateCourseStatus } from '../../../api/models/serviceEndpoints/main';
import { CourseDto, UpdateCourseDto } from '../types';

export const UpdateCourseStatusRequest = async (courseData: UpdateCourseDto, courseId: number, token: string) => {
  return await UpdateCourseStatus<UpdateCourseDto, CourseDto>(courseData, courseId, token);
};
