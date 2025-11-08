'use client';

import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

import { cn } from '@/lib/utils';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        // nagyobb, szélesebb track
        'peer inline-flex h-6 w-12 shrink-0 items-center rounded-full border border-transparent transition-all outline-none',
        // színek
        'data-[state=checked]:bg-primary data-[state=unchecked]:bg-etalon-grey/30',
        'dark:data-[state=unchecked]:bg-etalon-grey/30',
        // fókusz, disabled
        'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          // nagyobb thumb
          'pointer-events-none block size-5 rounded-full bg-white shadow transition-transform',
          // eltolások: 2px margó mindkét oldalon
          'data-[state=checked]:translate-x-[26px] data-[state=unchecked]:translate-x-0',
          'dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground'
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
