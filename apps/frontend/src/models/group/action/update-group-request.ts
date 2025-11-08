'use server';

import { GroupDto, UpdateGroupsInputDto } from '@/models/Api';
import { UpdateGroupFormModel } from '../types';
import { UpdateGroupData } from '@/api/models/serviceEndpoints/helpers';

const parseGroupData = (formModel: UpdateGroupFormModel): UpdateGroupsInputDto[] => {
  return [{ id: formModel.id, description: formModel.description }];
};

export const updateGroupDataRequest = async (formModel: UpdateGroupFormModel, token: string) => {
  const parsedBody = parseGroupData(formModel);
  return await UpdateGroupData<UpdateGroupsInputDto[], GroupDto[]>(parsedBody, token);
};
