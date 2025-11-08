export type UpdateGroupFormModel = {
  id: number;
  description: string;
  Helpers: {
    inEdit: boolean;
  };
};

export type AddGroupFormModel = {
  description: string | null;
};

export type AddGroupsFormModel = {
  GroupList: AddGroupFormModel[];
  Helpers: {
    inEdit: boolean;
  };
};
