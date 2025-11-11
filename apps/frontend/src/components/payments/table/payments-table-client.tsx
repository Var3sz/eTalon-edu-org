'use client';

import CourseColumns from '@/components/columns/course/course-columns';
import { CoursePaymentsRedirectionFunction } from '@/components/tables/columns/utils/redirection-functions';
import { DataTable } from '@/components/tables/data-table';
import useInitPaymentsTableClient from '@/hooks/payments/use-init-payments-table-client';
import { useSession } from 'next-auth/react';

export default function PaymentsTableClient() {
  const { data: session } = useSession();

  const { courses } = useInitPaymentsTableClient(session?.tokens.accessToken ?? '');

  const courseToolbarProps = {
    title: 'Aktív kurzusok',
  };

  return (
    <div className='w-3/4 py-10 mx-auto'>
      <DataTable
        columns={CourseColumns(CoursePaymentsRedirectionFunction)}
        data={courses}
        hasToolbar
        toolbarProps={courseToolbarProps}
      />
    </div>
  );
}
