import { Dispatch, SetStateAction } from 'react';
import { useWatch } from 'react-hook-form';

import LoadingFullScreen from '@/app/loading';
import FormTextInput from '@/components/form/form-text-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useInitEditLocationDialog from '@/hooks/location/use-init-edit-location-dialog';
import { FormLocales } from '@/locales/form-locales';
import { LocationDto } from '@/models/Api';
import { UpdateLocationFormModel } from '@/models/location/type';

type EditLocationDialogModel = {
  rowData: LocationDto;
  token: string;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function EditLocationDialog({ rowData, token, setOpenChangeDialog }: EditLocationDialogModel) {
  const { form, isPending, onValidSubmit, onInvalidSubmit } = useInitEditLocationDialog({
    rowData,
    setOpenChangeDialog,
    token,
  });
  const formValues = useWatch({ control: form.control }) as UpdateLocationFormModel;

  return (
    <div>
      {isPending && <LoadingFullScreen />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='flex flex-col gap-5'>
          <div className='flex gap-5'>
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
