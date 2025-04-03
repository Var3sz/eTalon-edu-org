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
import { GroupDTO, LocationDTO } from '@/models/Api';
import { UpdateCoursesFormModel } from '@/models/course/types';
import TimePickerInputColumn from '@/components/tables/columns/components/input-columns/time-picker-input-column';

export default function UpdateCourseDataColumns<FormType extends FieldValues>(
  formControl: Control<FormType>,
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
  ) => void,
  locations: LocationDTO[],
  groups: GroupDTO[],
  inEdit: boolean
): ColumnDef<UpdateCoursesFormModel>[] {
  return useMemo(
    () => [
      CountingTableColumn<UpdateCoursesFormModel>({
        id: 'No.',
        headerTitle: '',
        accessorKey: 'CourseList[index].Id',
      }),
      TextInputColumn<FormType, UpdateCoursesFormModel>({
        id: 'Kurzus azonosító',
        headerTitle: 'Kurzus azonosító',
        formControl: formControl,
        required: true,
        accessorKey: 'CourseList[index].courseId',
        inEdit: inEdit,
      }),
      SelectTableColumn<FormType, UpdateCoursesFormModel>({
        id: 'Csoport',
        headerTitle: 'Csoport',
        formControl: formControl,
        formSetValue: formSetValue,
        required: true,
        accessorKey: 'CourseList[index].groupId',
        items: groups.map((g) => {
          return {
            value: g.id,
            label: g.description,
          };
        }),
        inEdit: inEdit,
        placeholder: 'Válasszon csoportot',
        emptySelect: 'Nem található ilyen csoport',
      }),
      SelectTableColumn<FormType, UpdateCoursesFormModel>({
        id: 'Helyszín',
        headerTitle: 'Helyszín',
        formControl: formControl,
        formSetValue: formSetValue,
        required: true,
        accessorKey: 'CourseList[index].locationId',
        items: locations.map((l) => {
          return {
            value: l.id,
            label: l.description,
          };
        }),
        inEdit: inEdit,
        placeholder: 'Válasszon csoportot',
        emptySelect: 'Nem található ilyen csoport',
      }),
      TextInputColumn<FormType, UpdateCoursesFormModel>({
        id: 'Kurzus leírás',
        headerTitle: 'Kurzus leírás',
        formControl: formControl,
        required: true,
        accessorKey: 'CourseList[index].description',
        inEdit: inEdit,
      }),
      DateInputColumn<FormType, UpdateCoursesFormModel>({
        id: 'Kurzus kezdés dátuma',
        headerTitle: 'Kurzus kezdés dátuma',
        formControl: formControl,
        required: true,
        accessorKey: 'CourseList[index].startDate',
        inEdit: inEdit,
      }),
      TimePickerInputColumn<FormType, UpdateCoursesFormModel>({
        id: 'Óra kezdete',
        headerTitle: 'Óra kezdete',
        formControl: formControl,
        required: true,
        accessorKey: 'CourseList[index].startTime',
        inEdit: inEdit,
      }),
      TimePickerInputColumn<FormType, UpdateCoursesFormModel>({
        id: 'Óra vége',
        headerTitle: 'Óra vége',
        formControl: formControl,
        required: true,
        accessorKey: 'CourseList[index].endTime',
        inEdit: inEdit,
      }),
      NumberInputColumn<FormType, UpdateCoursesFormModel>({
        id: 'Aktális létszám',
        headerTitle: 'Aktuális létszám',
        formControl: formControl,
        required: true,
        accessorKey: 'CourseList[index].headCount',
        inEdit: inEdit,
        unitOfMeasureLabel: 'fő',
      }),
      NumberInputColumn<FormType, UpdateCoursesFormModel>({
        id: 'Max. létszám',
        headerTitle: 'Max. létszám',
        formControl: formControl,
        required: true,
        accessorKey: 'CourseList[index].maxHeadcount',
        inEdit: inEdit,
        unitOfMeasureLabel: 'fő',
      }),
      NumberInputColumn<FormType, UpdateCoursesFormModel>({
        id: 'Ár',
        headerTitle: 'Ár',
        formControl: formControl,
        required: true,
        accessorKey: 'CourseList[index].price',
        inEdit: inEdit,
        unitOfMeasureLabel: 'Ft',
      }),
      SwitchTableColumn<FormType, UpdateCoursesFormModel>({
        id: 'Aktív',
        headerTitle: 'Aktív',
        formControl: formControl,
        required: true,
        accessorKey: 'CourseList[index].active',
        inEdit: inEdit,
      }),
      SwitchTableColumn<FormType, UpdateCoursesFormModel>({
        id: 'Lezárt',
        headerTitle: 'Lezárt',
        formControl: formControl,
        required: true,
        accessorKey: 'CourseList[index].locked',
        inEdit: inEdit,
      }),
      BinActionTableColumn<UpdateCoursesFormModel>({
        id: 'Törlés',
        accessorKey: 'removeRow',
      }),
    ],
    [inEdit]
  );
}
