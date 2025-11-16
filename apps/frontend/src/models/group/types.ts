export type UpdateGroupFormModel = {
  id: number;
  description: string;
  isDeleted: string;
  Helpers: {
    inEdit: boolean;
  };
};

export type AddGroupFormModel = {
  description: string | null;
  isDeleted: string | null;
};

export type AddGroupsFormModel = {
  GroupList: AddGroupFormModel[];
  Helpers: {
    inEdit: boolean;
  };
};
