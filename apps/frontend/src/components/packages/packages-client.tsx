'use client';

import useGetPackagesDataQuery from '@/hooks/packages/use-get-packages-data-query';
import TabProvider, { TabProviderModel } from '../tabs/tab-provider';
import { useMemo } from 'react';
import PackageTableClient from './package-table-client';
import PackageAssignClient from './package-assign-client';
import { useSession } from 'next-auth/react';

export default function PackagesClient() {
  const { data: session } = useSession();
  const packages = useGetPackagesDataQuery(session?.tokens.accessToken ?? '');

  const packagePlannerTabs: TabProviderModel = useMemo(() => {
    return packages
      ? {
          isHidden: packages === null,
          tabs: [
            {
              isDefault: true,
              children: <PackageTableClient packages={packages} token={session?.tokens.accessToken ?? ''} />,
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
  }, [packages]);

  return (
    <div className='w-3/4 mx-auto flex flex-col gap-3'>
      <span className='text-3xl font-bold'>Csomagtervezés</span>
      {packages !== null && <TabProvider {...packagePlannerTabs} tabListStyle='w-1/3' />}
    </div>
  );
}
