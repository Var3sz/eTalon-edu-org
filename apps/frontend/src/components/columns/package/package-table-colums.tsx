import NumberWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/number-with-filter-table-column';
import TextWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/text-with-filter-table-column';
import { PackageDto } from '@/models/Api';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

export default function PackageTableColumns(): ColumnDef<PackageDto>[] {
  return useMemo(
    () => [
      TextWithFilterTableColumn<PackageDto>({
        id: 'type',
        accessorKey: 'type',
        headerTitle: 'Csomag típus',
        size: 20,
      }),
      TextWithFilterTableColumn<PackageDto>({
        id: 'packageId',
        accessorKey: 'packageId',
        headerTitle: 'Csomagkód',
      }),
      NumberWithFilterTableColumn<PackageDto>({
        id: 'price',
        accessorKey: 'price',
        headerTitle: 'Csomag ára',
      }),
      TextWithFilterTableColumn<PackageDto>({
        id: 'locationDesc',
        accessorKey: 'locationDesc',
        headerTitle: 'Helyszín',
      }),
      TextWithFilterTableColumn<PackageDto>({
        id: 'groupDesc',
        accessorKey: 'groupDesc',
        headerTitle: 'Csoport',
      }),
    ],
    []
  );
}
