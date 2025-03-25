import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Links } from '@/models/navigation/links';

export default function Navbar() {
  const logoSrc = process.env.REACT_APP_LOGO!;
  return (
    <nav className='w-full flex justify-between p-4 border-2'>
      <div className='flex gap-10 text-black font-bold'>
        <Image src={logoSrc} alt='Application logo' width={150} height={150} />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem className='flex gap-10'>
              {Links.map((link) => (
                <Link className='align-middle' key={link.name} href={link.link}>
                  {link.name}
                </Link>
              ))}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className='flex'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Avatar>
                <AvatarImage className='bg-black' src='https://example.com/profile-picture.jpg' alt='Profile Picture' />
                <AvatarFallback className='bg-etalonGreen bg-etalon-grey'>ET</AvatarFallback>
              </Avatar>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}
