'use server';

import { UpdateGroupData } from '@/api/models/serviceEndpoints/helpers';
import { GroupDto, UpdateGroupsInputDto } from '@/models/Api';

import { UpdateGroupFormModel } from '../types';

const parseGroupData = (formModel: UpdateGroupFormModel): UpdateGroupsInputDto[] => {
  return [
    {
      id: formModel.id,
      description: formModel.description,
      isDeleted: formModel.isDeleted,
    },
  ];
};

export const updateGroupDataRequest = async (formModel: UpdateGroupFormModel, token: string) => {
  const parsedBody = parseGroupData(formModel);
  return await UpdateGroupData<UpdateGroupsInputDto[], GroupDto[]>(parsedBody, token);
};
