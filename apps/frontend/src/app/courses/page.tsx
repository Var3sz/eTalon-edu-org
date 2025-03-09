'use client';

import { courseColumns } from '@/components/columns/course/course-columns';
import { DataTable } from '@/components/tables/data-table';
import { Course, courses } from '@/models/course/types';

async function getData(): Promise<Course[]> {
  return courses;
}

export default async function Page() {
  const data = await getData();

  return (
    <div className='container mx-auto py-10'>
      <DataTable columns={courseColumns} data={data} />
    </div>
  );
}
