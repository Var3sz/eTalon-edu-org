import * as yup from 'yup';

import { BooleanField, RequiredStringField } from '@/validation/validation-elements';

const AddLocationSchema = yup.object().shape({
  description: RequiredStringField,
  isDeleted: RequiredStringField,
});

export const AddLocationsSchema = yup.object().shape({
  LocationList: yup.array().of(AddLocationSchema).defined(),
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
