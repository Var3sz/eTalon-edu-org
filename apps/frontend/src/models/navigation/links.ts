import { NavigationType } from '@/models/navigation/types';

export const Links: NavigationType[] = [
  { name: 'Jelenlét', link: '/courses' },
  { name: 'Kurzustervező', link: '/course/planner' },
  { name: 'Csomagtervező', link: '/packages' },
  { name: 'Számlázás', link: '/payments' },
];

export const ProfileLinks: NavigationType[] = [
  { name: 'Bejelentkezés', link: '/api/auth/signin' },
  { name: 'Regisztráció', link: '/auth/signup' },
  { name: 'Kijelentkezés', link: '/api/auth/signout' },
];
