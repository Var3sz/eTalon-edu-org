import { QueryClient } from '@tanstack/react-query';

import { GetMyProfile } from '@/api/models/serviceEndpoints/profile';
import { ProfileDto } from '@/models/Api';

export const prefetchGetMyProfileQuery = async (queryClient: QueryClient, userId: number, token: string) => {
  await queryClient.prefetchQuery({
    queryKey: ['my-profile', userId],
    queryFn: () => GetMyProfile<ProfileDto>(userId, token),
  });
};
