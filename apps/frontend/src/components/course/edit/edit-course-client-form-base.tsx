import { useWatch } from 'react-hook-form';

import LoadingFullScreen from '@/app/loading';
import FormDateInput from '@/components/form/form-date-input';
import FormNumberInput from '@/components/form/form-number-input';
import FormSelectInput from '@/components/form/form-select-input';
import FormSwitchInput from '@/components/form/form-switch-input';
import FormTextInput from '@/components/form/form-text-input';
import FormTimePickerInput from '@/components/form/form-time-picker-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useInitEditCourseClientFormBase from '@/hooks/courses/edit-course/use-init-edit-course-client-form-base';
import useGetGroupsQuery from '@/hooks/group/use-get-groups-query';
import useGetLocationsQuery from '@/hooks/location/use-get-locations-query';
import { FormLocales } from '@/locales/form-locales';
import { CourseDto } from '@/models/Api';
import { UpdateCourseFormModel } from '@/models/course/types';
import { ItemModel } from '@/models/ui/form-props';

type EditCourseClientFormBaseProps = {
  courseId: string;
  courseData: CourseDto | null;
  token: string;
};

export default function EditCourseClientFormBase({ courseId, courseData, token }: EditCourseClientFormBaseProps) {
  const { form, isPending, onValidFormSubmit, onInvalidFormSubmit } = useInitEditCourseClientFormBase(
    courseId,
    courseData!,
    token
  );

  const formValues = useWatch({ control: form.control }) as UpdateCourseFormModel;

  const groups = useGetGroupsQuery(token);
  const locations = useGetLocationsQuery(token);

  return (
    <div>
      {isPending && <LoadingFullScreen />}
      <span className='text-3xl font-bold'>Kurzus adatok kezelése</span>
      <Form {...form}>
        <form
          className='mt-[50px] flex flex-col gap-10'
          onSubmit={form.handleSubmit(onValidFormSubmit, onInvalidFormSubmit)}
        >
          <div className='flex flex-wrap gap-10'>
            <FormTextInput
              id='courseId'
              formControl={form.control}
              label={FormLocales.course.courseId}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormTextInput
              id='description'
              formControl={form.control}
              label={FormLocales.course.description}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormNumberInput
              id='maxHeadCount'
              formControl={form.control}
              label={FormLocales.course.maxHeadcount}
              unitOfMeasureLabel='fő'
              inEdit={formValues.Helpers.inEdit}
            />
            <FormDateInput
              id='startDate'
              formControl={form.control}
              label={FormLocales.course.date}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormTimePickerInput
              id='startTime'
              formControl={form.control}
              label={FormLocales.course.from}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormTimePickerInput
              id='endTime'
              formControl={form.control}
              label={FormLocales.course.to}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormSelectInput
              id='groupId'
              formControl={form.control}
              formSetValue={form.setValue}
              items={
                (groups ?? []).map((g) => ({
                  value: g.id,
                  label: g.description,
                })) as ItemModel[]
              }
              label={FormLocales.course.group}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormSelectInput
              id='locationId'
              formControl={form.control}
              formSetValue={form.setValue}
              items={
                (locations ?? []).map((l) => ({
                  value: l.id,
                  label: l.description,
                })) as ItemModel[]
              }
              label={FormLocales.course.location}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormSwitchInput
              id='locked'
              formControl={form.control}
              label={FormLocales.course.lock}
              inEdit={formValues.Helpers.inEdit}
            />
          </div>
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
    </div>
  );
}
