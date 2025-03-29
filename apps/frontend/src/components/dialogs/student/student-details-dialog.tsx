import { Dispatch, SetStateAction, useTransition } from 'react';
import { useWatch } from 'react-hook-form';

import LoadingFullScreen from '@/app/Loading';
import FormNumberInput from '@/components/form/form-number-input';
import FormSelectInput from '@/components/form/form-select-input';
import FormTextInput from '@/components/form/form-text-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useGetBillingTypes from '@/hooks/billing-type/useGetBillingTypes';
import useInitStudentDetailsDialog from '@/hooks/students/useInitStudentDetailsDialog';
import { CourseStudentsDTO } from '@/models/Api';
import { UpdateStudentDetailsFormModel } from '@/models/students/types';
import { ItemModel } from '@/models/ui/form-props';
import FormSwitchInput from '@/components/form/form-switch-input';

type StudentDetailsDialogProps = {
  studentData: CourseStudentsDTO;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function StudentDetailsDialog({ studentData, setOpenChangeDialog }: StudentDetailsDialogProps) {
  const [isPending, startTransaction] = useTransition();

  const { form, onValidFormSubmit, onInvalidFormSubmit } = useInitStudentDetailsDialog({
    studentData: studentData,
    startTransaction: startTransaction,
    setOpenChangeDialog: setOpenChangeDialog,
  });
  const formValues = useWatch({ control: form.control }) as UpdateStudentDetailsFormModel;

  const { billingTypes } = useGetBillingTypes({ startTransaction: startTransaction });

  return (
    <div>
      {isPending && <LoadingFullScreen />}
      <Form {...form}>
        <form
          className='flex flex-col gap-10 mt-5'
          onSubmit={form.handleSubmit(onValidFormSubmit, onInvalidFormSubmit)}
        >
          <div className='flex gap-5'>
            <FormTextInput
              id='children'
              label='Gyermek neve'
              formControl={form.control}
              inEdit={formValues.Helpers.inEdit}
              required
            />
            <FormTextInput
              id='childrenMail'
              label='Gyermek e-mail címe'
              formControl={form.control}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormTextInput
              id='mobile'
              label='Telefonszám'
              formControl={form.control}
              inEdit={formValues.Helpers.inEdit}
            />
          </div>
          <div className='flex gap-5'>
            <FormTextInput
              id='email'
              label='Szülő e-mail címe'
              formControl={form.control}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormTextInput
              id='lastname'
              label='Szülő vezetékneve'
              formControl={form.control}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormTextInput
              id='firstname'
              label='Szülő keresztneve'
              formControl={form.control}
              inEdit={formValues.Helpers.inEdit}
            />
          </div>
          <div className='flex gap-5'>
            <FormNumberInput
              id='zip'
              label='Irányítószám'
              formControl={form.control}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormTextInput id='city' label='Város' formControl={form.control} inEdit={formValues.Helpers.inEdit} />
            <FormTextInput id='address' label='Cím' formControl={form.control} inEdit={formValues.Helpers.inEdit} />
          </div>
          <div className='flex gap-5'>
            <FormTextInput
              id='billCompany'
              label='Cég neve'
              formControl={form.control}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormTextInput
              id='vatNumber'
              label='Adószám'
              formControl={form.control}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormSelectInput
              id='billingTypeId'
              label='Számlázási típus'
              formControl={form.control}
              formSetValue={form.setValue}
              items={
                billingTypes.map((bt) => ({
                  label: bt.description,
                  value: bt.id,
                })) as ItemModel[]
              }
              placeholder='Válasszon számla típust!'
              emptySelect='Nem található ilyen számla típus!'
              inEdit={formValues.Helpers.inEdit}
            />
          </div>
          {formValues.Helpers.inEdit ? (
            <div className='flex gap-5 self-end'>
              <Button
                variant='destructive'
                type='button'
                onClick={(e) => {
                  e.preventDefault();
                  // setOpenChangeDialog && setOpenChangeDialog(false);
                  form.setValue('Helpers.inEdit', false);
                }}
              >
                Mégse
              </Button>
              <Button variant='default' type='submit'>
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
