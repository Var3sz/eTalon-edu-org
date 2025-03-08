import './globals.css';

import type { Metadata } from 'next';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import React, { Suspense } from 'react';

import LoadingFullScreen from '@/app/Loading';
import GlobalErrorComponent from '@/components/error/GlobalErrorComponent';
import NavigationBar from '@/components/navigation/NavigationBar';
import { Providers } from '@/components/Providers';

export const metadata: Metadata = {
  title: 'Etalon org. website',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='hu'>
      <body>
        <main className='p-2'>
          <NavigationBar />
          <Providers>
            <Suspense fallback={<LoadingFullScreen />}>
              <ErrorBoundary errorComponent={GlobalErrorComponent}>{props.children}</ErrorBoundary>
            </Suspense>
          </Providers>
        </main>
      </body>
    </html>
  );
}
