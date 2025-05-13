'use client';

import useGetPackagesDataQuery from '@/hooks/packages/use-get-packages-data-query';
import { DataTable } from '../tables/data-table';
import PackageTableColumns from '../columns/package/package-table-colums';
import CreatePackagesDialog from '../dialogs/package/create-packages-dialog';

export default function PackagesClient() {
  const packages = useGetPackagesDataQuery();

  const toolbarProps = {
    title: 'Csomagtervező',
    hasAddButton: true,
    addButtonTitle: 'Új csomagok',
    dialogTitle: 'Csomagok létrehozása',
    dialogComponent: <CreatePackagesDialog />,
  };

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={PackageTableColumns()} data={packages ?? []} hasToolbar toolbarProps={toolbarProps} />
    </div>
  );
}
