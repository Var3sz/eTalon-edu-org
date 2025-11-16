import { RawPackageDto } from '@/models/Api';
import { UpdatePackageFormModel } from '@/models/package/types';

export const UpdatePackageFormData = (packageData: RawPackageDto): UpdatePackageFormModel => {
  return {
    id: packageData.id,
    active: packageData.active,
    groupId: packageData.groupId,
    locationId: packageData.locationId,
    packageId: packageData.packageId,
    price: packageData.price,
    type: packageData.type,
    Helpers: {
      inEdit: false,
    },
  };
};
