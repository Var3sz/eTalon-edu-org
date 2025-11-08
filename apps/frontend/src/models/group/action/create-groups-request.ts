'use server';

import { GroupDto, UpdateGroupsInputDto } from '@/models/Api';
import { AddGroupsFormModel } from '../types';
import { UpdateGroupData } from '@/api/models/serviceEndpoints/helpers';

const parseGroupData = (formModel: AddGroupsFormModel): UpdateGroupsInputDto[] => {
  return formModel.GroupList.map((group) => {
    return {
      id: null,
      description: group.description!,
    };
  });
};

export const CreateGroupsRequest = async (formModel: AddGroupsFormModel, token: string) => {
  const parsedBody = parseGroupData(formModel);

  return await UpdateGroupData<UpdateGroupsInputDto[], GroupDto[]>(parsedBody, token);
};
