import * as yup from 'yup';

import {
  BooleanField,
  NullableNumberField,
  RequiredDateField,
  RequiredNumberField,
  RequiredStringField,
} from '@/validation/validation-elements';

const CreateCourseSchema = yup.object().shape({
  description: RequiredStringField,
  courseId: RequiredStringField,
  headcount: NullableNumberField,
  maxHeadCount: RequiredNumberField,
  startDate: RequiredDateField,
  startTime: RequiredStringField,
  endTime: RequiredStringField,
  active: BooleanField,
  locked: BooleanField,
  groupId: RequiredNumberField,
  locationId: RequiredNumberField,
});

export const CreateCoursesSchema = yup.object().shape({
  CourseList: yup.array().of(CreateCourseSchema).defined(),
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
