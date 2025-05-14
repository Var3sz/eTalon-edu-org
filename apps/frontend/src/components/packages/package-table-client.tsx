import { PackageDto } from '@/models/Api';
import PackageTableColumns from '../columns/package/package-table-colums';
import { DataTable } from '../tables/data-table';
import CreatePackagesDialog from '../dialogs/package/create-packages-dialog';
import { useEffect } from 'react';

type PackageTableClientProps = {
  packages: PackageDto[];
};

export default function PackageTableClient({ packages }: PackageTableClientProps) {
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'details');
    window.history.replaceState(null, '', url.toString());
  }, []);

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
