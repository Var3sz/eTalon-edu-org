export type CourseDateFormModel = {
  id: number | null;
  date: Date | null;
  description: string | null;
};

export type EditCourseDatesFormModel = {
  CourseDates: CourseDateFormModel[];
};

export type UpdateCoursesFormModel = {
  id: number | null;
  courseId: string | null;
  description: string | null;
  price: number | null;
  active: boolean;
  endTime: string | null;
  groupId: number | null;
  headCount: number | null;
  locationId: number | null;
  maxHeadcount: number | null;
  startDate: Date | null;
  startTime: string | null;
  locked: boolean;
};

export type UpdateCourseListModel = {
  CourseList: UpdateCoursesFormModel[];
  Helpers: {
    inEdit: boolean;
  };
};
