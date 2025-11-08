import { LocationDto } from '@/models/Api';
import { UpdateLocationFormModel } from '@/models/location/type';

export const UpdateLocationFormData = (rowData: LocationDto): UpdateLocationFormModel => {
  return {
    id: rowData.id,
    description: rowData.description,
    Helpers: {
      inEdit: false,
    },
  };
};
