import { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ChevronsUpDown, EyeOff } from 'lucide-react';
import { HTMLAttributes } from 'react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue> extends HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
  unitOfMeasure?: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  unitOfMeasure = '',
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  let sortIcon;
  if (column.getIsSorted() === 'desc') {
    sortIcon = <ArrowDown />;
  } else if (column.getIsSorted() === 'asc') {
    sortIcon = <ArrowUp />;
  } else {
    sortIcon = <ChevronsUpDown />;
  }

  if (!column.getCanSort()) {
    return (
      <div className={cn(className)}>
        {title}
        {unitOfMeasure ? ` (${unitOfMeasure})` : ''}
      </div>
    );
  }

  return (
    <div className={cn('flex justify-center items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='h-8 w-full justify-center font-bold text-base data-[state=open]:bg-accent'
          >
            <span>
              {title}
              {unitOfMeasure ? ` (${unitOfMeasure})` : ''}
            </span>
            {sortIcon}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className='h-3.5 w-3.5 text-muted-foreground/70' />
            Növekő
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className='h-3.5 w-3.5 text-muted-foreground/70' />
            Csökkenő
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            <EyeOff className='h-3.5 w-3.5 text-muted-foreground/70' />
            Eltüntetés
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
