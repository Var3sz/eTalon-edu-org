'use client';

import StudentColumns from '@/components/columns/student/student-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import useInitCourseClient from '@/hooks/courses/use-init-course-client';
import { Form } from '../ui/form';
import { useWatch } from 'react-hook-form';
import { Button } from '../ui/button';

type CourseClientModel = {
  courseId: string;
};

export default function CourseClient({ courseId }: CourseClientModel) {
  const { form, onInvalidSubmit, onValidSubmit, CourseId, courseData, dateCols } = useInitCourseClient({
    courseId: courseId,
  });

  const formValues = useWatch({ control: form.control }) as any;
  console.log(formValues);

  return (
    <div className='container mx-auto py-10 flex flex-col gap-3'>
      <span className='font-bold text-3xl'>Jelenléti adatok - {CourseId}</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)}>
          <SimpleTable
            columns={StudentColumns(courseData, dateCols, form.control)}
            defaultData={courseData}
            hiddenColumnIds={[
              'studentId',
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
          <Button variant={'default'} type='submit'>
            Mentés
          </Button>
        </form>
      </Form>
    </div>
  );
}
