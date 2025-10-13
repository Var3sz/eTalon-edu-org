'use client';

import { useMemo } from 'react';

import useGetPackagesDataQuery from '@/hooks/packages/use-get-packages-data-query';

import PackageTableColumns from '../columns/package/package-table-colums';
import CreatePackagesDialog from '../dialogs/package/create-packages-dialog';
import { DataTable } from '../tables/data-table';
import TabProvider, { TabProviderModel } from '../tabs/tab-provider';
import PackageAssignClient from './package-assign-client';
import PackageTableClient from './package-table-client';

export default function PackagesClient() {
  const packages = useGetPackagesDataQuery();

  const packagePlannerTabs: TabProviderModel = useMemo(() => {
    return packages
      ? {
          isHidden: packages === null,
          tabs: [
            {
              isDefault: true,
              children: <PackageTableClient packages={packages} />,
              key: 'details',
              label: 'Csomagok áttekintése',
              tiggerStyle: 'flex gap-3',
              visible: true,
            },
            {
              children: <PackageAssignClient />,
              key: 'assign',
              label: 'Kurzushoz rendelés',
              visible: true,
            },
          ],
        }
      : ({ isHidden: true, tabs: [] } as TabProviderModel);
  }, [packages]);

  return (
    <div className='w-3/4 mx-auto flex flex-col gap-3'>
      <span className='text-3xl font-bold'>Csomagtervezés</span>
      {packages !== null && <TabProvider {...packagePlannerTabs} tabListStyle='w-1/3' />}
    </div>
  );
}
