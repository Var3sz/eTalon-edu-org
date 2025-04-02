import * as yup from 'yup';

import {
  BooleanField,
  NullableNumberField,
  RequiredDateField,
  RequiredNumberField,
  RequiredStringField,
} from '@/validation/validation-elements';

const courseDataSchema = yup.array().of(
  yup.object().shape({
    id: NullableNumberField,
    courseId: RequiredStringField,
    description: RequiredStringField,
    price: NullableNumberField,
    active: BooleanField,
    endTime: RequiredStringField,
    groupId: RequiredNumberField,
    headCount: NullableNumberField,
    locationId: RequiredNumberField,
    maxHeadcount: RequiredNumberField,
    startDate: RequiredDateField,
    startTime: RequiredStringField,
    locked: BooleanField,
  })
);

export const updateCoursesDataSchema = yup.object().shape({
  CourseList: courseDataSchema.defined(),
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
