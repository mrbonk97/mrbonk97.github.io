"use client";
import { prefix } from "@/utils/prefix";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const ContactPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    ref.current!.style.width = "0";
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
  }, []);

  return (
    <>
      {!isLoaded && (
        <div
          className="bg-primary-400 fixed w-screen h-screen duration-1000 z-50"
          ref={ref}
        />
      )}
      <main className="h-full flex flex-col items-center lg:flex-row lg:justify-evenly gap-10 pt-32 px-5">
        <Image
          src={"/me4.jpg"}
          width={550}
          height={200}
          alt="me"
          className=""
        />
        <hgroup className="mb-10 lg:mb-0">
          <h1
            className="mt-5 lg:max-w-[700px] text-3xl lg:text-5xl font-bold break-keep text-center"
            style={{ lineHeight: 1.5 }}
          >
            언제든지 연락 주시면 빠른 시일 내에 회신드리겠습니다.
          </h1>
          <div className="mt-5 px-5 lg:px-0">
            <h3 className="text-neutral-500">이름</h3>
            <h2 className="text-xl font-semibold">김현석</h2>
            <h3 className="text-neutral-500 mt-3">휴대폰</h3>
            <h2 className="text-xl font-semibold">010-8433-3792</h2>
            <h3 className="text-neutral-500 mt-3">이메일</h3>
            <h3 className="text-xl font-semibold">hyunsuk1997@naver.com</h3>
          </div>
        </hgroup>
      </main>
    </>
  );
};

export default ContactPage;
