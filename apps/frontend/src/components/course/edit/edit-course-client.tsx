'use client';

import EditCourseClientFormBase from './edit-course-client-form-base';
import { CourseDto } from '@/models/Api';
import { useGetCourseDataByIdQuery } from '@/hooks/courses/edit-course/use-get-course-data-by-id-query';
import TabProvider, { TabProviderModel } from '@/components/tabs/tab-provider';
import { useMemo } from 'react';
import CoursePlanDateManagementClient from './course-plan-date-management-client';

type EditCourseClientProps = {
  courseId: string;
};

export default function EditCourseClient({ courseId }: EditCourseClientProps) {
  const { data: courseDataResponse } = useGetCourseDataByIdQuery(courseId);

  const courseData: CourseDto | null =
    courseDataResponse.status === 200 && courseDataResponse.data !== undefined ? courseDataResponse.data : null;

  const courseEditTabs: TabProviderModel = useMemo(() => {
    return courseDataResponse.status === 200
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
  }, [courseDataResponse.status === 200 && courseDataResponse.data]);

  return courseData !== null && <TabProvider {...courseEditTabs} />;
}
