'use client';

import LoadingFullScreen from '@/app/loading';
import StudentColumns from '@/components/columns/student/student-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import useInitCourseClient from '@/hooks/courses/use-init-course-client';

import { Button } from '../ui/button';
import { Form } from '../ui/form';

type CourseClientModel = {
  courseId: string;
};

export default function CourseClient({ courseId }: CourseClientModel) {
  const { form, isPending, isLoading, onInvalidSubmit, onValidSubmit, resetForm, CourseId, courseData, dateCols } =
    useInitCourseClient({
      courseId: courseId,
    });

  return (
    <div className='w-3/4 py-10 mx-auto'>
      {isPending && <LoadingFullScreen />}
      {isLoading && <LoadingFullScreen />}
      <span className='block font-bold text-3xl mb-3'>Jelenléti adatok{CourseId ? ` - ${CourseId}` : ''}</span>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='flex flex-col'>
          <SimpleTable
            columns={StudentColumns({
              courseId: courseId,
              courseData: courseData,
              dateColumns: dateCols,
              formControl: form.control,
            })}
            defaultData={courseData}
          />
          <div className='flex gap-5 mt-5 self-end'>
            <Button
              variant='destructive'
              type='button'
              onClick={(e) => {
                e.preventDefault();
                resetForm();
              }}
            >
              Mégse
            </Button>
            <Button variant='default' type='submit'>
              Mentés
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
