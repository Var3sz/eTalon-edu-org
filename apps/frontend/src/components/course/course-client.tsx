'use client';

import LoadingFullScreen from '@/app/loading';
import StudentColumns from '@/components/columns/student/student-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import useInitCourseClient, { StudentAttendanceForm } from '@/hooks/courses/use-init-course-client';

import { Button } from '../ui/button';
import { Form } from '../ui/form';
import { useWatch } from 'react-hook-form';
import { useSession } from 'next-auth/react';

type CourseClientModel = {
  courseId: string;
};

export default function CourseClient({ courseId }: CourseClientModel) {
  const { data: session } = useSession();

  const { form, isPending, isLoading, onInvalidSubmit, onValidSubmit, CourseId, courseData, dateCols } =
    useInitCourseClient({
      courseId: courseId,
      token: session?.tokens.accessToken ?? '',
    });

  const formValues = useWatch({ control: form.control }) as StudentAttendanceForm;

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
              inEdit: formValues.Helpers.inEdit,
              token: session?.tokens.accessToken ?? '',
            })}
            defaultData={courseData}
          />
          <div className='flex self-end gap-5 mt-3'>
            {formValues.Helpers.inEdit ? (
              <div className='flex gap-3'>
                <Button
                  variant='destructive'
                  type='button'
                  onClick={(e) => {
                    e.preventDefault();
                    form.setValue('Helpers.inEdit', false);
                  }}
                >
                  Mégsem
                </Button>
                <Button variant='default' type='submit'>
                  Mentés
                </Button>
              </div>
            ) : (
              <Button
                variant='modify'
                onClick={(e) => {
                  e.preventDefault();
                  form.setValue('Helpers.inEdit', true);
                }}
              >
                Módosítás
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
