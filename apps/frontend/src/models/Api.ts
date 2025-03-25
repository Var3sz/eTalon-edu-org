export interface CourseEntity {
  id: number;
  group: object;
  status: object;
  courseId: string;
  description: string;
  location: object;
  price: number;
  headCount: number;
  maxHeadCount: number;
}

export interface StudentEntity {
  id: number;
  sapId: number;
  parentMail: string;
  name: string;
  parentName: string;
  parentMobile: string;
  courseId: string;
}
