export type UpdateLocationFormModel = {
  id: number;
  description: string;
  isDeleted: string;
  Helpers: {
    inEdit: boolean;
  };
};

export type AddLocationFormModel = {
  description: string | null;
  isDeleted: string | null;
};

export type AddLocationsFormModel = {
  LocationList: AddLocationFormModel[];
  Helpers: {
    inEdit: boolean;
  };
};
