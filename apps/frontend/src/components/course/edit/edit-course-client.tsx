'use client';

import { useSession } from 'next-auth/react';
import { useMemo } from 'react';

import TabProvider, { TabProviderModel } from '@/components/tabs/tab-provider';
import { useGetCourseDataByIdQuery } from '@/hooks/courses/edit-course/use-get-course-data-by-id-query';
import { CourseDto } from '@/models/Api';

import CourseInvoiceDateManagementClient from './course-invoice-date-management-client';
import CoursePlanDateManagementClient from './course-plan-date-management-client';
import EditCourseClientFormBase from './edit-course-client-form-base';

type EditCourseClientProps = {
  courseId: string;
};

export default function EditCourseClient({ courseId }: EditCourseClientProps) {
  const { data: session } = useSession();

  const { data: courseDataResponse } = useGetCourseDataByIdQuery(courseId, session?.tokens.accessToken ?? '');

  const courseData: CourseDto | null =
    courseDataResponse.status === 200 && courseDataResponse.data !== undefined ? courseDataResponse.data : null;

  const courseEditTabs: TabProviderModel = useMemo(() => {
    return courseDataResponse.status === 200
      ? {
          isHidden: false,
          tabs: [
            {
              isDefault: true,
              children: (
                <EditCourseClientFormBase
                  courseId={courseId}
                  courseData={courseData}
                  token={session?.tokens.accessToken ?? ''}
                />
              ),
              key: 'details',
              label: 'Kurzus adatok',
              tiggerStyle: 'flex gap-3',
              visible: true,
            },
            {
              children: (
                <CoursePlanDateManagementClient courseId={courseId} token={session?.tokens.accessToken ?? ''} />
              ),
              key: 'dates',
              label: 'Kurzus dátumok',
              visible: true,
            },
            {
              children: (
                <CourseInvoiceDateManagementClient courseId={courseId} token={session?.tokens.accessToken ?? ''} />
              ),
              key: 'invoiceDates',
              label: 'Számlázási dátumok',
              visible: true,
            },
          ],
        }
      : ({ isHidden: true, tabs: [] } as TabProviderModel);
  }, [courseDataResponse.status === 200 && courseDataResponse.data]);

  return (
    <div className='w-3/4 mx-auto flex flex-col gap-3'>
      <span className='text-3xl font-bold'>Kurzus módosítása - {courseData?.courseId}</span>
      <TabProvider {...courseEditTabs} />
    </div>
  );
}
