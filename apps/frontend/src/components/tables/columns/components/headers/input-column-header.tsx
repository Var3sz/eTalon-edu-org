import { InputHeaderModel } from '@/components/tables/columns/components/headers/types/header-types';

export default function InputHeader<TData, TValue>({
  required,
  unitOfMeasureLabel,
  headerTitle,
}: InputHeaderModel<TData, TValue>) {
  return (
    <div className='flex h-full flex-row items-center'>
      <span>
        {headerTitle}
        {unitOfMeasureLabel && `(${unitOfMeasureLabel})`}
        {required && '*'}
      </span>
    </div>
  );
}
