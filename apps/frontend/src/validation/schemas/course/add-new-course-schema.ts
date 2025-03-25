import { object, ObjectSchema } from 'yup';
import * as yup from 'yup';

import { AddNewCourseModel } from '@/models/course/types';
import { BooleanField, RequiredNumberField, RequiredStringField } from '@/validation/validation-elements';

const PackageCodeSchema = yup.array().of(RequiredStringField).required();

export const AddNewCourseSchema: ObjectSchema<AddNewCourseModel> = object({
  group: RequiredStringField,
  active: BooleanField,
  packageCodes: PackageCodeSchema,
  courseId: RequiredStringField,
  description: RequiredStringField,
  location: RequiredStringField,
  unitPrice: RequiredNumberField,
});
