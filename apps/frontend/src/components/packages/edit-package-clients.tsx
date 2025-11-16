'use client';

import { useSession } from 'next-auth/react';
import TabProvider, { TabProviderModel } from '../tabs/tab-provider';
import { RawPackageDto } from '@/models/Api';
import { useMemo } from 'react';
import EditPackageClientFormBase from './edit-package-client-form-base';
import { useGetPackageDataByIdQuery } from '@/hooks/packages/use-get-package-data-by-id-query';

type EditPackageClientProps = {
  packageId: string;
};

export default function EditPackageClient({ packageId }: EditPackageClientProps) {
  const { data: session } = useSession();

  const { data: packageDataResponse } = useGetPackageDataByIdQuery(packageId, session?.tokens.accessToken ?? '');

  const packageData: RawPackageDto | null =
    packageDataResponse.status === 200 && packageDataResponse.data !== undefined ? packageDataResponse.data : null;

  const packageEditTabs: TabProviderModel = useMemo(() => {
    return packageDataResponse.status === 200
      ? {
          isHidden: false,
          tabs: [
            {
              isDefault: true,
              children: (
                <EditPackageClientFormBase
                  packageId={packageId}
                  packageData={packageData}
                  token={session?.tokens.accessToken ?? ''}
                />
              ),
              key: 'details',
              label: 'Csomag adatok',
              tiggerStyle: 'flex gap-3',
              visible: true,
            },
          ],
        }
      : ({ isHidden: true, tabs: [] } as TabProviderModel);
  }, [packageDataResponse.status === 200 && packageDataResponse.data]);

  return (
    <div className='w-3/4 mx-auto flex flex-col gap-3'>
      <span className='text-3xl font-bold'>Csomag módosítása</span>
      <TabProvider {...packageEditTabs} />
    </div>
  );
}
