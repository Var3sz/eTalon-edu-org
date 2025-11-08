'use server';

import { UpdateLocationData } from '@/api/models/serviceEndpoints/helpers';
import { LocationDto, UpdateLocationsInputDto } from '@/models/Api';

import { AddLocationsFormModel } from '../type';

const parseLocationData = (formModel: AddLocationsFormModel): UpdateLocationsInputDto[] => {
  return formModel.LocationList.map((location) => {
    return {
      id: null,
      description: location.description!,
      isDeleted: location.isDeleted!,
    };
  });
};

export const CreateLocationsRequest = async (formModel: AddLocationsFormModel, token: string) => {
  const parsedBody = parseLocationData(formModel);

  return await UpdateLocationData<UpdateLocationsInputDto[], LocationDto[]>(parsedBody, token);
};
