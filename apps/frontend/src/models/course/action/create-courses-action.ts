import { UpdateCourseDto } from '@/models/Api';
import { CreateCoursesFormModel } from '../types';
import { CreateCourses } from '@/api/models/serviceEndpoints/course';
import { parseDateToISO } from '@/lib/utils';

const parseCreateBody = (formModel: CreateCoursesFormModel): UpdateCourseDto[] => {
  const courses = formModel.CourseList.map((c) => {
    return {
      description: c.description!,
      courseId: c.courseId!,
      headcount: c.headcount,
      maxHeadCount: c.maxHeadCount!,
      startDate: parseDateToISO(c.startDate)!,
      startTime: c.startTime!,
      endTime: c.endTime!,
      active: c.active!,
      locked: c.locked!,
      groupId: c.groupId!,
      locationId: c.locationId!,
    };
  });
  return courses;
};

export const CreateCoursesRequest = async (formModel: CreateCoursesFormModel) => {
  const parsedBody = parseCreateBody(formModel);
  return await CreateCourses<UpdateCourseDto[], any>(parsedBody);
};
