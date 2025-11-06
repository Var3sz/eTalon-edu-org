'use client';

import useGetPackagesDataQuery from '@/hooks/packages/use-get-packages-data-query';
import TabProvider, { TabProviderModel } from '../tabs/tab-provider';
import { useMemo } from 'react';
import PackageTableClient from './package-table-client';
import PackageAssignClient from './package-assign-client';
import { useSession } from 'next-auth/react';
import { PackageDto } from '@/models/Api';

export default function PackagesClient() {
  const { data: session } = useSession();
  const { data: packagesDataResponse } = useGetPackagesDataQuery(session?.tokens.accessToken ?? '');

  const packageData: PackageDto[] =
    packagesDataResponse.status === 200 && packagesDataResponse.data !== undefined ? packagesDataResponse.data : [];

  const packagePlannerTabs: TabProviderModel = useMemo(() => {
    return packagesDataResponse.status === 200
      ? {
          isHidden: false,
          tabs: [
            {
              isDefault: true,
              children: <PackageTableClient packages={packageData} token={session?.tokens.accessToken ?? ''} />,
              key: 'details',
              label: 'Csomagok áttekintése',
              tiggerStyle: 'flex gap-3',
              visible: true,
            },
            {
              children: <PackageAssignClient token={session?.tokens.accessToken ?? ''} />,
              key: 'assign',
              label: 'Kurzushoz rendelés',
              visible: true,
            },
          ],
        }
      : ({ isHidden: true, tabs: [] } as TabProviderModel);
  }, [packagesDataResponse.status === 200 && packagesDataResponse.data]);

  return (
    <div className='w-3/4 mx-auto flex flex-col gap-3'>
      <span className='text-3xl font-bold'>Csomagtervezés</span>
      <TabProvider {...packagePlannerTabs} tabListStyle='w-1/3' />
    </div>
  );
}
