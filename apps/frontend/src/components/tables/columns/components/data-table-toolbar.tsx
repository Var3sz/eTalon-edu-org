import { Table } from '@tanstack/react-table';
import { Settings2 } from 'lucide-react';
import { ReactElement } from 'react';

import CustomInnerStateDialog from '@/components/dialogs/custom-innerstate-dialog';
import AddButton from '@/components/ui/add-button';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  toolbarProps: {
    title: string;
    hasAddButton?: boolean;
    addButtonTitle?: string;
    dialogTitle?: string;
    dialogComponent?: ReactElement;
  };
}

export function DataTableToolBar<TData>({ table, toolbarProps }: DataTableToolbarProps<TData>) {
  return (
    <div className='w-full flex flex-row justify-between'>
      <div className='flex gap-3'>
        <span className='font-bold text-3xl'>{toolbarProps.title}</span>
        {toolbarProps.hasAddButton && (
          <CustomInnerStateDialog
            title={toolbarProps.dialogTitle!}
            triggerElement={<AddButton asChild title={toolbarProps.addButtonTitle!} />}
          >
            {toolbarProps.dialogComponent!}
          </CustomInnerStateDialog>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm' className='ml-auto hidden h-8 lg:flex'>
            <Settings2 />
            Beállítások
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-[200px]'>
          <DropdownMenuLabel>Oszlopok megjelenítése</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
                >
                  {column.columnDef.meta?.displayName}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
