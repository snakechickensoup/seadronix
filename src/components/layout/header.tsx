import Link from 'next/link';
import Image from 'next/image';

import Logo from '@public/images/logo-light.svg';
import GitHub from '@public/images/github.svg';

const Header = () => {
  return (
    <header className='bg-primary flex flex-none items-center justify-between px-8 py-4'>
      <Link href='/'>
        <Image src={Logo} unoptimized alt='logo' height={32} priority />
      </Link>
      <div className='flex items-center gap-6'>
        <Link href='/fibo' className='text-lg font-medium text-white'>
          문제 1
        </Link>
        <Link href='/video' className='text-lg font-medium text-white'>
          문제 2
        </Link>
        <Link
          href='https://github.com/snakechickensoup/seadronix'
          target='_blank'
          rel='noopener noreferrer'
          className='text-lg font-medium text-white'
        >
          <Image src={GitHub} unoptimized alt='logo' height={24} priority />
        </Link>
      </div>
    </header>
  );
};

export default Header;
