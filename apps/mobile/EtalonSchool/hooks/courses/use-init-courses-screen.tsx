import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import Toast from 'react-native-toast-message';

import { UpdateCourseStatusRequest } from '../../models/courses/action/update-course-status-action';
import { CourseDto, UpdateCourseDto } from '../../models/courses/types';
import useGetCoursesDataQuery from './use-get-courses-data-query';

type UseInitCoursesScreenProps = {
  getAccessToken: () => Promise<string | null>;
};

export default function useInitCoursesScreen({ getAccessToken }: UseInitCoursesScreenProps) {
  const queryClient = useQueryClient();

  const { data: coursesDataResponse } = useGetCoursesDataQuery({ getAccessToken: getAccessToken });
  const courses: CourseDto[] | [] =
    coursesDataResponse?.status === 200 && coursesDataResponse.data ? coursesDataResponse.data : [];

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
  const [selectedCourse, setSelectedCourse] = useState<CourseDto | null>(null);

  const handlePressCourse = (course: CourseDto) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  const handleLongPressCourse = (course: CourseDto) => {
    setSelectedCourse(course);
    setConfirmDialogOpen(true);
  };

  const handleCloseModal = () => {
    setConfirmDialogOpen(false);
  };

  const handlePositiveEvent = async () => {
    const token = await getAccessToken();
    const { id, location, group, ...body } = selectedCourse!;

    const parsedBody = {
      ...body,
      locked: true,
    } as UpdateCourseDto;

    const updateResponse = await UpdateCourseStatusRequest(parsedBody, id, token ?? '');
    if (updateResponse.status === 200 || updateResponse.status === 201) {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      Toast.show({
        type: 'success',
        text1: 'Sikeres lezárás!',
      });
      setConfirmDialogOpen(false);
    } else {
      Toast.show({
        type: 'error',
        text1: 'Sikertelen lezárás!',
      });
    }
  };

  return useMemo(
    () => ({
      courses,
      selectedCourse,
      dialogOpen,
      confirmDialogOpen,
      setDialogOpen,
      setConfirmDialogOpen,
      handlePressCourse,
      handleLongPressCourse,
      handleCloseModal,
      handlePositiveEvent,
    }),
    [
      courses,
      selectedCourse,
      dialogOpen,
      confirmDialogOpen,
      setDialogOpen,
      setConfirmDialogOpen,
      handlePressCourse,
      handleLongPressCourse,
      handleCloseModal,
      handlePositiveEvent,
    ]
  );
}
