import { convertStringToDate } from '@/lib/utils';
import { RawCourseDTO } from '@/models/Api';
import { UpdateCourseListModel, UpdateCoursesFormModel } from '@/models/course/types';

export const UpdateCoursesDataFormDefault = (): UpdateCourseListModel => {
  return {
    CourseList: [
      {
        id: null,
        courseId: null,
        description: null,
        price: null,
        active: true,
        endTime: null,
        groupId: null,
        headCount: null,
        locationId: null,
        maxHeadcount: null,
        startDate: null,
        startTime: null,
        locked: false,
      },
    ],
    Helpers: {
      inEdit: false,
    },
  };
};
export const UpdateCoursesDataFormData = (coursesData: RawCourseDTO[]): UpdateCourseListModel => {
  return {
    CourseList: coursesData.map(
      (cd): UpdateCoursesFormModel => ({
        id: cd.id ?? null,
        courseId: cd.courseId ?? null,
        description: cd.description ?? null,
        price: cd.price ?? null,
        active: cd.active,
        endTime: cd.endTime ?? null,
        groupId: cd.groupId ?? null,
        headCount: cd.headcount ?? null,
        locationId: cd.locationId ?? null,
        maxHeadcount: cd.maxHeadcount ?? null,
        startDate: convertStringToDate(cd.startDate) ?? null,
        startTime: cd.startTime ?? null,
        locked: cd.locked,
      })
    ),
    Helpers: {
      inEdit: false,
    },
  };
};
