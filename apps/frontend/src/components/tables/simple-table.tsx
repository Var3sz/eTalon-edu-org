import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  RowSelectionState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { useEffect, useState } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SimpleTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  defaultData: TData[];
  newRowElement?: TData;
  form?: {
    formId: string;
    formSetValue: (
      name: any,
      value: any,
      options?:
        | Partial<{
            shouldValidate: boolean;
            shouldDirty: boolean;
            shouldTouch: boolean;
          }>
        | undefined
    ) => void;
  };
  hiddenColumnIds?: string[];
}

export function SimpleTable<TData, TValue>({
  columns,
  defaultData,
  newRowElement,
  form,
  hiddenColumnIds,
}: SimpleTableProps<TData, TValue>) {
  const [data, setData] = useState(() => [...defaultData]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(() => {
    const hidden: VisibilityState = {};
    hiddenColumnIds?.forEach((id) => {
      hidden[id] = false;
    });
    return hidden;
  });

  useEffect(() => {
    setData(defaultData);
  }, [defaultData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    onColumnVisibilityChange: setColumnVisibility,
    state: { rowSelection, columnVisibility },
    meta: {
      addRow: () => {
        if (newRowElement) {
          const addedData = [...data, newRowElement];
          setData(addedData);
          form && form.formSetValue(form.formId as any, addedData);
        }
      },
      removeRow: (id: number) => {
        const filtered = data.filter((_, idx) => idx !== id);
        setData(() => filtered);
        form && form.formSetValue(form.formId as any, filtered);
      },
    },
  });

  return (
    <div>
      <div className='rounded-md border'>
        <Table className='table-auto border-collapse'>
          <TableHeader className='bg-gray-300'>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className='border-2' key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className='border-2' key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
