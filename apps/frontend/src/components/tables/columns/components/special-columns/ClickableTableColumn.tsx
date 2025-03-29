import { ColumnDef } from '@tanstack/react-table';

import CustomInnerStateDialog from '@/components/dialogs/custom-innerstate-dialog';
import StudentDetailsDialog from '@/components/dialogs/student/student-details-dialog';
import { SimpleTableColumnHeader } from '@/components/tables/columns/components/headers/simple-table-column.header';
import { ClickableColumnModel } from '@/components/tables/columns/types/types';
import { CourseStudentsDTO } from '@/models/Api';

export default function ClickableTableColumn<T>({
  id,
  accessorKey,
  size,
  headerTitle,
  dialogTitle = '',
}: ClickableColumnModel<T>): ColumnDef<T> {
  return {
    id: id,
    accessorKey: accessorKey,
    size: size,
    header: () => <SimpleTableColumnHeader title={headerTitle} />,
    cell: ({ cell, row }) => {
      const value = cell.getValue() as string;

      return (
        <CustomInnerStateDialog title={dialogTitle} triggerElement={<span className='cursor-pointer '>{value}</span>}>
          <StudentDetailsDialog studentData={row.original as CourseStudentsDTO} />
        </CustomInnerStateDialog>
      );
    },
  };
}
