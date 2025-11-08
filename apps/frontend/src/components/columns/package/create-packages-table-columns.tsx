import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { Control, FieldValues } from 'react-hook-form';

import BinActionTableColumn from '@/components/tables/columns/components/action-columns/bin-action-table-column';
import CountingTableColumn from '@/components/tables/columns/components/action-columns/counting-table-column';
import NumberInputColumn from '@/components/tables/columns/components/input-columns/number-input-column';
import SelectTableColumn from '@/components/tables/columns/components/input-columns/select-input-column';
import TextInputColumn from '@/components/tables/columns/components/input-columns/text-input-column';
import { FormLocales } from '@/locales/form-locales';
import { GroupDto, LocationDto } from '@/models/Api';
import { CreatePackageFormModel } from '@/models/package/types';

export default function CreatePackagesColumns<FormType extends FieldValues>(
  formControl: Control<FormType>,
  inEdit: boolean,
  tableLength: number,
  locations: LocationDto[],
  groups: GroupDto[]
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
      SelectTableColumn<FormType, CreatePackageFormModel>({
        id: 'Csoport',
        headerTitle: 'Csoport',
        accessorKey: 'PackageList[index].groupId',
        formControl: formControl,
        inEdit: inEdit,
        items: groups.map((g) => {
          return {
            value: g.id,
            label: g.description,
          };
        }),
        placeholder: FormLocales.course.selectValues.group.placeholder,
        emptySelect: FormLocales.course.selectValues.group.emptySelect,
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
