export type CreatePackageFormModel = {
  packageId: string | null;
  price: number | null;
  type: string | null;
  locationId: number | null;
  active: boolean;
};

export type CreatePackagesFormModel = {
  PackageList: CreatePackageFormModel[];
  Helpers: {
    inEdit: boolean;
  };
};
