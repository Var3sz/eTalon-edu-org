export type AddNewCourseModel = {
  group: string | null;
  active: boolean;
  packageCodes: string[] | [];
  courseId: string | null;
  description: string | null;
  location: string | null;
  unitPrice: number | null;
};
