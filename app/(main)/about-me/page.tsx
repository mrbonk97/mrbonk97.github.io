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
    <main className="p-4 lg:p-8 pt-20 lg:pt-20 mx-auto max-w-3xl">
      <header className="mt-4">
        <Image
          src="/images/about-me/me.jpg"
          alt="프로필 이미지"
          width={1920}
          height={1080}
          className="h-64 md:h-auto w-full md:aspect-video rounded object-cover bg-secondary"
        />
        <h1 className="mt-8 text-2xl md:text-4xl font-semibold leading-snug">
          안녕하세요.
          <br />
          개발과 보안을 다루는
          <br />
          <span className="text-custom-200">엔지니어</span>입니다.
        </h1>

        <p className="mt-8 max-w-4xl md:text-lg">
          저는 금융SI 회사에서 개발이랑 취약점 점검 업무를 하고 있습니다. 팀에서
          필요로 하는 솔루션이나 툴을 개발하고 있으며 각종 금융관계사에 취약점
          점검 업무를 수행하고 있습니다. 개인적으로는 그때그때 흥미롭게 재밌거나
          흥미롭게 생각하는 프로젝트를 합니다.
        </p>
      </header>

      <GithubGrass />
      <OpenSourceContribution />
      <OtherLinks />
    </main>
  );
}
