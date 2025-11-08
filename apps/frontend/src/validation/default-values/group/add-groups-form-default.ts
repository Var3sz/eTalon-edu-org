import { AddGroupsFormModel } from '@/models/group/types';

export const AddGroupsFormDefault = (): AddGroupsFormModel => {
  return {
    GroupList: [
      {
        description: null,
        isDeleted: 'N',
      },
    ],
    Helpers: {
      inEdit: true,
    },
  };
};
