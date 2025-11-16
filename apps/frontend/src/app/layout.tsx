import './globals.css';

import type { Metadata } from 'next';
import { ErrorBoundary } from 'next/dist/client/components/error-boundary';
import { getServerSession } from 'next-auth';
import React, { Suspense } from 'react';

import LoadingFullScreen from '@/app/loading';
import GlobalErrorComponent from '@/components/error/GlobalErrorComponent';
import NavigationBar from '@/components/navigation/navigation-bar';
import { ClientProvider } from '@/components/providers';
import Providers from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { authOptions } from '@/lib/authOptions';

export const metadata: Metadata = {
  title: 'Etalon org. website',
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang='hu'>
      <body>
        <Providers session={session}>
          <NavigationBar />
          <Toaster />
          <main className='p-2'>
            <ClientProvider>
              <Suspense fallback={<LoadingFullScreen />}>
                <ErrorBoundary errorComponent={GlobalErrorComponent}>{props.children}</ErrorBoundary>
              </Suspense>
            </ClientProvider>
          </main>
        </Providers>
      </body>
    </html>
  );
}
