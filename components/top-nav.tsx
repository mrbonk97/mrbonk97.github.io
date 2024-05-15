'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const TopNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header>
      <nav
        className={`fixed right-8 top-8 h-16 bg-primary-400 text-secondary-400 text-lg lg:text-2xl gap-7 md:gap-10 lg:gap-20 z-20 items-center justify-start rounded-sm flex overflow-hidden
      ${isOpen ? 'w-[320px] lg:w-[450px] duration-500' : 'w-16 duration-500'} `}
        onClick={() => setIsOpen((cur) => !cur)}
      >
        <Link
          href='/project'
          className={`font-bold  nt  hover:underline underline-offset-8
        ${isOpen ? 'duration-500 ml-5 opacity-100 delay-100' : 'duration-200 ml-10 opacity-0'}
        ${pathname === '/project' && 'underline'}`}
        >
          프로젝트
        </Link>

        <Link
          href='/about-me'
          className={`font-bold  nt2 hover:underline underline-offset-8
        ${isOpen ? 'duration-1000 opacity-100 delay-100' : 'duration-200 opacity-0'}
        ${pathname === '/about-me' && 'underline'}`}
        >
          소개
        </Link>

        <Link
          href='/contact'
          className={`font-bold nt2 hover:underline underline-offset-8
        ${isOpen ? 'duration-1000 opacity-100 delay-150' : 'duration-200 opacity-0'}
        ${pathname === '/contact' && 'underline'}`}
        >
          연락
        </Link>
        <div className='fixed right-11 top-13 h-10 w-10 overflow-hidden cursor-pointer'>
          <div
            className={`absolute h-1 rounded-full  bg-[#F3EFE7] top-[4px] duration-500 w-8 
            ${isOpen ? 'ml-10 opacity-0' : 'ml-1'}`}
          />
          <div
            className={`absolute w-8 ml-1 h-1 rounded-full bg-[#F3EFE7] top-[17px] duration-500 
            ${isOpen ? 'rotate-45' : 'rotate-0'}`}
          />
          <div
            className={`absolute w-8 ml-1 h-1 rounded-full bg-[#F3EFE7] top-[17px] duration-500 
            ${isOpen ? '-rotate-45' : 'rotate-0'}`}
          />
          <div
            className={`absolute h-1 rounded-full  bg-[#F3EFE7] top-[30px] duration-500 w-6 
            ${isOpen ? '-ml-10 opacity-0' : 'ml-3'}`}
          />
        </div>
      </nav>
    </header>
  );
};
