'use client';

import StudentColumns from '@/components/columns/student/student-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import useGetStudentsByCourseIdQuery from '@/hooks/students/action/useGetStudentsByCourseIdQuery';
import { CourseStudentsDTO } from '@/models/Api';

type CourseClientModel = {
  courseId: string;
};

export default function CourseClient({ courseId }: CourseClientModel) {
  const { data: studentsDataResponse } = useGetStudentsByCourseIdQuery(Number(courseId));

  const students: CourseStudentsDTO[] | [] =
    studentsDataResponse.status === 200 && studentsDataResponse.data.length > 0 ? studentsDataResponse.data : [];

  return (
    <div className='container mx-auto py-10 flex flex-col gap-3'>
      <span className='font-bold text-3xl'>Jelenléti adatok</span>
      <SimpleTable
        columns={StudentColumns()}
        defaultData={students}
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
