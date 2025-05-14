'use client';

import useGetPackagesDataQuery from '@/hooks/packages/use-get-packages-data-query';
import { DataTable } from '../tables/data-table';
import PackageTableColumns from '../columns/package/package-table-colums';
import CreatePackagesDialog from '../dialogs/package/create-packages-dialog';
import TabProvider, { TabProviderModel } from '../tabs/tab-provider';
import { useMemo } from 'react';
import PackageTableClient from './package-table-client';
import PackageAssignClient from './package-assign-client';

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
              label: 'Csomagok kurzushoz rendelése',
              visible: true,
            },
          ],
        }
      : ({ isHidden: true, tabs: [] } as TabProviderModel);
  }, [packages]);

  return packages !== null && <TabProvider {...packagePlannerTabs} />;
}
