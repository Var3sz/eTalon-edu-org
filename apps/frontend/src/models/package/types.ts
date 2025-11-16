export type CreatePackageFormModel = {
  packageId: string | null;
  price: number | null;
  type: string | null;
  locationId: number | null;
  groupId: number | null;
  active: boolean;
};

export type CreatePackagesFormModel = {
  PackageList: CreatePackageFormModel[];
  Helpers: {
    inEdit: boolean;
  };
};

export type UpdatePackageFormModel = {
  id: number | null;
  packageId: string | null;
  price: number | null;
  active: boolean;
  groupId: number | null;
  locationId: number | null;
  type: string | null;
  Helpers: {
    inEdit: boolean;
  };
};
