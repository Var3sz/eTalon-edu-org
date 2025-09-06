import { InputHeaderModel } from '@/components/tables/columns/components/headers/types/header-types';
import { cn } from '@/lib/utils';

export default function InputHeader<TData, TValue>({
  required,
  unitOfMeasureLabel,
  headerTitle,
  headerDivStyle = '',
}: InputHeaderModel<TData, TValue>) {
  return (
    <div className={cn('flex h-full flex-row justify-center items-center', headerDivStyle)}>
      <span>
        {headerTitle}
        {unitOfMeasureLabel && `(${unitOfMeasureLabel})`}
        {required && '*'}
      </span>
    </div>
  );
}
