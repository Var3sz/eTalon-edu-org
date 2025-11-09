'use client';

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import { RoleTypes } from '@/api/consts/roles';
import useGetMyProfileQuery from '@/hooks/profile/use-get-my-profile-query';
import { ProfileDto } from '@/models/Api';

import ManageGroupsClient from '../management/manage-groups-client';
import ManageLocationsClient from '../management/manage-locations-client';
import TabProvider, { TabProviderModel } from '../tabs/tab-provider';
import ProfileDataClient from './ProfileDataClient';

type ProfileClientProps = {
  userId: number;
};

export default function ProfileClient({ userId }: ProfileClientProps) {
  const { data: session } = useSession();

  const { data: profileDataResponse } = useGetMyProfileQuery(userId, session?.tokens.accessToken ?? '');

  const profileData: ProfileDto | null =
    profileDataResponse.status === 200 && profileDataResponse.data !== undefined ? profileDataResponse.data : null;

  const profileTabs: TabProviderModel = useMemo(() => {
    return profileDataResponse.status === 200
      ? {
          isHidden: false,
          tabs: [
            {
              isDefault: true,
              children: <ProfileDataClient profileData={profileData!} />,
              key: 'details',
              label: 'Profil adatok',
              tiggerStyle: 'flex gap-3',
              visible: true,
            },
            {
              children: <ManageGroupsClient token={session?.tokens.accessToken ?? ''} />,
              key: 'groups',
              label: 'Csoportok kezelése',
              tiggerStyle: 'flex gap-3',
              visible: profileDataResponse.data.roleId === RoleTypes.ADMIN,
              contentStyle: 'w-3/4',
            },
            {
              children: <ManageLocationsClient token={session?.tokens.accessToken ?? ''} />,
              key: 'locations',
              label: 'Helyszínek kezelése',
              tiggerStyle: 'flex gap-3',
              visible: profileDataResponse.data.roleId === RoleTypes.ADMIN,
              contentStyle: 'w-3/4',
            },
          ],
        }
      : ({ isHidden: true, tabs: [] } as TabProviderModel);
  }, [profileDataResponse.status === 200 && profileDataResponse.data]);

  return (
    <div className='w-3/4 mx-auto flex flex-col gap-3'>
      <span className='text-3xl font-bold'>Profil adatok</span>
      <TabProvider {...profileTabs} />
    </div>
  );
}
