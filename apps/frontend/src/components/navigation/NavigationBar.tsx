'use client';

import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { LINKS } from '@/models/navigation/navigation';

export const NavigationBar = () => {
  const linkParts = usePathname().split('/');
  const topLevelLink = linkParts[1];
  const subLink = linkParts[2];

  const topLevelNavItem = LINKS.find((l) => l.link === topLevelLink);
  const subNavItem = topLevelNavItem?.subs?.find((sub) => sub.link === subLink);

  return subNavItem ? (
    <div className='flex-column'>
      <div className='flex  py-5 pl-[150px]'>
        <p className='font-breuer-bold text-neutral-400'>{topLevelNavItem?.name}</p>
        <ChevronRight color='gray' />
      </div>
    </div>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  );
};

export default NavigationBar;
