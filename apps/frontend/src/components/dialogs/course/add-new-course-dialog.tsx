import FormDateInput from '@/components/form/form-date-input';
import { Form } from '@/components/ui/form';
import useInitAddNewCourseDialog from '@/hooks/courses/use-init-add-new-course-dialog';

export default function AddNewCourseDialog() {
  const { form } = useInitAddNewCourseDialog();

  return (
    <div>
      <Form {...form}>
        <form>
          <div className='w-fit'>
            <FormDateInput id='location' formControl={form.control} label='Dátum' />
          </div>
        </form>
      </Form>
    </div>
  );
}
