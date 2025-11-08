'use server';

import { UpdateLocationData } from '@/api/models/serviceEndpoints/helpers';
import { LocationDto, UpdateLocationsInputDto } from '@/models/Api';

import { UpdateLocationFormModel } from '../type';

const parseLocationData = (formModel: UpdateLocationFormModel): UpdateLocationsInputDto[] => {
  return [
    {
      id: formModel.id!,
      description: formModel.description,
      isDeleted: formModel.isDeleted,
    },
  ];
};

export const updateLocationDataRequest = async (formModel: UpdateLocationFormModel, token: string) => {
  const parsedBody = parseLocationData(formModel);
  return await UpdateLocationData<UpdateLocationsInputDto[], LocationDto[]>(parsedBody, token);
};
