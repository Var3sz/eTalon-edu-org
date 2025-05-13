import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Control, FieldValues } from 'react-hook-form';

import BinActionTableColumn from '@/components/tables/columns/components/action-columns/bin-action-table-column';
import CountingTableColumn from '@/components/tables/columns/components/action-columns/counting-table-column';
import DateInputColumn from '@/components/tables/columns/components/input-columns/date-input-column';
import NumberInputColumn from '@/components/tables/columns/components/input-columns/number-input-column';
import SelectTableColumn from '@/components/tables/columns/components/input-columns/select-input-column';
import SwitchTableColumn from '@/components/tables/columns/components/input-columns/switch-input-column';
import TextInputColumn from '@/components/tables/columns/components/input-columns/text-input-column';
import TimePickerInputColumn from '@/components/tables/columns/components/input-columns/time-picker-input-column';
import { FormLocales } from '@/locales/form-locales';
import { CreatePackageFormModel } from '@/models/package/types';
import { LocationDto } from '@/models/Api';

export default function CreatePackagesColumns<FormType extends FieldValues>(
  formControl: Control<FormType>,
  inEdit: boolean,
  tableLength: number,
  locations: LocationDto[]
): ColumnDef<CreatePackageFormModel>[] {
  const columns = useMemo(
    () => [
      CountingTableColumn<CreatePackageFormModel>({
        id: 'No.',
        headerTitle: '',
        accessorKey: '',
      }),
      TextInputColumn<FormType, CreatePackageFormModel>({
        id: 'Csomag típus',
        headerTitle: 'Csomag típus',
        accessorKey: 'PackageList[index].type',
        formControl: formControl,
        inEdit: inEdit,
      }),
      TextInputColumn<FormType, CreatePackageFormModel>({
        id: 'Csomag azonsító',
        headerTitle: 'Csomag azonsító',
        accessorKey: 'PackageList[index].packageId',
        formControl: formControl,
        inEdit: inEdit,
      }),
      NumberInputColumn<FormType, CreatePackageFormModel>({
        id: 'Csomag ár',
        headerTitle: 'Csomag ár',
        accessorKey: 'PackageList[index].price',
        formControl: formControl,
        inEdit: inEdit,
      }),
      SelectTableColumn<FormType, CreatePackageFormModel>({
        id: 'Helyszín',
        headerTitle: 'Helyszín',
        accessorKey: 'PackageList[index].locationId',
        formControl: formControl,
        inEdit: inEdit,
        items: locations.map((l) => {
          return {
            value: l.id,
            label: l.description,
          };
        }),
        placeholder: FormLocales.course.selectValues.location.placeholder,
        emptySelect: FormLocales.course.selectValues.location.emptySelect,
      }),
      SwitchTableColumn<FormType, CreatePackageFormModel>({
        id: 'Aktív',
        headerTitle: 'Aktív',
        accessorKey: 'PackageList[index].active',
        formControl: formControl,
        inEdit: inEdit,
      }),
      BinActionTableColumn<CreatePackageFormModel>({
        id: 'Törlés',
        accessorKey: 'removeRow',
      }),
    ],
    [tableLength]
  );

  return columns;
}
