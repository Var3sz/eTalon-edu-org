import { CreatePackageDto } from '@/models/Api';
import { CreatePackagesFormModel } from '../types';
import { CreatePackages } from '@/api/models/serviceEndpoints/packages';

const parseCreateBody = (formModel: CreatePackagesFormModel): CreatePackageDto[] => {
  const packages = formModel.PackageList.map((c) => {
    return {
      packageId: c.packageId!,
      locationId: c.locationId!,
      type: c.type!,
      price: c.price!,
      active: c.active,
    };
  });
  return packages;
};

export const CreatePackagesRequest = async (formModel: CreatePackagesFormModel) => {
  const parsedBody = parseCreateBody(formModel);
  return await CreatePackages<CreatePackageDto[], any>(parsedBody);
};
