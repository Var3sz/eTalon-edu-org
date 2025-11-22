import { useQuery } from '@tanstack/react-query';
import { GetActiveCourses } from '../../api/models/serviceEndpoints/main';
import { CourseDto } from '../../models/courses/types';

type UseGetCoursesDataQueryProps = {
  getAccessToken: () => Promise<string | null>;
};

export default function useGetCoursesDataQuery({ getAccessToken }: UseGetCoursesDataQueryProps) {
  return useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const token = await getAccessToken();
      return await GetActiveCourses<CourseDto[]>(token ?? '');
    },
  });
}
