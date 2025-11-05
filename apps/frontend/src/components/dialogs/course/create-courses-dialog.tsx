import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Control, useWatch } from 'react-hook-form';

import LoadingFullScreen from '@/app/loading';
import CreateCoursesColumns from '@/components/columns/course/create-courses-columns';
import { SimpleTable } from '@/components/tables/simple-table';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useInitCreateCoursesDialog from '@/hooks/courses/edit-course/use-init-create-courses-dialog';
import useGetGroupsQuery from '@/hooks/group/use-get-groups-query';
import useGetLocationsQuery from '@/hooks/location/use-get-locations-query';
import { CreateCoursesFormModel } from '@/models/course/types';

type CreateCoursesDialogProps = {
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
  token: string;
};

export default function CreateCoursesDialog({ setOpenChangeDialog, token }: CreateCoursesDialogProps) {
  const { form, isPending, onValidSubmit, onInvalidSubmit } = useInitCreateCoursesDialog({
    setOpenChangeDialog,
    token,
  });

  const groups = useGetGroupsQuery(token);
  const locations = useGetLocationsQuery(token);

  const formValues = useWatch({ control: form.control }) as CreateCoursesFormModel;

  console.log(formValues);

  const [tableLength, setTableLength] = useState<number>(formValues.CourseList.length);

  useEffect(() => {
    setTableLength(formValues.CourseList.length);
  }, [formValues.CourseList.length]);

  const createColumns = CreateCoursesColumns<Pick<any, keyof CreateCoursesFormModel[]>>(
    form.control as unknown as Control<Pick<any, keyof CreateCoursesFormModel[]>>,
    formValues.Helpers.inEdit,
    tableLength,
    groups!,
    locations!
  );

  return (
    <div className='max-w-[1000px]'>
      {isPending && <LoadingFullScreen />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='flex flex-col gap-3'>
          <SimpleTable
            columns={createColumns}
            defaultData={formValues.CourseList}
            form={{ formId: 'CourseList', formSetValue: form.setValue }}
            newRowElement={{
              description: null,
              courseId: null,
              headcount: 0,
              maxHeadCount: null,
              startDate: null,
              startTime: null,
              endTime: null,
              active: true,
              locked: false,
              groupId: null,
              locationId: null,
            }}
          />
          <div className='flex gap-5 mt-5 self-end'>
            <Button
              variant='destructive'
              type='button'
              onClick={(e) => {
                e.preventDefault();
                setOpenChangeDialog && setOpenChangeDialog(false);
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
