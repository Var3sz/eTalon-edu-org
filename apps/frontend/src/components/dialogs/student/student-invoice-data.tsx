import { FieldValues } from 'react-hook-form';

import FormNumberInput from '@/components/form/form-number-input';
import FormSelectInput from '@/components/form/form-select-input';
import FormTextInput from '@/components/form/form-text-input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import useGetBillingTypesQuery from '@/hooks/billing-type/use-get-billing-types-query';
import { StudentLocales } from '@/locales/student-locales';
import { ItemModel } from '@/models/ui/form-props';

import { StudentDataProps } from './student-default-data';

export default function StudentInvoiceData<T extends FieldValues>({
  formControl,
  formSetValue,
  inEdit,
  token,
}: StudentDataProps<T>) {
  const billingTypes = useGetBillingTypesQuery(token);

  return (
    <Accordion type='single' collapsible defaultValue='paymentInfo' className='space-y-4'>
      <AccordionItem
        value='paymentInfo'
        className='border border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-5 p-3'
      >
        <AccordionTrigger>
          <span className='text-2xl font-bold'>Fizetési adatok</span>
        </AccordionTrigger>
        <AccordionContent className='flex flex-col gap-3'>
          <div className='flex flex-wrap gap-5'>
            <FormNumberInput id='zip' label={StudentLocales.update.zip} formControl={formControl} inEdit={inEdit} />
            <FormTextInput id='city' label={StudentLocales.update.city} formControl={formControl} inEdit={inEdit} />
            <FormTextInput
              id='address'
              label={StudentLocales.update.address}
              formControl={formControl}
              inEdit={inEdit}
            />
            <FormSelectInput
              id='billingAddressTypeId'
              label={StudentLocales.update.billingAddressTypeId}
              formControl={formControl}
              formSetValue={formSetValue}
              items={
                billingTypes
                  ? (billingTypes.map((bt) => ({
                      label: bt.description,
                      value: bt.id,
                    })) as ItemModel[])
                  : []
              }
              placeholder={StudentLocales.update.selectValues.billingAddressType.placeholder}
              emptySelect={StudentLocales.update.selectValues.billingAddressType.emptySelect}
              inEdit={inEdit}
            />
            <FormTextInput
              id='billCompany'
              label={StudentLocales.update.billCompany}
              formControl={formControl}
              inEdit={inEdit}
            />
            <FormTextInput id='vatNum' label={StudentLocales.update.vatNum} formControl={formControl} inEdit={inEdit} />
            <FormTextInput id='coupon' label={StudentLocales.update.coupon} formControl={formControl} inEdit={inEdit} />
            <FormTextInput
              id='discount'
              label={StudentLocales.update.discount}
              formControl={formControl}
              inEdit={inEdit}
            />
            <FormTextInput
              id='discount2'
              label={StudentLocales.update.discount2}
              formControl={formControl}
              inEdit={inEdit}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
