export type UpdateLocationFormModel = {
  id: number;
  description: string;
  Helpers: {
    inEdit: boolean;
  };
};

export type AddLocationFormModel = {
  description: string | null;
};

export type AddLocationsFormModel = {
  LocationList: AddLocationFormModel[];
  Helpers: {
    inEdit: boolean;
  };
};
