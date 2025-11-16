import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import CountingTableColumn from '@/components/tables/columns/components/action-columns/counting-table-column';
import DateTableColumn from '@/components/tables/columns/components/basic-columns/date-table-columns';
import TextTableColumn from '@/components/tables/columns/components/basic-columns/text-table-column';
import EditInvoiceDateActionsColumn from '@/components/tables/columns/components/special-columns/invoice-dates/edit-invoice-date-actions-column';
import { TableLocales } from '@/locales/table-locales';
import { InvoiceDateDto } from '@/models/Api';

export default function InvoiceDatesColumns(courseId: string, token: string): ColumnDef<InvoiceDateDto>[] {
  return useMemo(
    () => [
      CountingTableColumn<InvoiceDateDto>({
        id: 'No.',
        headerTitle: '',
        accessorKey: 'Id',
        size: 20,
      }),
      DateTableColumn<InvoiceDateDto>({
        id: 'date',
        accessorKey: 'date',
        headerTitle: TableLocales.invoiceDate.date,
      }),
      TextTableColumn<InvoiceDateDto>({
        id: 'description',
        accessorKey: 'description',
        headerTitle: TableLocales.invoiceDate.description,
      }),
      EditInvoiceDateActionsColumn<InvoiceDateDto>({
        id: 'actions',
        accessorKey: 'actions',
        headerTitle: TableLocales.actions,
        editable: true,
        courseId: courseId,
        size: 60,
        token: token,
      }),
    ],
    []
  );
}
