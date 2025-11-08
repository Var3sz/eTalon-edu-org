import CountingTableColumn from '@/components/tables/columns/components/action-columns/counting-table-column';
import TextTableColumn from '@/components/tables/columns/components/basic-columns/text-table-column';
import LocationActionsTableColumn from '@/components/tables/columns/components/special-columns/locations/location-actions-table-column';
import { LocationDto } from '@/models/Api';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

export default function LocationColumns(token: string): ColumnDef<LocationDto>[] {
  const columns = useMemo(
    () => [
      CountingTableColumn<LocationDto>({
        id: 'No.',
        headerTitle: '',
        accessorKey: '',
      }),
      TextTableColumn<LocationDto>({
        id: 'description',
        accessorKey: 'description',
        headerTitle: 'Megnevezés',
        cellStyle: 'justify-center',
      }),
      LocationActionsTableColumn<LocationDto>({
        id: 'actions',
        accessorKey: 'action',
        headerTitle: 'Módosítás',
        token: token,
      }),
    ],
    []
  );

  return columns;
}
