'use client';
import { prefix } from '@/utils/prefix';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const ContactPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    ref.current!.style.width = '0';
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <>
      {!isLoaded && <div className='fixed w-screen h-screen bg-primary-400 duration-1000 z-50' ref={ref} />}
      <main className='h-full flex flex-col lg:flex-row lg:justify-evenly items-center pt-24 lg:pt-0 px-5'>
        <hgroup className='mt-10 lg:mt-0'>
          <h1
            className='px-5 lg:px-0 lg:max-w-[700px] text-3xl lg:text-5xl font-bold mb-10'
            style={{ lineHeight: 1.5 }}
          >
            언제든지 연락 주시면 빠른 시일 내에 회신드리겠습니다.
          </h1>
          <div className='px-5 lg:px-0'>
            <h3 className='text-neutral-500 mt-3'>이름</h3>
            <h2 className='text-xl font-semibold'>김현석</h2>
            <h3 className='text-neutral-500 mt-3'>휴대폰</h3>
            <h2 className='text-xl font-semibold'>010-8433-3792</h2>
            <h3 className='text-neutral-500 mt-3'>이메일</h3>
            <h3 className='text-xl font-semibold'>hyunsuk1997@naver.com</h3>
          </div>
        </hgroup>
        <Image src={'/me4.jpg'} width={550} height={200} alt='me' className='px-10 lg:px-0 mt-10 lg:mt-0' />
      </main>
    </>
  );
};

export default ContactPage;
