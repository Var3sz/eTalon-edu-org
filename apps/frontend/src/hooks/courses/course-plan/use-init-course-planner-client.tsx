import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useTransition } from 'react';

import { InactivateCourse } from '@/api/models/serviceEndpoints/course';
import { toast } from '@/components/ui/use-toast';

import useGetCoursesDataQuery from './use-get-courses-data-query';

export default function useInitCoursePlannerClient(token: string) {
  const [isPending, startTransaction] = useTransition();
  const queryClient = useQueryClient();

  const coursesData = useGetCoursesDataQuery(token ?? '');

  const inactiveCourseFunction = async (courseId: number) => {
    startTransaction(async () => {
      const deleteResponse = await InactivateCourse<any, any>(courseId, token);

      if (deleteResponse.status === 200) {
        queryClient.invalidateQueries({ queryKey: ['courses'] });
        toast({
          title: 'Sikeres törlés!',
          variant: 'success',
        });
      } else {
        toast({
          title: 'Sikertelen törlés!',
          description: deleteResponse.status === 500 && deleteResponse.error.Message,
          variant: 'destructive',
        });
      }
    });
  };

  return useMemo(
    () => ({ coursesData, isPending, inactiveCourseFunction }),
    [coursesData, isPending, inactiveCourseFunction]
  );
}
