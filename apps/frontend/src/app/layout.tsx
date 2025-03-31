import './globals.css';

import type { Metadata } from 'next';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import React, { Suspense } from 'react';

import LoadingFullScreen from '@/app/loading';
import GlobalErrorComponent from '@/components/error/GlobalErrorComponent';
import NavigationBar from '@/components/navigation/navigation-bar';
import { Providers } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Etalon org. website',
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang='hu'>
      <body>
        <NavigationBar />
        <Toaster />
        <main className='p-2'>
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
