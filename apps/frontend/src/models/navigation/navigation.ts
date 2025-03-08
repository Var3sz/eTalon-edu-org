import { NavigationItemType } from '@/models/navigation/types';

export const LINKS: NavigationItemType[] = [
  {
    name: 'Csoportok',
    link: 'groups',
    subs: [
      {
        name: 'Magyar',
        link: 'hungarian',
      },
      {
        name: 'Matek',
        link: 'math',
      },
      {
        name: 'Szóbeli',
        link: 'oral',
      },
    ],
  },
];
