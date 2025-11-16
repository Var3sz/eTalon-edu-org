import * as yup from 'yup';

import {
  BooleanField,
  NullableNumberField,
  RequiredDateField,
  RequiredNumberField,
  RequiredStringField,
} from '@/validation/validation-elements';

export const updatePackageSchema = yup.object().shape({
  id: RequiredNumberField,
  active: BooleanField,
  groupId: RequiredNumberField,
  locationId: RequiredNumberField,
  type: RequiredStringField,
  packageId: RequiredStringField,
  price: RequiredNumberField,
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
