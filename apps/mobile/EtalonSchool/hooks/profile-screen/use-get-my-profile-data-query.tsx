import { useQuery } from '@tanstack/react-query';
import { ProfileDto } from '../../models/profile/types';
import { GetMyProfile } from '../../api/models/serviceEndpoints/main';

type UseGetMyProfileDataQueryProps = {
  userId: number;
  getAccessToken: () => Promise<string | null>;
};

export default function useGetMyProfileDataQuery({ userId, getAccessToken }: UseGetMyProfileDataQueryProps) {
  return useQuery({
    queryKey: ['my-profile', { userId }],
    queryFn: async () => {
      const token = await getAccessToken();
      return await GetMyProfile<ProfileDto>(userId, token ?? '');
    },
  });
}
