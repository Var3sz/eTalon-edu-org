import { Control, useWatch } from 'react-hook-form';

import UpdateCourseDataColumns from '@/components/columns/course/update-courses-data-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useInitCoursePlanData from '@/hooks/courses/course-plan/use-init-course-plan-data';
import useGetGroupsQuery from '@/hooks/group/use-get-groups-query';
import useGetLocationsQuery from '@/hooks/location/use-get-locations-query';
import { UpdateCourseListModel, UpdateCoursesFormModel } from '@/models/course/types';
import LoadingFullScreen from '@/app/loading';
import useGetCoursesDataQuery from '@/hooks/courses/course-plan/use-get-courses-data-query';
import { DataTable } from '@/components/tables/data-table';
import CoursePlanColumns from '@/components/columns/course/course-plan-columns';

export default function CoursePlanData() {
  const coursesData = useGetCoursesDataQuery();

  console.log(coursesData);

  return (
    <>
      <DataTable columns={CoursePlanColumns()} data={coursesData ?? []} />
      {/* <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidFormSubmit, onInvalidFormSubmit)} className='flex flex-col gap-5'>
        {isPending && <LoadingFullScreen />}
        <SimpleTable
          columns={updateCoursesColumns}
          defaultData={formValues.CourseList as UpdateCoursesFormModel[]}
          form={{ formSetValue: form.setValue, formId: 'CourseList' }}
          newRowElement={{
            id: null,
            courseId: null,
            description: null,
            price: null,
            active: true,
            endTime: null,
            groupId: null,
            headCount: null,
            locationId: null,
            maxHeadcount: null,
            startDate: null,
            startTime: null,
            locked: false,
          }}
        />
        <div className='flex self-end gap-5'>
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
    </Form> */}
    </>
  );
}
