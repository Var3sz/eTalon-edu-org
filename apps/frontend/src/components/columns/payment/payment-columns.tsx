import TextTableColumn from '@/components/tables/columns/components/basic-columns/text-table-column';
import CheckboxTableColumn from '@/components/tables/columns/components/input-columns/checkbox-input-column';
import NumberInputColumn from '@/components/tables/columns/components/input-columns/number-input-column';
import TextInputColumn from '@/components/tables/columns/components/input-columns/text-input-column';
import TextTableGroupColumn from '@/components/tables/columns/components/other-columns/text-table-group-column';
import { StudentAttendance } from '@/hooks/courses/use-init-course-client';
import { StudentPayment } from '@/hooks/payments/use-init-payment-client';
import { StudentLocales } from '@/locales/student-locales';
import { PaymentDateColumnType } from '@/models/students/types';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Control, FieldValues } from 'react-hook-form';

type PaymentColumnProps<T extends FieldValues> = {
  paymentData: StudentPayment[];
  dateColumns: PaymentDateColumnType[];
  formControl: Control<T>;
  inEdit: boolean;
  token: string;
};

export default function PaymentColumns<T extends FieldValues>({
  paymentData,
  dateColumns,
  formControl,
  inEdit,
}: PaymentColumnProps<T>): ColumnDef<StudentPayment>[] {
  return useMemo(() => {
    const staticColumns: ColumnDef<StudentPayment>[] = [
      TextTableColumn<StudentPayment>({
        id: 'studentName',
        accessorKey: 'studentName',
        headerTitle: StudentLocales.table.name,
        size: 200,
      }),
    ];

    const dynamicColumns: ColumnDef<StudentPayment>[] = dateColumns.map(({ invoiceDateId, date, description }) => {
      const accessorKey = `payments[index].${invoiceDateId}`;

      return TextTableGroupColumn<StudentPayment>({
        headerTitle: `${description} - ${date}`,
        id: `${invoiceDateId}-payment`,
        accessorKey: `${invoiceDateId}-payment`,
        columns: [
          TextInputColumn<T, StudentPayment>({
            id: `${accessorKey}.invoiceNumber`,
            accessorKey: `${accessorKey}.invoiceNumber`,
            headerTitle: 'Számla azonosító',
            disabled: false,
            formControl,
            inEdit: inEdit,
            size: 100,
          }),
          CheckboxTableColumn<T, StudentPayment>({
            id: `${accessorKey}.payed`,
            accessorKey: `${accessorKey}.payed`,
            headerTitle: `Teljes összeg fizetett?`,
            disabled: false,
            formControl,
            inEdit: inEdit,
            size: 100,
          }),
          NumberInputColumn<T, StudentPayment>({
            id: `${accessorKey}.amount`,
            accessorKey: `${accessorKey}.amount`,
            headerTitle: 'Fizetett összeg',
            disabled: false,
            formControl,
            inEdit: inEdit,
            size: 100,
          }),
          NumberInputColumn<T, StudentPayment>({
            id: `${accessorKey}.amountToBePayed`,
            accessorKey: `${accessorKey}.amountToBePayed`,
            headerTitle: 'Fizetendő összeg',
            disabled: false,
            formControl,
            inEdit: inEdit,
            size: 100,
          }),
        ],
      });
    });

    return [...staticColumns, ...dynamicColumns];
  }, [paymentData, dateColumns, inEdit]);
}
