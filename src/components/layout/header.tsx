import Link from 'next/link';
import Image from 'next/image';

import Logo from '@public/images/logo-dark.svg';

const Header = () => {
  return (
    <header className='flex items-center justify-between flex-none py-6 px-8'>
      <Link href='/'>
        <Image src={Logo} unoptimized alt='logo' height={40} priority />
      </Link>
    </header>
  );
};

export default Header;
