import { useEffect } from 'react';

import LoadingFullScreen from '@/app/loading';
import InvoiceDatesColumns from '@/components/columns/course/edit-invoice-dates-columns';
import CreateInvoiceDatesDialog from '@/components/dialogs/course/create-invoice-dates-dialog';
import CustomInnerStateDialog from '@/components/dialogs/custom-innerstate-dialog';
import { SimpleTable } from '@/components/tables/simple-table';
import AddButton from '@/components/ui/add-button';
import { useGetInvoiceDatesDataByIdQuery } from '@/hooks/courses/edit-course/use-get-invoice-dates-data-by-id-query';
import { InvoiceDateDto } from '@/models/Api';

type CourseInvoiceDateManagementClientModel = {
  courseId: string;
  token: string;
};
export default function CourseInvoiceDateManagementClient({ courseId, token }: CourseInvoiceDateManagementClientModel) {
  const { data: invoiceDatesResponse, isLoading } = useGetInvoiceDatesDataByIdQuery(courseId, token);

  const invoiceDates: InvoiceDateDto[] =
    invoiceDatesResponse?.status === 200 && invoiceDatesResponse.data.length > 0 ? invoiceDatesResponse.data : [];

  const invoiceDateCols = InvoiceDatesColumns(courseId, token);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'invoiceDates');
    window.history.replaceState(null, '', url.toString());
  }, []);

  return (
    <div className='flex flex-col gap-5'>
      {isLoading && <LoadingFullScreen />}
      <div className='flex gap-5'>
        <span className='text-3xl font-bold'>Kurzus dátumok kezelése</span>
        <CustomInnerStateDialog
          title='Számlázási dátumok hozzáadása'
          triggerElement={<AddButton title='Új dátumok' buttonStyle='self-center' asChild />}
        >
          <CreateInvoiceDatesDialog courseId={courseId} token={token} />
        </CustomInnerStateDialog>
      </div>
      <SimpleTable columns={invoiceDateCols} defaultData={invoiceDates} />
    </div>
  );
}
