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
import { GroupDto, LocationDto } from '@/models/Api';
import { CreateCourseFormModel } from '@/models/course/types';

export default function CreateCoursesColumns<FormType extends FieldValues>(
  formControl: Control<FormType>,
  inEdit: boolean,
  tableLength: number,
  groups: GroupDto[],
  locations: LocationDto[]
): ColumnDef<CreateCourseFormModel>[] {
  const columns = useMemo(
    () => [
      CountingTableColumn<CreateCourseFormModel>({
        id: 'No.',
        headerTitle: '',
        accessorKey: '',
      }),
      TextInputColumn<FormType, CreateCourseFormModel>({
        id: 'Kurzus azonosító',
        headerTitle: 'Kurzus azonosító',
        accessorKey: 'CourseList[index].courseId',
        formControl: formControl,
        inEdit: inEdit,
      }),
      TextInputColumn<FormType, CreateCourseFormModel>({
        id: 'Megnevezés',
        headerTitle: 'Megnevezés',
        accessorKey: 'CourseList[index].description',
        formControl: formControl,
        inEdit: inEdit,
      }),
      DateInputColumn<FormType, CreateCourseFormModel>({
        id: 'Kurzus dátuma',
        headerTitle: 'Kurzus dátuma',
        accessorKey: 'CourseList[index].startDate',
        formControl: formControl,
        inEdit: inEdit,
      }),
      TimePickerInputColumn<FormType, CreateCourseFormModel>({
        id: 'Kezdés időpontja',
        headerTitle: 'Kezdés időpontja',
        accessorKey: 'CourseList[index].startTime',
        formControl: formControl,
        inEdit: inEdit,
      }),
      TimePickerInputColumn<FormType, CreateCourseFormModel>({
        id: 'Befejezés időpontja',
        headerTitle: 'Befejezés időpontja',
        accessorKey: 'CourseList[index].endTime',
        formControl: formControl,
        inEdit: inEdit,
      }),
      NumberInputColumn<FormType, CreateCourseFormModel>({
        id: 'Max. létszám',
        headerTitle: 'Max. létszám',
        accessorKey: 'CourseList[index].maxHeadCount',
        formControl: formControl,
        inEdit: inEdit,
      }),
      SelectTableColumn<FormType, CreateCourseFormModel>({
        id: 'Csoport',
        headerTitle: 'Csoport',
        accessorKey: 'CourseList[index].groupId',
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
      SelectTableColumn<FormType, CreateCourseFormModel>({
        id: 'Helyszín',
        headerTitle: 'Helyszín',
        accessorKey: 'CourseList[index].locationId',
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
      BinActionTableColumn<CreateCourseFormModel>({
        id: 'Törlés',
        accessorKey: 'removeRow',
      }),
    ],
    [tableLength]
  );

  return columns;
}
