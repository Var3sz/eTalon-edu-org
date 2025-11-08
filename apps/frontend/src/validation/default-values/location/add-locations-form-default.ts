import { AddLocationsFormModel } from '@/models/location/type';

export const AddLocationsFormDefault = (): AddLocationsFormModel => {
  return {
    LocationList: [
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
