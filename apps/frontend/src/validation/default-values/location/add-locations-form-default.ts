import { AddGroupsFormModel } from '@/models/group/types';
import { AddLocationsFormModel } from '@/models/location/type';

export const AddLocationsFormDefault = (): AddLocationsFormModel => {
  return {
    LocationList: [
      {
        description: null,
      },
    ],
    Helpers: {
      inEdit: true,
    },
  };
};
