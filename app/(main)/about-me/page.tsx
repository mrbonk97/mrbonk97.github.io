import Image from "next/image";
import type { Metadata } from "next";
import { GithubGrass } from "@/components/about-me/github-grass";
import { OpenSourceContribution } from "@/components/about-me/open-source-contribution";
import { OtherLinks } from "@/components/about-me/other-links";

export const metadata: Metadata = {
  title: "소개 | 포트폴리오",
};

export default function Page() {
  return (
    <main className="p-4 lg:p-8 pt-20 lg:pt-24 mx-auto max-w-3xl">
      <header>
        <Image
          src="/images/about-me/me.jpg"
          alt="프로필 이미지"
          width={1920}
          height={1080}
          className="h-64 lg:h-auto w-full lg:aspect-video rounded object-cover bg-secondary"
        />
        <h1 className="mt-8 text-2xl lg:text-4xl font-bold leading-snug">
          안녕하세요.
          <br />
          보안을 점검하고
          <br />
          도구를 만드는 <span className="text-custom-200">사람</span>입니다.
        </h1>

        <p className="mt-4 leading-snug">
          저는 금융 SI 회사에서 그룹 내 금융 관계사의 취약점을 점검하고, 팀에
          필요한 보안 도구를 직접 개발합니다. 여가 시간에는 관심 있는 주제로
          앱을 만드는 걸 즐깁니다.
        </p>
      </header>

      <GithubGrass />
      <OpenSourceContribution />
      <OtherLinks />
    </main>
  );
}
