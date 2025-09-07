import { useEffect } from 'react';

import LoadingFullScreen from '@/app/loading';
import CourseDatesColumns from '@/components/columns/course/edit-course-dates-columns';
import CreateCourseDatesDialog from '@/components/dialogs/course/create-course-dates-dialog';
import CustomInnerStateDialog from '@/components/dialogs/custom-innerstate-dialog';
import { SimpleTable } from '@/components/tables/simple-table';
import AddButton from '@/components/ui/add-button';
import { useGetCourseDatesDataByIdQuery } from '@/hooks/courses/edit-course/use-get-course-dates-data-by-id-query';
import { LessonDateDto } from '@/models/Api';

type CoursePlanDateManagementClientProps = {
  courseId: string;
};

export default function CoursePlanDateManagementClient({ courseId }: CoursePlanDateManagementClientProps) {
  const { data: courseDatesResponse, isLoading } = useGetCourseDatesDataByIdQuery(courseId);

  const courseDates: LessonDateDto[] =
    courseDatesResponse?.status === 200 && courseDatesResponse.data.length > 0 ? courseDatesResponse.data : [];

  const courseDateCols = CourseDatesColumns(courseId);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'dates');
    window.history.replaceState(null, '', url.toString());
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      {isLoading && <LoadingFullScreen />}
      <div className='flex gap-5'>
        <span className='text-3xl font-bold'>Kurzus dátumok kezelése</span>
        <CustomInnerStateDialog
          title='Kurzus dátumok hozzáadása'
          triggerElement={<AddButton title='Új dátumok' buttonStyle='self-center' asChild />}
        >
          <CreateCourseDatesDialog courseId={courseId} />
        </CustomInnerStateDialog>
      </div>
      <SimpleTable columns={courseDateCols} defaultData={courseDates} />
    </div>
  );
}
