import { ColumnDef } from '@tanstack/react-table';

import CustomInnerStateDialog from '@/components/dialogs/custom-innerstate-dialog';
import StudentDetailsDialog from '@/components/dialogs/student/student-details-dialog';
import { SimpleTableColumnHeader } from '@/components/tables/columns/components/headers/simple-table-column.header';
import { ClickableColumnModel } from '@/components/tables/columns/types/column-types';
import { StudentAttendance } from '@/hooks/courses/use-init-course-client';

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
        <div
          style={{
            minWidth: `${size}px`,
            width: cell.column.getSize(),
          }}
        >
          <CustomInnerStateDialog title={dialogTitle} triggerElement={<span className='cursor-pointer '>{value}</span>}>
            <StudentDetailsDialog studentData={row.original as StudentAttendance} />
          </CustomInnerStateDialog>
        </div>
      );
    },
  };
}
