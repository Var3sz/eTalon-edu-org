export type CourseDateFormModel = {
  id: number | null;
  date: Date | null;
  description: string | null;
};

export type EditCourseDatesFormModel = {
  CourseDates: CourseDateFormModel[];
};

export type UpdateCourseFormModel = {
  id: number | null;
  courseId: string | null;
  description: string | null;
  active: boolean;
  endTime: string | null;
  groupId: number | null;
  headcount: number | null;
  locationId: number | null;
  maxHeadCount: number | null;
  startDate: Date | null;
  startTime: string | null;
  locked: boolean;
  Helpers: {
    inEdit: boolean;
  };
};

/* 
export type UpdateCourseListModel = {
  CourseList: UpdateCoursesFormModel[];
  Helpers: {
    inEdit: boolean;
  };
}; */
