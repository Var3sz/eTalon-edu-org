import { HTMLAttributes } from 'react';

interface SimpleTableColumnHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export function SimpleTableColumnHeader({ title }: SimpleTableColumnHeaderProps) {
  return <div className='flex justify-center items-center'>{title}</div>;
}
