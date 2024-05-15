'use client';
import { easeIn, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

const ProfilePage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    smooth: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.5,
      },
    },
    smooth2: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.3,
      },
    },

    seperator1: {
      width: '70%',
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.9,
        ease: easeIn,
      },
    },
    seperator2: {
      width: '70%',
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.3,
        ease: easeIn,
      },
    },
    separatorHidden: {
      width: 0,
      y: 1,
    },
    smoothDelay: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.7,
      },
    },
    smoothDelay2: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: 0.2,
      },
    },
  };
  useEffect(() => {
    ref.current!.style.width = '0';
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <>
      {!isLoaded && <div className='fixed w-screen h-screen bg-primary-400 duration-1000 z-50' ref={ref} />}
      <main className='flex flex-col items-center'>
        <section className='mt-20 xl:mt-52 w-full flex flex-col items-center justify-center'>
          <motion.h1
            className='text-4xl xl:text-7xl font-bold'
            variants={variants}
            initial='hidden'
            whileInView='smooth'
            viewport={{ once: true }}
            style={{ lineHeight: 1.625 }}
          >
            안녕하세요!
            <br />
            <span className='text-blue-500'>프론트엔드</span> 개발자
            <br />
            지망생 <span className='text-blue-500'>김현석</span>입니다.
          </motion.h1>
          <motion.div
            className='w-3/4 h-0.5 rounded-full bg-neutral-300 my-10'
            variants={variants}
            initial='separatorHidden'
            whileInView='seperator1'
            viewport={{ once: true }}
          />
          <motion.p
            className='px-10 text-sm xl:text-xl xl:leading-10 font-semibold text-center max-w-[750px]'
            variants={variants}
            initial='hidden'
            whileInView='smoothDelay'
            viewport={{ once: true }}
          >
            저는 현대적인 UI·UX를 통해 사용자의 경험을 높이는 것을 목표로 삼고 있습니다. 애니메이션과 레이아웃을
            적절하게 활용하여 사용자의 시선을 집중시키고 Sementic 코드를 작성하여 사용자 접근성을 높이기 위해
            노력합니다.
          </motion.p>
        </section>
        <section className='w-full lg:w-auto mt-32 xl:mt-60 font-semibold max-w-[600px]'>
          <motion.h2
            className='pl-2 text-center lg:text-left text-2xl lg:text-4xl text-primary-400 mb-10'
            variants={variants}
            initial='hidden'
            whileInView='smoothDelay2'
            viewport={{ once: true }}
          >
            CAREER
          </motion.h2>
          <motion.article
            className='mt-8 space-y-3 px-10 lg:px-0'
            variants={variants}
            initial='hidden'
            whileInView='smooth2'
            viewport={{ once: true }}
          >
            <div className='flex items-center gap-5 justify-between'>
              <h2 className='text-3xl lg:text-6xl'>한전KDN</h2>
              <h3 className='text-xl lg:text-3xl font-medium'>2022.12 ~ 2024.02</h3>
            </div>
            <h3 className='text-xl text-right px-1 lg:px-0'>경영ERP고도화TF</h3>
            <h3 className='text-xl text-right px-1 lg:px-0'>직원</h3>
          </motion.article>
          <motion.article
            className='mt-20 space-y-3 px-10 lg:px-0'
            variants={variants}
            initial='hidden'
            whileInView='smooth2'
            viewport={{ once: true }}
          >
            <div className='flex items-center gap-5 justify-between'>
              <h2 className='text-3xl lg:text-6xl'>전남대학교</h2>
              <h3 className='text-xl lg:text-3xl font-medium'>2021.07 ~ 2022.08</h3>
            </div>
            <h3 className='text-xl text-right'>손동작 인식 머신러닝 연구</h3>
            <h3 className='text-xl text-right'>학부연구생</h3>
          </motion.article>
        </section>
        <motion.div
          className='w-3/4 h-0.5 rounded-full bg-neutral-300 my-20'
          variants={variants}
          initial='separatorHidden'
          whileInView='seperator2'
          viewport={{ once: true }}
        />
        <section className='w-full lg:w-auto font-semibold max-w-[600px]'>
          <motion.h2
            className='pl-2 text-center lg:text-left text-2xl lg:text-4xl text-primary-400 mb-10'
            variants={variants}
            initial='hidden'
            whileInView='smoothDelay2'
            viewport={{ once: true }}
          >
            EDUCATION
          </motion.h2>
          <motion.article
            className='mt-8 space-y-3 px-10 lg:px-0'
            variants={variants}
            initial='hidden'
            whileInView='smooth2'
            viewport={{ once: true }}
          >
            <div className='flex items-center gap-5 justify-between'>
              <h2 className='text-3xl lg:text-6xl'>하나금융TI</h2>
              <h3 className='text-xl lg:text-3xl font-medium'>2024.02 ~ 진행중</h3>
            </div>
            <h3 className='text-xl text-right'>데이터분석 채용연계형 교육생</h3>
          </motion.article>
          <motion.article
            className='mt-20 space-y-3 px-10 lg:px-0'
            variants={variants}
            initial='hidden'
            whileInView='smooth2'
            viewport={{ once: true }}
          >
            <div className='flex items-center gap-5 justify-between'>
              <h2 className='text-3xl lg:text-6xl'>전남대학교</h2>
              <h3 className='text-xl lg:text-3xl font-medium'>2016.03 ~ 2023.02</h3>
            </div>
            <h3 className='text-xl text-right'>컴퓨터정보통신공학</h3>
          </motion.article>
        </section>
        <motion.div
          className='w-3/4 h-0.5 rounded-full bg-neutral-300 my-20'
          variants={variants}
          initial='separatorHidden'
          whileInView='seperator2'
          viewport={{ once: true }}
        />
        <section className='w-full lg:w-[550px] font-semibold mb-40 max-w-[600px]'>
          <motion.h2
            className='pl-2 text-center lg:text-left text-2xl lg:text-4xl text-primary-400 mb-10'
            variants={variants}
            initial='hidden'
            whileInView='smoothDelay2'
            viewport={{ once: true }}
          >
            CERTIFICATE
          </motion.h2>
          <motion.article
            className='mt-8 space-y-14'
            variants={variants}
            initial='hidden'
            whileInView='smooth2'
            viewport={{ once: true }}
          >
            <hgroup className='px-10 lg:px-0'>
              <h3 className='text-3xl lg:text-6xl text-center lg:text-left'>정보처리기사</h3>
              <h3 className='mt-10 text-3xl lg:text-6xl text-center lg:text-left'>토익 935</h3>
              <h3 className='mt-10 text-3xl lg:text-6xl text-center lg:text-left'>토스 IH</h3>
            </hgroup>
          </motion.article>
        </section>
      </main>
    </>
  );
};

export default ProfilePage;
