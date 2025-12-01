import { useQuery } from '@tanstack/react-query';

import { GetAttendanceByCourse } from '../../api/models/serviceEndpoints/main';
import { CourseAttendanceResponse } from '../../models/attendance/types';

type UseGetAttendanceDataByCourseQueryProps = {
  courseId: number;
  getAccessToken: () => Promise<string | null>;
};

export default function useGetAttendanceDataByCourseQuery({
  courseId,
  getAccessToken,
}: UseGetAttendanceDataByCourseQueryProps) {
  return useQuery({
    queryKey: ['attendance-by-course', { courseId: courseId }],
    queryFn: async () => {
      const token = await getAccessToken();
      return await GetAttendanceByCourse<CourseAttendanceResponse>(courseId, token ?? '');
    },
  });
}
