'use client';

import { useState } from 'react';

import AddNewCourseDialog from '@/components/dialogs/course/add-new-course-dialog';
import CustomDialog from '@/components/dialogs/custom-dialog';
import AddButton from '@/components/ui/add-button';

export default function CoursePlannerClient() {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <div className='mx-10 py-5'>
      <div className='flex gap-5'>
        <span className='text-4xl font-bold'>Kurzustervező</span>
        <CustomDialog
          title='Új kurzus hozzáadása'
          open={open}
          onOpenChange={setOpen}
          triggerElement={<AddButton title='Új kurzus' />}
        >
          <AddNewCourseDialog />
        </CustomDialog>
      </div>
    </div>
  );
}
