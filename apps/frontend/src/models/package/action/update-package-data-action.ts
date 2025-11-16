import { UpdatePackageData } from '@/api/models/serviceEndpoints/packages';
import { RawPackageDto, UpdatePackageDto } from '@/models/Api';

import { UpdatePackageFormModel } from '../types';

const parseUpdatePackageData = (formModel: UpdatePackageFormModel): UpdatePackageDto => {
  return {
    active: formModel.active,
    groupId: formModel.groupId!,
    locationId: formModel.locationId!,
    id: formModel.id!,
    packageId: formModel.packageId!,
    type: formModel.type!,
    price: formModel.price!,
  };
};

export const UpdatePackageDataRequest = async (formModel: UpdatePackageFormModel, token: string) => {
  const parsedBody = parseUpdatePackageData(formModel);
  return await UpdatePackageData<UpdatePackageDto, RawPackageDto>(formModel.id!, parsedBody, token);
};
