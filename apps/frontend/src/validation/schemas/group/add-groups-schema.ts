import { RequiredStringField, BooleanField } from '@/validation/validation-elements';
import * as yup from 'yup';

const AddGroupSchema = yup.object().shape({
  description: RequiredStringField,
});

export const AddGroupsSchema = yup.object().shape({
  GroupList: yup.array().of(AddGroupSchema).defined(),
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
