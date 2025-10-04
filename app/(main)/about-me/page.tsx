import { Github, Instagram } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "mrbonk97 | 소개",
};

async function AboutMePage() {
  return (
    <>
      <main className="p-4 pt-20 mx-auto max-w-7xl">
        <header>
          <h1 className="font-black text-5xl">안녕하세요,</h1>
          <h2 className="mt-2 font-bold text-2xl break-keep">
            프로그래밍과 보안 분야에 일을 하고 있는 mrbonk97입니다.
          </h2>
        </header>
        <section className="mt-8">
          <h4 className="text-lg font-semibold opacity-80">경력</h4>
          <ol className="mt-2 space-y-2">
            <li className="p-4 rounded-lg bg-secondary">
              <div>2024.11 - 재직중</div>
              <div className="text-xl font-bold">하나금융TI - 정보호호센터</div>
              <div>취약점 점검 및 보안프로그램 개발</div>
            </li>
            <li className="p-4 rounded-lg bg-secondary">
              <div>2022.12 - 2024.02</div>
              <div className="text-xl font-bold">한전KDN - 원전ERP고도화TF</div>
              <div>한국수력원자력 ERP 고도화 프로젝트 참여, 시스템 개발</div>
            </li>
          </ol>
        </section>
        <section className="mt-8">
          <h4 className="text-lg font-semibold opacity-80">학력</h4>
          <ol className="mt-2 space-y-2">
            <li className="p-4 rounded-lg bg-secondary">
              <div>2016.03 - 2023.02</div>
              <div className="text-xl font-bold">전남대학교 - 컴퓨터정보통신공학</div>
            </li>
          </ol>
        </section>
        <section className="mt-8">
          <h4 className="text-lg font-semibold opacity-80">자격증</h4>
          <ol className="mt-2 space-y-2">
            <li className="p-4 rounded-lg bg-secondary">
              <div>2022.06</div>
              <div className="text-xl font-bold">정보처리기사</div>
              <div>한국산업인력공단</div>
            </li>
            <li className="p-4 rounded-lg bg-secondary">
              <div>2024.04</div>
              <div className="text-xl font-bold">SQLD</div>
              <div>큐넷</div>
            </li>
            <li className="p-4 rounded-lg bg-secondary">
              <div>2024.03</div>
              <div className="text-xl font-bold">TOEIC - 935</div>
              <div>한국YBM</div>
            </li>
          </ol>
        </section>
        <section className="mt-8">
          <h4 className="text-lg font-semibold opacity-80">기술 스킬</h4>
          <ol className="mt-2 flex gap-2">
            <li className="p-4 rounded-lg bg-secondary">React</li>
            <li className="p-4 rounded-lg bg-secondary">React Native</li>
            <li className="p-4 rounded-lg bg-secondary">Next.js</li>
            <li className="p-4 rounded-lg bg-secondary">Spring</li>
          </ol>
        </section>
        <section className="mt-8">
          <h4 className="text-lg font-semibold opacity-80">링크</h4>
          <ul className="mt-2 grid grid-cols-2 gap-2">
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/mrbonk97"
                className="block p-4 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground duration-150"
              >
                <div className="font-semibold">Github</div>
                <Github className="my-4 mx-auto" />
              </Link>
            </li>
            <li>
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href="https://www.instagram.com/mrbonk97"
                className="block p-4 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground duration-150"
              >
                <div className="font-semibold">Github</div>
                <Instagram className="my-4 mx-auto" />
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}

export default AboutMePage;
