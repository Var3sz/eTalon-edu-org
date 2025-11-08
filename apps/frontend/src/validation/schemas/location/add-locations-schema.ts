import { RequiredStringField, BooleanField } from '@/validation/validation-elements';
import * as yup from 'yup';

const AddLocationSchema = yup.object().shape({
  description: RequiredStringField,
});

export const AddLocationsSchema = yup.object().shape({
  LocationList: yup.array().of(AddLocationSchema).defined(),
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
