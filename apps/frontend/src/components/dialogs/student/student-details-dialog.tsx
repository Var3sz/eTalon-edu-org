import { Dispatch, SetStateAction, useTransition } from 'react';
import { useWatch } from 'react-hook-form';

import LoadingFullScreen from '@/app/loading';
import FormNumberInput from '@/components/form/form-number-input';
import FormSelectInput from '@/components/form/form-select-input';
import FormTextInput from '@/components/form/form-text-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useGetBillingTypesQuery from '@/hooks/billing-type/use-get-billing-types-query';
import { StudentAttendance } from '@/hooks/courses/use-init-course-client';
import useInitStudentDetailsDialog from '@/hooks/students/use-init-student-details-dialog';
import { UpdateStudentDetailsFormModel } from '@/models/students/types';
import StudentParentData from './student-parent-data';
import StudentDefaultData from './student-default-data';
import StudentInvoiceData from './student-invoice-data';

type StudentDetailsDialogProps = {
  courseId: string;
  studentData: StudentAttendance;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function StudentDetailsDialog({
  courseId,
  studentData,
  setOpenChangeDialog,
}: StudentDetailsDialogProps) {
  const [isPending, startTransaction] = useTransition();

  const { form, onValidFormSubmit, onInvalidFormSubmit } = useInitStudentDetailsDialog({
    courseId: courseId,
    studentData: studentData,
    startTransaction: startTransaction,
    setOpenChangeDialog: setOpenChangeDialog,
  });
  const formValues = useWatch({ control: form.control }) as UpdateStudentDetailsFormModel;

  const formParams = { formControl: form.control, formSetValue: form.setValue, inEdit: formValues.Helpers.inEdit };

  return (
    <div className='max-h-[800px] overflow-y-auto'>
      {isPending && <LoadingFullScreen />}
      <Form {...form}>
        <form className='flex flex-col gap-3 mt-5'>
          <StudentParentData {...formParams} />
          <StudentDefaultData {...formParams} />
          <StudentInvoiceData {...formParams} />
          {formValues.Helpers.inEdit ? (
            <div className='flex gap-5 self-end'>
              <Button
                variant='destructive'
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  form.setValue('Helpers.inEdit', false);
                }}
              >
                Mégse
              </Button>
              <Button
                variant='default'
                type='button'
                onClick={(e) => {
                  form.handleSubmit(onValidFormSubmit, onInvalidFormSubmit)();
                }}
              >
                Mentés
              </Button>
            </div>
          ) : (
            <div className='flex gap-5 self-end'>
              <Button
                variant='modify'
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  form.setValue('Helpers.inEdit', true);
                }}
              >
                Módosítás
              </Button>
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
