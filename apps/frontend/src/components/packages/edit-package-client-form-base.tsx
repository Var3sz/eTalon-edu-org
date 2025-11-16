import LoadingFullScreen from '@/app/loading';
import useGetGroupsQuery from '@/hooks/group/use-get-groups-query';
import useGetLocationsQuery from '@/hooks/location/use-get-locations-query';
import { RawPackageDto } from '@/models/Api';
import { useWatch } from 'react-hook-form';
import { Form } from '../ui/form';
import { UpdatePackageFormModel } from '@/models/package/types';
import FormTextInput from '../form/form-text-input';
import { FormLocales } from '@/locales/form-locales';
import FormNumberInput from '../form/form-number-input';
import FormSelectInput from '../form/form-select-input';
import { ItemModel } from '@/models/ui/form-props';
import { Button } from '../ui/button';
import useInitEditPackageClientFormBase from '@/hooks/packages/use-init-edit-package-client-form-base';

type EditPackageClientFormBaseProps = {
  packageId: string;
  packageData: RawPackageDto | null;
  token: string;
};

export default function EditPackageClientFormBase({ packageId, packageData, token }: EditPackageClientFormBaseProps) {
  const { form, isPending, onValidFormSubmit, onInvalidFormSubmit } = useInitEditPackageClientFormBase(
    packageId,
    packageData!,
    token
  );

  const formValues = useWatch({ control: form.control }) as UpdatePackageFormModel;

  const groups = useGetGroupsQuery(token);
  const locations = useGetLocationsQuery(token);

  return (
    <div>
      {isPending && <LoadingFullScreen />}
      <span className='text-3xl font-bold'>Csomag adatok kezelése</span>
      <Form {...form}>
        <form
          className='mt-[50px] flex flex-col gap-10'
          onSubmit={form.handleSubmit(onValidFormSubmit, onInvalidFormSubmit)}
        >
          <div className='flex flex-wrap gap-10'>
            <FormTextInput
              id='type'
              formControl={form.control}
              label={FormLocales.package.type}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormTextInput
              id='packageId'
              formControl={form.control}
              label={FormLocales.package.packageId}
              inEdit={formValues.Helpers.inEdit}
            />
            <FormNumberInput
              id='price'
              formControl={form.control}
              label={FormLocales.package.price}
              unitOfMeasureLabel='Ft'
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
                disabled={packageData?.isAssigned}
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
