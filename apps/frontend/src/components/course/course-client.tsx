'use client';

import StudentColumns from '@/components/columns/student/student-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import useInitCourseClient from '@/hooks/courses/use-init-course-client';
import { Form } from '../ui/form';
import { useWatch } from 'react-hook-form';
import { Button } from '../ui/button';
import LoadingFullScreen from '@/app/loading';

type CourseClientModel = {
  courseId: string;
};

export default function CourseClient({ courseId }: CourseClientModel) {
  const { form, isPending, onInvalidSubmit, onValidSubmit, resetForm, CourseId, courseData, dateCols } =
    useInitCourseClient({
      courseId: courseId,
    });

  return (
    <div className='container mx-auto py-10 flex flex-col gap-3'>
      {isPending && <LoadingFullScreen />}
      <span className='font-bold text-3xl'>Jelenléti adatok - {CourseId}</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='flex flex-col'>
          <SimpleTable
            columns={StudentColumns({ dateColumns: dateCols, formControl: form.control })}
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
          <div className='flex gap-5 mt-5 self-end'>
            <Button
              variant={'destructive'}
              type='button'
              onClick={(e) => {
                e.preventDefault();
                resetForm();
              }}
            >
              Mégse
            </Button>
            <Button variant={'default'} type='submit'>
              Mentés
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
