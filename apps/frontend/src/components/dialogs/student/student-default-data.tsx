import { Control, FieldValues } from 'react-hook-form';

import FormNumberInput from '@/components/form/form-number-input';
import FormSwitchInput from '@/components/form/form-switch-input';
import FormTextInput from '@/components/form/form-text-input';
import FormTextAreaInput from '@/components/form/form-textarea-input';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { StudentLocales } from '@/locales/student-locales';

export type StudentDataProps<T extends FieldValues> = {
  formControl: Control<T>;
  inEdit: boolean;
  formSetValue?: (
    name: any,
    value: any,
    options?:
      | Partial<{
          shouldValidate: boolean;
          shouldDirty: boolean;
          shouldTouch: boolean;
        }>
      | undefined
  ) => void;
};

export default function StudentDefaultData<T extends FieldValues>({ formControl, inEdit }: StudentDataProps<T>) {
  return (
    <Accordion type='single' collapsible defaultValue='studentInfo' className='space-y-4'>
      <AccordionItem
        value='studentInfo'
        className='border border-gray-200 rounded-lg bg-gray-50 flex flex-col gap-5 p-3'
      >
        <AccordionTrigger>
          <span className='text-2xl font-bold'>Gyermek adatok</span>
        </AccordionTrigger>
        <AccordionContent className='flex flex-col gap-3'>
          <div className='flex flex-wrap gap-3'>
            <FormTextInput
              id='childName'
              label={StudentLocales.update.childName}
              formControl={formControl}
              inEdit={inEdit}
              required
            />
            <FormTextInput
              id='childMail'
              label={StudentLocales.update.childMail}
              formControl={formControl}
              inEdit={inEdit}
            />
            <FormNumberInput
              id='childGrade'
              label={StudentLocales.update.childGrade}
              formControl={formControl}
              inEdit={inEdit}
            />
            <FormTextInput
              id='childTAJ'
              label={StudentLocales.update.childTAJ}
              formControl={formControl}
              inEdit={inEdit}
            />
          </div>
          <div className='flex flex-wrap gap-3'>
            <FormSwitchInput
              id='specialDiet'
              label={StudentLocales.update.specialDiet}
              formControl={formControl}
              inEdit={inEdit}
            />
            <FormTextAreaInput
              id='specialDietDesc'
              label={StudentLocales.update.specialDietDesc}
              formControl={formControl}
              inEdit={inEdit}
            />
            <FormSwitchInput
              id='disease'
              label={StudentLocales.update.disease}
              formControl={formControl}
              inEdit={inEdit}
            />
            <FormTextAreaInput
              id='diseaseDesc'
              label={StudentLocales.update.diseaseDesc}
              formControl={formControl}
              inEdit={inEdit}
            />
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
