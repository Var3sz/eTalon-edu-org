import { convertStringToDate } from '@/lib/utils';
import { CourseDto } from '@/models/Api';
import { UpdateCourseFormModel } from '@/models/course/types';

export const UpdateCourseFormData = (courseData: CourseDto): UpdateCourseFormModel => {
  return {
    id: courseData.id,
    courseId: courseData.courseId,
    description: courseData.description,
    active: courseData.active,
    endTime: courseData.endTime,
    groupId: courseData.groupId,
    headcount: courseData.headcount ?? 0,
    locationId: courseData.locationId,
    maxHeadCount: courseData.maxHeadCount,
    startDate: convertStringToDate(courseData.startDate),
    startTime: courseData.startTime,
    locked: courseData.locked,
    Helpers: {
      inEdit: false,
    },
  };
};
