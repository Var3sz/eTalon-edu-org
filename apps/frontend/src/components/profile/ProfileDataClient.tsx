import { useEffect } from 'react';

import { ProfileDto } from '@/models/Api';

type ProfileDataClientModel = {
  profileData: ProfileDto;
};

export default function ProfileDataClient({ profileData }: ProfileDataClientModel) {
  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'details');
    window.history.replaceState(null, '', url.toString());
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      <span className='text-4xl font-bold'>Profil</span>
      {profileData && (
        <div className='flex gap-5'>
          <div className='flex flex-col'>
            <span className='font-bold'>E-mail</span>
            <span>{profileData.email}</span>
          </div>
          <div className='flex flex-col'>
            <span className='font-bold'>Név</span>
            <span>{profileData.name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
