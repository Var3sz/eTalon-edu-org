import { useState } from 'react';
import NoFormTextInput from '../no-form/no-form-text-input';
import NoFormSelectInput from '../no-form/no-form-select-input';
import useGetLocationsQuery from '@/hooks/location/use-get-locations-query';
import { FormLocales } from '@/locales/form-locales';
import LoadingFullScreen from '@/app/loading';
import { SimpleTable } from '../tables/simple-table';
import useInitPackageAssignClient from '@/hooks/packages/use-init-package-assign-client';
import { Form } from '../ui/form';
import { Button } from '../ui/button';

export default function PackageAssignClient() {
  const locations = useGetLocationsQuery();

  const [type, setType] = useState<string | null>(null);
  const [locationId, setLocationId] = useState<number | null>(null);

  const { form, isPending, columns, data, resetForm, onValidSubmit, onInvalidSubmit } = useInitPackageAssignClient({
    type,
    locationId,
  });

  return (
    <div className='flex flex-col gap-5'>
      {isPending && <LoadingFullScreen />}
      <span className='text-3xl font-bold'>Csomagok hozzárendelése</span>
      <div className='flex gap-5'>
        <NoFormTextInput value={type} setValue={setType} text='Csomag típus' withLabel />
        <NoFormSelectInput
          value={locationId}
          valueType='number'
          setValue={setLocationId}
          text='Helyszín'
          items={
            locations
              ? locations.map((l) => {
                  return {
                    value: l.id,
                    label: l.description,
                  };
                })
              : []
          }
          placeholder={FormLocales.course.selectValues.location.placeholder}
          emptySelect={FormLocales.course.selectValues.location.emptySelect}
        />
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onValidSubmit, onInvalidSubmit)} className='flex flex-col gap-3'>
          {data && data.length > 0 && (
            <SimpleTable columns={columns} defaultData={data} hiddenColumnIds={['courseId']} />
          )}
          <div className='flex gap-5 mt-5 self-end'>
            <Button
              variant='destructive'
              type='button'
              onClick={(e) => {
                e.preventDefault();
                resetForm();
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
