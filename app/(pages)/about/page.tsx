import Link from "next/link";
import Image from "next/image";

export default function About() {
  return (
    <main className="p-4 mx-auto max-w-5xl">
      <header className="mt-16 md:mt-24">
        <Image
          src="/images/about/me.jpg"
          alt="프로필 이미지"
          width={1920}
          height={1080}
          priority
          className="block aspect-video w-full object-cover rounded-lg"
        />
        <h1 className="mt-8 text-4xl md:text-6xl font-bold leading-tight">
          안녕하세요.
          <br />
          개발과 보안을 다루는
          <br />
          <span className="text-custom-2">엔지니어</span>입니다.
        </h1>

        <p className="mt-4 md:mt-8 p-2 md:p-0 max-w-2xl md:text-lg font-medium md:break-keep">
          금융SI 회사에서 개발이랑 취약점 점검 업무를 하고 있습니다. 팀에서
          필요로 하는 솔루션이나 툴을 개발하고 있으며 각종 금융관계사에 취약점
          점검 업무를 수행하고 있습니다. 개인적으로는 그때그때 흥미롭게 재밌거나
          흥미롭게 생각하는 프로젝트를 합니다.
        </p>
      </header>

      <section className="mt-32 p-8 grid md:grid-cols-2 border-y border-custom-3 bg-custom-4">
        <div>
          <p className="text-sm uppercase text-custom-2 font-semibold">
            About Me
          </p>
          <h2 className="mt-4 text-2xl md:text-4xl font-bold">
            두 영역에 집중합니다.
          </h2>
        </div>

        <ul className="space-y-8">
          {[
            {
              title: "Development",
              description:
                "팀에 필요한 내부 도구와 서비스형 솔루션을 설계하고 개발합니다. 프론트엔드와 백엔드를 아우르며, 실제 업무에 바로 활용할 수 있는 형태로 구현하는 데 집중합니다.",
            },
            {
              title: "Security",
              description:
                "금융 관계사를 대상으로 취약점 점검과 보안성 검토를 수행합니다. 기능 구현에 그치지 않고, 운영 환경에서의 안정성과 보안까지 함께 고려합니다.",
            },
          ].map((item, index) => (
            <li key={item.title} className="py-4 not-last:border-b flex gap-4">
              <div className="mt-1 text-sm font-semibold text-custom-2">
                0{index + 1}
              </div>
              <div>
                <h3 className="text-2xl font-semibold">{item.title}</h3>
                <p className="mt-2 break-keep font-medium text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-32">
        <h2 className="text-2xl font-bold">링크</h2>

        <ul className="mt-4 grid md:grid-cols-2 gap-4">
          {[
            { name: "GitHub", href: "https://github.com/mrbonk97" },
            { name: "Instagram", href: "https://www.instagram.com/mrbonk97" },
          ].map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="p-4 block rounded-lg border hover:bg-secondary duration-150"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
