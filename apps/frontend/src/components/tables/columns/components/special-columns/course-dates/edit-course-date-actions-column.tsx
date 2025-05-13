import { ColumnDef } from '@tanstack/react-table';
import { ColumnBaseModel } from '../../../types/column-types';
import { SimpleTableColumnHeader } from '../../headers/simple-table-column.header';
import CustomInnerStateDialog from '@/components/dialogs/custom-innerstate-dialog';
import { DeleteIcon, Edit2, Trash2 } from 'lucide-react';
import EditCouseDateDialog from '@/components/dialogs/course/edit-course-date-dialog';
import { LessonDateDto } from '@/models/Api';
import { FormLocales } from '@/locales/form-locales';

type EditCourseDateActionsColumnProps<T> = {
  courseId: string;
  editable?: boolean;
  deletable?: boolean;
} & ColumnBaseModel<T>;

export default function EditCourseDateActionsColumn<T>({
  id,
  accessorKey,
  size,
  headerTitle,
  courseId,
  editable = false,
  deletable = false,
}: EditCourseDateActionsColumnProps<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: () => <SimpleTableColumnHeader title={headerTitle} />,
    cell: ({ row, cell }) => {
      return (
        <div className='w-fit mx-auto flex space-between gap-5'>
          {editable && (
            <CustomInnerStateDialog title={FormLocales.courseDate.edit} triggerElement={<Edit2 />}>
              <EditCouseDateDialog courseId={courseId} rowData={row.original as LessonDateDto} />
            </CustomInnerStateDialog>
          )}
          {deletable && (
            <CustomInnerStateDialog
              title={'Törlés'}
              triggerElement={<Trash2 />}
              children={<></>}
            ></CustomInnerStateDialog>
          )}
        </div>
      );
    },
  };
}
