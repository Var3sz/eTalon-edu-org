'use client';

import { studentColumns } from '@/components/columns/student/student-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import { Student, students } from '@/models/course/types';
import { BaseServerPropsWithId } from '@/models/page/types';

async function getStudents(courseId: string): Promise<Student[]> {
  return students.filter((s) => s.courseId === courseId);
}

export default async function Page({ params }: BaseServerPropsWithId) {
  const data = await getStudents(params.id);
  return (
    <div className='container mx-auto py-10'>
      <SimpleTable columns={studentColumns} data={data} />
    </div>
  );
}
