'use client';

import useGetMyProfileQuery from '@/hooks/profile/use-get-my-profile-query';

type ProfileClientProps = {
  token: string;
  userId: number;
};

export default function ProfileClient({ userId, token }: ProfileClientProps) {
  const profileData = useGetMyProfileQuery(userId, token);

  return (
    <div>
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
