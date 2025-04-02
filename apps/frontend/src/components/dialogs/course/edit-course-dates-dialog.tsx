import { Dispatch, SetStateAction } from 'react';
import { Control, useWatch } from 'react-hook-form';

import LoadingFullScreen from '@/app/loading';
import EditCourseDatesColumns from '@/components/columns/course/edit-course-dates-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useInitEditCourseDatesDialog from '@/hooks/courses/use-init-edit-course-dates-dialog';
import { CoursesDTO } from '@/models/Api';
import { CourseDateFormModel, EditCourseDatesFormModel } from '@/models/course/types';

type EditCourseDialogProps = {
  rowData: CoursesDTO;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function EditCourseDatesDialog({ rowData, setOpenChangeDialog }: EditCourseDialogProps) {
  const { form, isPending, onValidFormSubmit, onInvalidFormSubmit } = useInitEditCourseDatesDialog({
    courseId: rowData.id,
    setOpenChangeDialog: setOpenChangeDialog,
  });

  const formValues = useWatch(form) as EditCourseDatesFormModel;

  const courseDatesColumns = EditCourseDatesColumns<Pick<any, keyof CourseDateFormModel>>(
    form.control as unknown as Control<Pick<any, keyof CourseDateFormModel>>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onValidFormSubmit, onInvalidFormSubmit)} className='flex flex-col gap-5'>
        {isPending && <LoadingFullScreen />}
        <SimpleTable
          columns={courseDatesColumns}
          defaultData={formValues.CourseDates as CourseDateFormModel[]}
          form={{ formSetValue: form.setValue, formId: 'CourseDates' }}
          newRowElement={{
            id: null,
            date: null,
            description: null,
          }}
        />
        <div className='flex self-end gap-3'>
          <Button
            variant='destructive'
            type='button'
            onClick={(e) => {
              e.preventDefault();
              setOpenChangeDialog && setOpenChangeDialog(false);
            }}
          >
            Mégsem
          </Button>
          <Button variant='default' type='submit'>
            Mentés
          </Button>
        </div>
      </form>
    </Form>
  );
}
