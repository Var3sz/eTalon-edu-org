import * as yup from 'yup';

import {
  BooleanField,
  NullableNumberField,
  RequiredDateField,
  RequiredNumberField,
  RequiredStringField,
} from '@/validation/validation-elements';

export const updateCourseSchema = yup.object().shape({
  id: RequiredNumberField,
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
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
