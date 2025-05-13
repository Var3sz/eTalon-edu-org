'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function SignInButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session && session.user) {
    return (
      <div className='flex gap-5 items-center'>
        <span className='text-lg font-bold'>{session.user.name}</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className='cursor-pointer bg-etalon-grey'>
              <AvatarFallback>{session.user.name?.slice(0, 2).toUpperCase() || 'NA'}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align='end'>
            <DropdownMenuItem
              onClick={() => {
                router.push('/profile');
              }}
            >
              Profil
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => signOut()}>Kijelentkezés</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className='flex gap-2 items-center'>
      <Button variant='outline' onClick={() => signIn()}>
        Bejelentkezés
      </Button>
      <Link href='/auth/signup'>
        <Button variant='default'>Regisztráció</Button>
      </Link>
    </div>
  );
}
