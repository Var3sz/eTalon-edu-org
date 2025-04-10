'use client';

import { useSuspenseQuery } from '@tanstack/react-query';

import { GetMyProfile } from '@/api/models/serviceEndpoints/profile';
import { ProfileDto } from '@/models/Api';

export default function useGetMyProfileQuery(userId: number, token: string) {
  const { data: response } = useSuspenseQuery({
    queryKey: ['my-profile', userId],
    queryFn: () => GetMyProfile<ProfileDto>(userId, token),
  });
  if (response.status === 200) return response.data;
}
