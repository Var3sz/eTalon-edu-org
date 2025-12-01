import { useRouter } from 'expo-router';
import { useMemo } from 'react';

import { CourseDto } from '../../models/courses/types';
import useGetCoursesDataQuery from '../courses/use-get-courses-data-query';

type UseInitAttendanceScreenProps = {
  getAccessToken: () => Promise<string | null>;
};

export default function useInitAttendanceScreen({ getAccessToken }: UseInitAttendanceScreenProps) {
  // Navigáció
  const router = useRouter();

  // Kurzusok lekérdezése
  const { data: coursesDataResponse } = useGetCoursesDataQuery({ getAccessToken: getAccessToken });
  const courses: CourseDto[] | [] =
    coursesDataResponse?.status === 200 && coursesDataResponse.data ? coursesDataResponse.data : [];

  // Eseménykezelők
  const handlePressCourse = (id: number) => {
    router.push({
      pathname: '/attendance/[id]',
      params: { id: id },
    });
  };

  return useMemo(
    () => ({
      courses,
      handlePressCourse,
    }),
    [courses, handlePressCourse]
  );
}
