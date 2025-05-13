import LoadingFullScreen from '@/app/loading';
import FormDateInput from '@/components/form/form-date-input';
import FormTextInput from '@/components/form/form-text-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useInitEditCourseDateDialog from '@/hooks/courses/edit-course/use-init-edit-course-date-dialog';
import { FormLocales } from '@/locales/form-locales';
import { LessonDateDto } from '@/models/Api';
import { UpdateCourseDateFormModel } from '@/models/course/types';
import { Dispatch, SetStateAction } from 'react';
import { useWatch } from 'react-hook-form';

type EditCourseDateDialogProps = {
  courseId: string;
  rowData: LessonDateDto;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function EditCourseDateDialog({ courseId, rowData, setOpenChangeDialog }: EditCourseDateDialogProps) {
  const { form, isPending, onValidSubmit, onInvalidSubmit } = useInitEditCourseDateDialog({
    courseId,
    rowData,
    setOpenChangeDialog,
  });
  const formValues = useWatch({ control: form.control }) as UpdateCourseDateFormModel;

  return (
    <div>
      {isPending && <LoadingFullScreen />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='flex flex-col gap-5'>
          <div className='flex gap-5'>
            <FormDateInput
              id='date'
              formControl={form.control}
              label={FormLocales.courseDate.date}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormTextInput
              id='description'
              formControl={form.control}
              label={FormLocales.courseDate.description}
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
