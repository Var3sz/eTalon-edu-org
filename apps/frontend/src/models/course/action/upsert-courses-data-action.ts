'use server';

import { UpsertCoursesData } from '@/api/models/serviceEndpoints/course';
import { parseDateToISO } from '@/lib/utils';
import { SaveResultDto, UpsertCourseDTO } from '@/models/Api';
import { UpdateCourseListModel } from '@/models/course/types';

const parseUpsertCoursesData = (formModel: UpdateCourseListModel): UpsertCourseDTO[] => {
  return formModel.CourseList.map((course) => {
    return {
      id: course.id,
      courseId: course.courseId!,
      description: course.description!,
      startDate: parseDateToISO(course.startDate)!,
      startTime: course.startTime!,
      endTime: course.endTime!,
      locked: course.locked!,
      locationId: course.locationId!,
      groupId: course.groupId!,
      headCount: course.headCount,
      maxHeadcount: course.maxHeadcount!,
      active: course.active!,
      price: course.price,
    };
  });
};

export const upsertCoursesDataAction = async (formModel: UpdateCourseListModel) => {
  const parsedBody = parseUpsertCoursesData(formModel);
  console.log(parsedBody);
  return await UpsertCoursesData<UpsertCourseDTO[], SaveResultDto>(parsedBody);
};
