import { ColumnDef } from '@tanstack/react-table';
import { Edit2, Trash2 } from 'lucide-react';

import EditCouseDateDialog from '@/components/dialogs/course/edit-course-date-dialog';
import CustomInnerStateDialog from '@/components/dialogs/custom-innerstate-dialog';
import { FormLocales } from '@/locales/form-locales';
import { LessonDateDto } from '@/models/Api';

import { ColumnBaseModel } from '../../../types/column-types';
import { SimpleTableColumnHeader } from '../../headers/simple-table-column.header';
import EditInvoiceDateDialog from '@/components/dialogs/course/edit-invoice-date-dialog';

type EditInvoiceDateActionsColumnProps<T> = {
  courseId: string;
  editable?: boolean;
  deletable?: boolean;
  token: string;
} & ColumnBaseModel<T>;

export default function EditInvoiceDateActionsColumn<T>({
  id,
  accessorKey,
  size,
  headerTitle = 'Műveletek',
  courseId,
  token,
  editable = false,
  deletable = false,
}: EditInvoiceDateActionsColumnProps<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: () => <SimpleTableColumnHeader title={headerTitle} />,
    cell: ({ row }) => {
      return (
        <div className='w-fit mx-auto flex space-between gap-5'>
          {editable && (
            <CustomInnerStateDialog title={FormLocales.invoiceDate.edit} triggerElement={<Edit2 />}>
              <EditInvoiceDateDialog courseId={courseId} rowData={row.original as LessonDateDto} token={token} />
            </CustomInnerStateDialog>
          )}
        </div>
      );
    },
  };
}
