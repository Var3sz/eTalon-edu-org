import LoadingFullScreen from '@/app/loading';
import CreateCourseDatesColumns from '@/components/columns/course/create-course-dates-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useInitCreateCourseDatesDialog from '@/hooks/courses/edit-course/use-init-create-course-dates-dialog';
import { CreateCourseDatesFormModel } from '@/models/course/types';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Control, useWatch } from 'react-hook-form';

type CreateCourseDatesDialogProps = {
  courseId: string;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function CreateCourseDatesDialog({ courseId, setOpenChangeDialog }: CreateCourseDatesDialogProps) {
  const { form, isPending, onValidSubmit, onInvalidSubmit } = useInitCreateCourseDatesDialog({
    courseId,
    setOpenChangeDialog,
  });

  const formValues = useWatch({ control: form.control }) as CreateCourseDatesFormModel;

  const [tableLength, setTableLength] = useState<number>(formValues.CourseDateList.length);

  useEffect(() => {
    setTableLength(formValues.CourseDateList.length);
  }, [formValues.CourseDateList.length]);

  const createColumns = CreateCourseDatesColumns<Pick<any, keyof CreateCourseDatesFormModel[]>>(
    form.control as unknown as Control<Pick<any, keyof CreateCourseDatesFormModel[]>>,
    formValues.Helpers.inEdit,
    tableLength
  );

  return (
    <div>
      {isPending && <LoadingFullScreen />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='flex flex-col gap-3'>
          <SimpleTable
            columns={createColumns}
            defaultData={formValues.CourseDateList}
            form={{ formId: 'CourseDateList', formSetValue: form.setValue }}
            newRowElement={{ id: null, date: null, description: null }}
          />
          <div className='flex gap-5 mt-5 self-end'>
            <Button
              variant={'destructive'}
              type='button'
              onClick={(e) => {
                e.preventDefault();
                setOpenChangeDialog && setOpenChangeDialog(false);
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
