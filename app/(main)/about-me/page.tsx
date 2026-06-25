import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

const PROFILE = [
  {
    title: "보안",
    description:
      "운영 환경을 기준으로 설정, 권한, 데이터 흐름을 확인합니다. 취약점 점검 결과를 정리하고, 장애나 보안 이슈로 이어질 수 있는 부분을 개발 관점에서 함께 살펴봅니다.",
  },
  {
    title: "개발",
    description:
      "업무에 필요한 내부 도구와 웹 서비스를 만듭니다. 화면 구현, API 연동, 데이터 처리까지 필요한 범위를 맡아 실제로 사용할 수 있는 형태로 정리합니다.",
  },
];

export const metadata: Metadata = {
  title: "소개 | 포트폴리오",
};

export default function Page() {
  return (
    <main className="p-4 md:p-8 mx-auto max-w-7xl">
      <header className="mt-12 md:mt-16">
        <Image
          src="/images/about-me/me.jpg"
          alt="프로필 이미지"
          width={1920}
          height={1080}
          className="h-80 md:h-auto md:aspect-video w-full object-cover rounded-lg"
        />
        <h1 className="mt-8 text-4xl md:text-6xl font-bold leading-tight text-balance">
          안녕하세요.
          <br />
          개발과 보안을 다루는
          <br />
          <span className="text-custom-2">엔지니어</span>입니다.
        </h1>

        <p className="mt-8 max-w-2xl md:text-lg font-medium text-balance">
          금융SI 회사에서 개발이랑 취약점 점검 업무를 하고 있습니다. 팀에서
          필요로 하는 솔루션이나 툴을 개발하고 있으며 각종 금융관계사에 취약점
          점검 업무를 수행하고 있습니다. 개인적으로는 그때그때 흥미롭게 재밌거나
          흥미롭게 생각하는 프로젝트를 합니다.
        </p>
      </header>

      <section className="mt-32 p-8 grid gap-8 md:grid-cols-2 border-y border-custom-3 bg-custom-4">
        <div>
          <p className="text-custom-2 font-semibold">프로필</p>
          <h2 className="md:mt-2 text-2xl md:text-4xl font-bold leading-normal">
            위험 요소를 점검하고,
            <br /> 필요한 기능을 구현합니다.
          </h2>
        </div>
        <ul className="space-y-8">
          {PROFILE.map((item, index) => (
            <li key={item.title} className="py-4 not-last:border-b flex gap-4">
              <div className="mt-1 text-sm font-semibold text-custom-2">
                0{index + 1}
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 break-keep font-medium text-muted-foreground text-balance">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-32">
        <h2 className="text-2xl md:text-4xl font-bold">링크</h2>

        <ul className="mt-4 space-y-4">
          <li>
            <Link
              href={"https://github.com/mrbonk97"}
              target="_blank"
              rel="noreferrer"
              className="block p-4 md:p-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 duration-150"
            >
              GitHub
            </Link>
          </li>
          <li>
            <Link
              href={"https://www.instagram.com/mrbonk97"}
              target="_blank"
              rel="noreferrer"
              className="block p-4 md:p-8 rounded-lg bg-primary text-primary-foreground hover:bg-primary/80 duration-150"
            >
              Instagram
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
