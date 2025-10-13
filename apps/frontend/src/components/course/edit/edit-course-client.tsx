'use client';

import { useMemo } from 'react';

import FormSwitchInput from '@/components/form/form-switch-input';
import TabProvider, { TabProviderModel } from '@/components/tabs/tab-provider';
import { useGetCourseDataByIdQuery } from '@/hooks/courses/edit-course/use-get-course-data-by-id-query';
import { CourseDto } from '@/models/Api';

import CoursePlanDateManagementClient from './course-plan-date-management-client';
import EditCourseClientFormBase from './edit-course-client-form-base';

type EditCourseClientProps = {
  courseId: string;
};

export default function EditCourseClient({ courseId }: EditCourseClientProps) {
  const courseData = useGetCourseDataByIdQuery(courseId);

  const courseEditTabs: TabProviderModel = useMemo(() => {
    return courseData !== undefined
      ? {
          isHidden: courseData === null,
          tabs: [
            {
              isDefault: true,
              children: <EditCourseClientFormBase courseId={courseId} courseData={courseData} />,
              key: 'details',
              label: 'Kurzus adatok',
              tiggerStyle: 'flex gap-3',
              visible: true,
            },
            {
              children: <CoursePlanDateManagementClient courseId={courseId} />,
              key: 'dates',
              label: 'Kurzus dátumok',
              visible: true,
            },
          ],
        }
      : ({ isHidden: true, tabs: [] } as TabProviderModel);
  }, [courseData]);

  return (
    <div className='w-3/4 mx-auto flex flex-col gap-3'>
      <span className='text-3xl font-bold'>Kurzus módosítása - {courseData?.courseId}</span>
      {courseData !== null && <TabProvider {...courseEditTabs} />}
    </div>
  );
}
