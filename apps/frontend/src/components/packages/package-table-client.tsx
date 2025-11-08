import { useEffect } from 'react';

import { PackageDto } from '@/models/Api';

import PackageTableColumns from '../columns/package/package-table-colums';
import CreatePackagesDialog from '../dialogs/package/create-packages-dialog';
import { DataTable } from '../tables/data-table';

type PackageTableClientProps = {
  packages: PackageDto[];
  token: string;
};

export default function PackageTableClient({ packages, token }: PackageTableClientProps) {
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
    dialogComponent: <CreatePackagesDialog token={token} />,
  };

  return (
    <div className='w-full mx-auto '>
      <DataTable columns={PackageTableColumns()} data={packages ?? []} hasToolbar toolbarProps={toolbarProps} />
    </div>
  );
}
