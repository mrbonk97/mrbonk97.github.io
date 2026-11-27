import { ArticleSection } from "@/components/article/article-section";
import { ProjectHeader } from "@/components/projects/project-header";
import { TechStack } from "@/components/projects/tech-stack";
import { DEV_PROJECTS } from "@/constants/dev-project";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "기타튜너 Tuner440 | mrbonk97",
  description:
    "기타 튜닝과 박자 연습을 위한 안드로이드 앱 Tuner440의 튜너, 메트로놈과 설정 화면을 소개합니다.",
};

const screenshots = [
  {
    file: "01_metronome_1080x2130.png",
    alt: "120 BPM과 4/4박자가 선택된 Tuner440 메트로놈 화면",
  },
  {
    file: "02_metronome_settings_1080x2130.png",
    alt: "소리 종류, 첫 박자 강조와 재생 옵션을 조절하는 Tuner440 설정 화면",
  },
  {
    file: "03_tuner_plus24_1080x2130.png",
    alt: "C3 기준음보다 24센트 높은 음과 입력 신호 세기를 표시하는 Tuner440 튜너 화면",
  },
  {
    file: "04_tuner_minus27_1080x2130.png",
    alt: "C3 기준음보다 27센트 낮은 음과 입력 신호 세기를 표시하는 Tuner440 튜너 화면",
  },
];

export default function Page() {
  const project = DEV_PROJECTS.find((item) => item.id === "tuner-440");
  if (!project) notFound();

  return (
    <main className="p-4 lg:p-4 pt-20 lg:pt-20 mx-auto max-w-3xl">
      <ProjectHeader
        project={project}
        links={[
          {
            label: "Google Play에서 보기",
            href: "https://play.google.com/store/apps/details?id=com.hypersoso.tuner440",
          },
        ]}
      />

      <ArticleSection title="구현 내용">
        <p>
          마이크 입력을 YIN 알고리즘과 배음 분석으로 처리해 음정과 센트 편차를
          표시했습니다. 주변 소음과 순간적인 음정 흔들림을 줄이도록 검출 조건을
          보완했습니다.
        </p>
        <p className="mt-4">
          메트로놈은 AudioTrack으로 구현해 템포, 박자, 소리와 첫 박자 강조를
          설정할 수 있습니다. 사용자 설정은 DataStore에 저장했습니다.
        </p>
      </ArticleSection>

      <ArticleSection title="스크린샷">
        <div className="grid sm:grid-cols-2 gap-8">
          {screenshots.map(({ file, alt }) => (
            <figure key={file} className="p-4 rounded bg-secondary">
              <Image
                src={`/projects/tuner-440/screenshot/${file}`}
                alt={alt}
                width={1080}
                height={2130}
                sizes="(min-width: 768px) 320px, (min-width: 640px) calc((100vw - 128px) / 2), calc(100vw - 64px)"
                className="h-auto w-full rounded"
              />
            </figure>
          ))}
        </div>
      </ArticleSection>

      <ArticleSection title="기술스택">
        <TechStack items={project.stack} />
      </ArticleSection>

      <Link
        href="/projects"
        className="mt-16 inline-block text-muted-foreground underline-offset-4 hover:underline"
      >
        프로젝트 목록
      </Link>
    </main>
  );
}
