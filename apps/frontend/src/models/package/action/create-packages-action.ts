import { CreatePackages } from '@/api/models/serviceEndpoints/packages';
import { CreatePackageDto, PackageDto } from '@/models/Api';

import { CreatePackagesFormModel } from '../types';

const parseCreateBody = (formModel: CreatePackagesFormModel): CreatePackageDto[] => {
  const packages = formModel.PackageList.map((c) => {
    return {
      packageId: c.packageId!,
      locationId: c.locationId!,
      type: c.type!,
      price: c.price!,
      active: c.active,
      groupId: c.groupId!,
    };
  });
  return packages;
};

export const CreatePackagesRequest = async (formModel: CreatePackagesFormModel, token: string) => {
  const parsedBody = parseCreateBody(formModel);
  return await CreatePackages<CreatePackageDto[], PackageDto[]>(parsedBody, token);
};
