import * as yup from 'yup';

import { BooleanField, RequiredStringField } from '@/validation/validation-elements';

const AddGroupSchema = yup.object().shape({
  description: RequiredStringField,
  isDeleted: RequiredStringField,
});

export const AddGroupsSchema = yup.object().shape({
  GroupList: yup.array().of(AddGroupSchema).defined(),
  Helpers: yup.object().shape({
    inEdit: BooleanField,
  }),
});
