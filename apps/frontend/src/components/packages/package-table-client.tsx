import LoadingFullScreen from '@/app/loading';
import useInitPackagesTableClient from '@/hooks/packages/use-init-packages-table-client';
import { PackageDto } from '@/models/Api';

import PackageTableColumns from '../columns/package/package-table-colums';
import CreatePackagesDialog from '../dialogs/package/create-packages-dialog';
import { DataTable } from '../tables/data-table';

type PackageTableClientProps = {
  packages: PackageDto[];
  token: string;
};

export default function PackageTableClient({ packages, token }: PackageTableClientProps) {
  const { isPending, inactivePackageFunction } = useInitPackagesTableClient(token);

  const toolbarProps = {
    title: 'Csomagtervező',
    hasAddButton: true,
    addButtonTitle: 'Új csomagok',
    dialogTitle: 'Csomagok létrehozása',
    dialogComponent: <CreatePackagesDialog token={token} />,
  };

  return (
    <div className='w-full mx-auto '>
      {isPending && <LoadingFullScreen />}
      <DataTable
        columns={PackageTableColumns({
          inactivePackageFunction: inactivePackageFunction,
        })}
        data={packages ?? []}
        hasToolbar
        toolbarProps={toolbarProps}
      />
    </div>
  );
}
