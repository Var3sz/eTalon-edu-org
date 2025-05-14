import { CreatePackagesFormModel } from '@/models/package/types';

export const CreatePackagesFormDefault = (): CreatePackagesFormModel => {
  return {
    PackageList: [
      {
        packageId: null,
        price: null,
        type: null,
        locationId: null,
        active: true,
        groupId: null,
      },
    ],
    Helpers: {
      inEdit: true,
    },
  };
};
