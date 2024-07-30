import { PageTransition } from "@/components/page-transition";
import { Separator } from "@/components/separator";
import Image from "next/image";

const ContactPage = () => {
  return (
    <>
      <PageTransition />
      <main className="min-h-full w-full flex justify-center bg-slate-50 text-foreground">
        <div className="p-10 pt-24 max-w-[800px] flex flex-col items-center border-l border-r bg-white">
          <Image
            src={"/me4.jpg"}
            width={720}
            height={720}
            alt="me"
            className="max-w-80 max-h-80 rounded-full border"
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
            <span className="col-span-7 font-medium">
              hyunsuk1997@naver.com
            </span>
          </hgroup>
        </div>
      </main>
    </>
  );
};

export default ContactPage;
