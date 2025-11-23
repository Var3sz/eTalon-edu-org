import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';

import { UpdateCourseStatusRequest } from '../../models/courses/action/update-course-status-action';
import { CourseDto, UpdateCourseDto } from '../../models/courses/types';
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
