"use client";
import { Separator } from "@/components/separator";
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

  if (!isLoaded) {
    return (
      <div
        className="bg-primary-400 fixed w-screen h-screen duration-1000 z-50"
        ref={ref}
      />
    );
  }

  return (
    <main className="h-full w-full flex justify-center bg-slate-50">
      <div className="p-10 pt-24 max-w-[800px] flex flex-col items-center border-l border-r bg-white">
        <Image
          src={"/me4.jpg"}
          width={720}
          height={720}
          alt="me"
          className="max-w-80 max-h-80 sm:max-w-96 sm:max-h-96 rounded-full border"
        />
        <h1 className="mt-5 sm:mt-10 opacity-90 text-center text-md sm:text-3xl font-semibold break-keep">
          연락 주시면 빠른 시일 내에 회신드리겠습니다.
        </h1>
        <Separator width="60%" mt={40} mb={40} />
        <hgroup className="p-2 mt-5 opacity-85 text-sm grid grid-cols-10 gap-2">
          <span className="col-span-3 text-right">이름</span>
          <span className="col-span-7 font-medium">김현석</span>
          <span className="col-span-3 text-right">휴대폰</span>
          <span className="col-span-7 font-medium">010-8433-3792</span>
          <span className="col-span-3 text-right">이메일</span>
          <span className="col-span-7 font-medium">hyunsuk1997@naver.com</span>
        </hgroup>
      </div>
    </main>
  );
};

export default ContactPage;

{
  /* <div className="min-h-full max-w-[1000px] h-full w-full px-10 border-l border-r flex flex-col items-center gap-10 bg-secondary-400">
  <Image
          src={"/me4.jpg"}
          width={1000}
          height={1000}
          alt="me"
          className="object-contain"
        />
<h1 className="text-center text-sm sm:text-3xl font-semibold">
  연락 주시면 빠른 시일 내에 회신드리겠습니다.
</h1>
</div> */
}

{
  /* <div className="flex flex-col items-center gap-5">

</div> */
}
