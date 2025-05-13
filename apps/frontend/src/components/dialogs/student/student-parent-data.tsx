import { FieldValues } from 'react-hook-form';

import FormNumberInput from '@/components/form/form-number-input';
import FormTextInput from '@/components/form/form-text-input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StudentLocales } from '@/locales/student-locales';

import { StudentDataProps } from './student-default-data';

export default function StudentParentData<T extends FieldValues>({ formControl, inEdit }: StudentDataProps<T>) {
  return (
    <Accordion type='single' collapsible defaultValue='parentInfo' className='space-y-4'>
      <AccordionItem
        value='parentInfo'
        className='border border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-3 p-3'
      >
        <AccordionTrigger>
          <span className='text-2xl font-bold'>Szülői adatok</span>
        </AccordionTrigger>
        <AccordionContent>
          <div className='flex flex-wrap gap-5'>
            <FormNumberInput
              id='sapId'
              formControl={formControl}
              label={StudentLocales.update.sapid}
              inEdit={inEdit}
              disabled
            />
            <FormTextInput id='lastname' label='Szülő vezetékneve' formControl={formControl} inEdit={inEdit} />
            <FormTextInput id='firstname' label='Szülő keresztneve' formControl={formControl} inEdit={inEdit} />
            <FormTextInput id='email' label='Szülő e-mail címe' formControl={formControl} inEdit={inEdit} />
            <FormTextInput id='mobile' label='Telefonszám' formControl={formControl} inEdit={inEdit} />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
