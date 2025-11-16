export type UpdateCourseDateFormModel = {
  id: number | null;
  date: Date | null;
  description: string | null;
  Helpers: {
    inEdit: boolean;
  };
};

export type UpdateInvoiceDateFormModel = {
  id: number | null;
  date: Date | null;
  description: string | null;
  Helpers: {
    inEdit: boolean;
  };
};

export type CreateCourseDateFormModel = {
  id: number | null;
  date: Date | null;
  description: string | null;
};

export type CreateCourseDatesFormModel = {
  CourseDateList: CreateCourseDateFormModel[];
  Helpers: {
    inEdit: boolean;
  };
};

export type CreateInvoiceDateFormModel = {
  id: number | null;
  date: Date | null;
  description: string | null;
};

export type CreateInvoiceDatesFormModel = {
  InvoiceDateList: CreateInvoiceDateFormModel[];
  Helpers: {
    inEdit: boolean;
  };
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

export type CreateCourseFormModel = {
  description: string | null;
  courseId: string | null;
  headcount: number | null;
  maxHeadCount: number | null;
  startDate: Date | null;
  startTime: string | null;
  endTime: string | null;
  active: boolean;
  locked: boolean;
  groupId: number | null;
  locationId: number | null;
};

export type CreateCoursesFormModel = {
  CourseList: CreateCourseFormModel[];
  Helpers: {
    inEdit: boolean;
  };
};
