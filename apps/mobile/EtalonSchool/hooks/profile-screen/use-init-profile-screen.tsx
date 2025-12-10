import { useMemo } from 'react';
import { User } from '../../models/auth/auth';
import { ProfileDto } from '../../models/profile/types';
import useGetMyProfileDataQuery from './use-get-my-profile-data-query';

type UseInitProfileScreenProps = {
  user: User | null;
  getAccessToken: () => Promise<string | null>;
};

export default function useInitProfileScreen({ user, getAccessToken }: UseInitProfileScreenProps) {
  const { data: profileDataResponse } = useGetMyProfileDataQuery({ userId: user?.id ?? 0, getAccessToken });
  const profileData: ProfileDto | null =
    profileDataResponse?.status === 200 && profileDataResponse.data ? profileDataResponse.data : null;

  const getInitials = (name?: string) => {
    if (!name) return '';
    const parts = name.trim().split(' ').filter(Boolean);

    if (parts.length === 1) {
      return parts[0].charAt(0).toUpperCase();
    }

    return parts[0].charAt(0).toUpperCase() + parts[1].charAt(0).toUpperCase();
  };

  return useMemo(() => ({ profileData, getInitials }), [profileData, getInitials]);
}
