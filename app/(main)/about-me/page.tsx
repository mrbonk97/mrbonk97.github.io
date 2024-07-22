"use client";
import { motion } from "framer-motion";
import { InfoList } from "./_component/info-list";
import { CertiList } from "./_component/certi-list";
import { AboutMeSection } from "./_component/section";
import { Separator } from "@/components/separator";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CERTI_LIST, EDU_LIST, WORK_LIST } from "@/constants";
import { PageTransition } from "@/components/page-transition";

const ProfilePage = () => {
  return (
    <>
      <PageTransition />
      <main className="min-h-full h-full">
        <section className="mb-10 relative min-h-[800px] h-full w-full flex flex-col items-center pt-16 xl:pt-40">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center md:text-left"
            initial={{ y: 60, opacity: 0 }}
            // prettier-ignore
            whileInView={{ y: 0, opacity: 1, transition: {duration: 0.8, delay: 0.2, } }}
            viewport={{ once: true }}
            style={{ lineHeight: "150%" }}
          >
            안녕하세요!
            <br />
            <span className="text-blue-500">프론트엔드</span> 개발자
            <br />
            지망생 <span className="text-blue-500">김현석</span>입니다.
          </motion.h1>
          <Separator width="60%" mt={50} mb={50} />
          <motion.p
            className="pb-16 px-10 text-sm xl:text-xl xl:leading-10 font-semibold text-center max-w-[750px]"
            initial={{ y: 40, opacity: 0 }}
            // prettier-ignore
            whileInView={{ y: 0, opacity: 1, transition: {duration: 0.6, delay: 0.7, } }}
            viewport={{ once: true }}
          >
            저는 현대적인 UI·UX를 통해 사용자의 경험을 높이는 것을 목표로 삼고
            있습니다. 애니메이션과 레이아웃을 적절하게 활용하여 사용자의 시선을
            집중시키고 Sementic 코드를 작성하여 사용자 접근성을 높이기 위해
            노력합니다.
          </motion.p>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            //prettier-ignore
            whileInView={{y: 0, opacity: 1, transition: {duration: 0.4, delay: 1.2, ease:'easeIn'}}}
            viewport={{ once: true }}
            className="absolute bottom-14 flex justify-center text-blue-500"
          >
            <MdKeyboardArrowDown className="animate-bounce" size={64} />
          </motion.div>
        </section>

        <AboutMeSection title="CAREER">
          <ul className="space-y-10 sm:space-y-14 md:space-y-20">
            {WORK_LIST.map((item) => (
              <InfoList
                key={item.title}
                title={item.title}
                duration={item.duration}
                info1={item.info1}
                info2={item.info2}
              />
            ))}
          </ul>
        </AboutMeSection>

        <Separator width="60%" mt={100} mb={100} />

        <AboutMeSection title="EDUCATION">
          <ul className="space-y-10 sm:space-y-14 md:space-y-20">
            {EDU_LIST.map((item) => (
              <InfoList
                key={item.title}
                title={item.title}
                duration={item.duration}
                info1={item.info1}
              />
            ))}
          </ul>
        </AboutMeSection>

        <Separator width="60%" mt={100} mb={100} />

        <AboutMeSection title="CERTIFICATE">
          <ul className="mb-40 space-y-10 sm:space-y-14 md:space-y-16">
            {CERTI_LIST.map((item) => (
              <CertiList title={item.title} idx={item.idx} key={item.idx} />
            ))}
          </ul>
        </AboutMeSection>
      </main>
    </>
  );
};

export default ProfilePage;
