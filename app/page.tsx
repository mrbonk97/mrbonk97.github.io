'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TopNav } from '@/components/top-nav';
import { usePathname } from 'next/navigation';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isTextVisible, setIsTextVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const textRef1 = useRef<HTMLDivElement>(null);
  const textRef2 = useRef<HTMLDivElement>(null);
  const textRef3 = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current!.style.width = '0';
    setTimeout(() => {
      setIsLoaded(true);
      textRef1.current!.style.transition = '500ms';
      textRef2.current!.style.transition = '500ms';
      textRef3.current!.style.transition = '500ms';
    }, 1000);

    setTimeout(() => {
      setIsTextVisible(true);
    }, 700);
  }, []);

  return (
    <>
      {!isLoaded && <div className='fixed w-screen h-screen bg-primary-400 duration-1000 z-50' ref={ref} />}
      <main className='w-full h-full lg:min-h-[750px] text-primary-400 text-4xl md:text-7xl lg:text-8xl font-extrabold tracking-widest flex flex-col gap-20 items-center justify-center'>
        <div className='relative group overflow-hidden'>
          <h2
            className={`py-1 relative duration-500 group-hover:translate-y-28 ${!isTextVisible && 'translate-y-28'}`}
            ref={textRef1}
          >
            안녕하세요
          </h2>
        </div>
        <Link
          className='relative text-xl font-semibold h-[200px] w-[200px] spin text-primary-400/80 hover:text-primary-400 duration-150 cursor-pointer flex2'
          href='/project'
        >
          <span className='circle rotate-[20deg]'>안</span>
          <span className='circle rotate-[40deg]'>녕</span>
          <span className='circle rotate-[60deg]'>하</span>
          <span className='circle rotate-[80deg]'>세</span>
          <span className='circle rotate-[100deg]'>요</span>
          <span className='circle rotate-[120deg]'>·</span>
          <span className='circle rotate-[140deg]'>반</span>
          <span className='circle rotate-[160deg]'>갑</span>
          <span className='circle rotate-[180deg]'>습</span>
          <span className='circle rotate-[200deg]'>니</span>
          <span className='circle rotate-[220deg]'>다</span>
          <span className='circle rotate-[240deg]'>다</span>
          <span className='circle rotate-[260deg]'>·</span>
          <span className='circle rotate-[280deg]'>살</span>
          <span className='circle rotate-[300deg]'>펴</span>
          <span className='circle rotate-[320deg]'>보</span>
          <span className='circle rotate-[340deg]'>기</span>
          <span className='circle rotate-[360deg]'>·</span>
        </Link>
        <div className='relative group overflow-hidden'>
          <h2
            className={`py-1 relative duration-700 group-hover:translate-y-28 ${!isTextVisible && 'translate-y-28'}`}
            ref={textRef2}
          >
            저의 포트폴리오
          </h2>
        </div>
        <div className='relative group overflow-hidden'>
          <h2
            className={`py-1 relative group-hover:translate-y-28 ${!isTextVisible && 'translate-y-28'}`}
            ref={textRef3}
            style={{ transitionDuration: '750ms' }}
          >
            방문에 감사드립니다.
          </h2>
        </div>
      </main>
    </>
  );
}
