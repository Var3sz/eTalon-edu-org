'use client';

import { useEffect } from 'react';

export default function GlobalErrorComponent({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div>
      <h2>Something went wrong!</h2>
      <h2>MSG:{error.message}</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
