import * as yup from 'yup';

import { BooleanField, RequiredNumberField, RequiredStringField } from '@/validation/validation-elements';

const CreatePackageSchema = yup.object().shape({
  packageId: RequiredStringField,
  price: RequiredNumberField,
  type: RequiredStringField,
  locationId: RequiredNumberField,
  groupId: RequiredNumberField,
  active: BooleanField,
});

export const CreatePackagesSchema = yup.object().shape({
  PackageList: yup.array().of(CreatePackageSchema).defined(),
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
