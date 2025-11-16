import { GroupDto } from '@/models/Api';
import { UpdateGroupFormModel } from '@/models/group/types';

export const UpdateGroupFormData = (rowData: GroupDto): UpdateGroupFormModel => {
  return {
    id: rowData.id,
    description: rowData.description,
    isDeleted: rowData.isDeleted,
    Helpers: {
      inEdit: false,
    },
  };
};
