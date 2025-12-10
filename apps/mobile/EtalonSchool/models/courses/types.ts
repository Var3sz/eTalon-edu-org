export type CourseDto = {
  description: string;
  id: number;
  courseId: string;
  headcount: number | null;
  maxHeadCount: number;
  startDate: string;
  startTime: string;
  endTime: string;
  active: boolean;
  locked: boolean;
  groupId: number;
  locationId: number;
  group: string;
  location: string;
};

export type UpdateCourseDto = {
  description: string;
  courseId: string;
  headcount: number;
  nullable: boolean;
  maxHeadCount: number;
  startDate: string;
  startTime: string;
  endTime: string;
  active: boolean;
  locked: boolean;
  groupId: number;
  locationId: number;
};
