import { Control, useWatch } from 'react-hook-form';

import UpdateCourseDataColumns from '@/components/columns/course/update-courses-data-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useGetCoursesForModificationQuery from '@/hooks/courses/course-plan/use-get-courses-for-modification-query';
import useInitCoursePlanData from '@/hooks/courses/course-plan/use-init-course-plan-data';
import useGetGroupsQuery from '@/hooks/group/use-get-groups-query';
import useGetLocationsQuery from '@/hooks/location/use-get-locations-query';
import { UpdateCourseListModel, UpdateCoursesFormModel } from '@/models/course/types';
import LoadingFullScreen from '@/app/loading';

export default function CoursePlanData() {
  const coursesData = useGetCoursesForModificationQuery();
  const locations = useGetLocationsQuery();
  const groups = useGetGroupsQuery();

  const { form, isPending, onValidFormSubmit, onInvalidFormSubmit } = useInitCoursePlanData({
    coursesData: coursesData!,
  });

  const formValues = useWatch(form) as UpdateCourseListModel;

  const updateCoursesColumns = UpdateCourseDataColumns<Pick<any, keyof UpdateCoursesFormModel>>(
    form.control as unknown as Control<Pick<any, keyof UpdateCoursesFormModel>>,
    form.setValue,
    locations!,
    groups!,
    formValues.Helpers.inEdit
  );

  return (
    <Form {...form}>
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
    </Form>
  );
}
