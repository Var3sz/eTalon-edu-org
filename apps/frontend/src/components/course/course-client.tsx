'use client';

import StudentColumns from '@/components/columns/student/student-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import useInitCourseClient from '@/hooks/courses/use-init-course-client';

type CourseClientModel = {
  courseId: string;
};

export default function CourseClient({ courseId }: CourseClientModel) {
  const { courseData } = useInitCourseClient({ courseId: courseId });

  return (
    <div className='container mx-auto py-10 flex flex-col gap-3'>
      <span className='font-bold text-3xl'>Jelenléti adatok</span>
      <SimpleTable
        columns={StudentColumns()}
        defaultData={courseData}
        hiddenColumnIds={[
          'id',
          'email',
          'lastname',
          'firstname',
          'billCompany',
          'city',
          'zip',
          'address',
          'vatNumber',
          'childrenMail',
          'mobile',
          'billingTypeId',
        ]}
      />
    </div>
  );
}
