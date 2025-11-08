import LoadingFullScreen from '@/app/loading';
import FormDateInput from '@/components/form/form-date-input';
import FormTextInput from '@/components/form/form-text-input';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import useInitEditGroupDialog from '@/hooks/group/use-init-edit-group-dialog';
import { FormLocales } from '@/locales/form-locales';
import { GroupDto } from '@/models/Api';
import { UpdateGroupFormModel } from '@/models/group/types';
import { Dispatch, SetStateAction } from 'react';
import { useWatch } from 'react-hook-form';

type EditGroupDialogModel = {
  rowData: GroupDto;
  token: string;
  setOpenChangeDialog?: Dispatch<SetStateAction<boolean>>;
};

export default function EditGroupDialog({ rowData, token, setOpenChangeDialog }: EditGroupDialogModel) {
  const { form, isPending, onValidSubmit, onInvalidSubmit } = useInitEditGroupDialog({
    rowData,
    setOpenChangeDialog,
    token,
  });
  const formValues = useWatch({ control: form.control }) as UpdateGroupFormModel;

  return (
    <div>
      {isPending && <LoadingFullScreen />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='flex flex-col gap-5'>
          <div className='flex gap-5'>
            <FormTextInput
              id='description'
              formControl={form.control}
              label={FormLocales.groups.description}
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
