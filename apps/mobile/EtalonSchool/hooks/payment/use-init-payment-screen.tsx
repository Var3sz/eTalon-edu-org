import { useRouter } from 'expo-router';
import { useMemo } from 'react';

import { CourseDto } from '../../models/courses/types';
import useGetCoursesDataQuery from '../courses/use-get-courses-data-query';

type UseInitPaymentScreenProps = {
  getAccessToken: () => Promise<string | null>;
};

export default function useInitPaymentScreen({ getAccessToken }: UseInitPaymentScreenProps) {
  // Navigáció
  const router = useRouter();

  // Kurzusok lekérdezése
  const { data: coursesDataResponse } = useGetCoursesDataQuery({ getAccessToken: getAccessToken });
  const courses: CourseDto[] | [] =
    coursesDataResponse?.status === 200 && coursesDataResponse.data ? coursesDataResponse.data : [];

  // Eseménykezelők
  const handlePressCourse = (id: number) => {
    router.push({
      pathname: '/payment/[id]',
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
