export type Course = {
  id: number;
  courseId: string;
  occupancy: number;
  description: string;
  headcount: number;
  maxHeadcount: number;
  price: number;
  groupDescription: string;
  locked: boolean;
};

export type Student = {
  name: string;
};

export type AddNewCourseModel = {
  group: string | null;
  active: boolean;
  packageCodes: string[] | [];
  courseId: string | null;
  description: string | null;
  location: string | null;
  unitPrice: number | null;
};
