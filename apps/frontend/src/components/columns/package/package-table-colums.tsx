import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';

import NumberWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/number-with-filter-table-column';
import TextWithFilterTableColumn from '@/components/tables/columns/components/filter-columns/text-with-filter-table-column';
import HiddenTableColumn from '@/components/tables/columns/components/special-columns/hidden-table-column';
import PackageActionsTableColumn from '@/components/tables/columns/components/special-columns/package/package-actions-table-column';
import { PackageEditRedirectionFunction } from '@/components/tables/columns/utils/redirection-functions';
import { PackageDto } from '@/models/Api';

type PackageTableColumnsModel = {
  inactivePackageFunction?: (courseId: number) => void;
};

export default function PackageTableColumns({
  inactivePackageFunction,
}: PackageTableColumnsModel): ColumnDef<PackageDto>[] {
  return useMemo(
    () => [
      PackageActionsTableColumn<PackageDto>({
        id: 'actions',
        accessorKey: 'actions',
        headerTitle: '',
        redirect: true,
        deletable: true,
        confirmTitle: 'Figyelem!',
        confirmDesc: 'Biztosan inaktiválja a kiválasztott csomagot?',
        deleteFunction: inactivePackageFunction,
        redirection: PackageEditRedirectionFunction,
      }),
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
        unitOfMeasure: 'Ft',
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
      HiddenTableColumn<PackageDto>({
        id: 'id',
        accessorKey: 'id',
      }),
    ],
    []
  );
}
