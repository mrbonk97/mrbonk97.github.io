import { ProjectHeader } from "@/components/projects/project-header";
import { ArticleSection } from "@/components/article/article-section";
import { MailPerformance } from "@/components/projects/mail-performance";
import { TechStack } from "@/components/projects/tech-stack";
import { DEV_PROJECTS } from "@/constants/dev-project";
import { Skull } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "악성메일 모의훈련 솔루션 | mrbonk97",
  description:
    "악성메일 모의훈련 솔루션의 프론트엔드 전담 개발 기록. 15,000명 목록에서 체크박스 INP를 5,464ms에서 176ms로 약 96.8% 단축하고, 브라우저 검색과 텍스트 복사 기능을 유지했습니다.",
};

const measurements = [
  { count: 100, before: 40, memoization: 16, virtualization: 16 },
  { count: 1000, before: 176, memoization: 32, virtualization: 16 },
  { count: 5000, before: 862, memoization: 152, virtualization: 16 },
  { count: 10000, before: 2872, memoization: 160, virtualization: 16 },
  { count: 15000, before: 5464, memoization: 176, virtualization: 16 },
];

export default function Page() {
  const project = DEV_PROJECTS.find((item) => item.id === "1qcatch");
  if (!project) notFound();

  return (
    <main className="p-4 lg:p-4 pt-20 lg:pt-20 mx-auto max-w-3xl">
      <ProjectHeader project={project} />

      <ArticleSection title="기술스택">
        <TechStack items={project.stack} />
      </ArticleSection>

      <ArticleSection title="시스템 아키텍처">
        <div className="p-4 lg:p-8 h-64 flex items-center justify-center flex-col gap-4 bg-secondary text-secondary-foreground rounded">
          <Skull className="stroke-muted-foreground" />
          <p className="font-medium text-muted-foreground">비공개</p>
        </div>
      </ArticleSection>

      <ArticleSection title="문제 해결">
        <section>
          <h3 className="text-2xl font-semibold">
            15,000명 목록에서 발생한 체크박스 선택 지연
          </h3>
          <p className="mt-4">
            관리자는 수천 명의 훈련 대상자를 하나의 목록에서 확인하고 수정해야
            했습니다. 대상자가 늘어날수록 체크박스 선택이 화면에 반영되는 시간이
            길어졌습니다. Chrome DevTools로 측정한 체크박스 반응 시간(INP)은
            15,000명 기준 5,464ms였습니다.
          </p>
          <p className="mt-4">
            원인은 목록 전체로 확산되는 리렌더링이었습니다. 한 명의 선택 상태만
            바뀌어도 선택과 무관한 행까지 다시 렌더링되고 있었습니다. 불필요한
            리렌더링을 줄이는 메모이제이션과 렌더링할 행 수를 줄이는 가상
            스크롤을 각각 적용해 비교했습니다.
          </p>

          <dl className="mt-8 space-y-12">
            <div>
              <dt className="font-semibold">
                메모이제이션: 전체 목록을 유지하며 리렌더링 축소
              </dt>
              <dd className="mt-2">
                <p>
                  각 행에 <code>React.memo</code>를 적용하고 이벤트 핸들러는{" "}
                  <code>useCallback</code>으로 함수 참조를 유지했습니다. 선택
                  상태가 바뀌지 않은 행의 리렌더링을 줄이면서 전체 목록의 DOM
                  구조를 유지했습니다. 15,000명 기준 INP는 176ms로 줄었습니다.
                </p>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">
                가상 스크롤: 화면에 보이는 범위로 렌더링 제한
              </dt>
              <dd className="mt-2">
                <p>
                  TanStack Virtual을 적용해 전체 목록 대신 화면에 보이는 행을
                  중심으로 렌더링했습니다. 렌더링할 행 수를 줄인 결과, 15,000명
                  기준 INP는 16ms로 줄었습니다.
                </p>
              </dd>
            </div>
          </dl>

          <MailPerformance measurements={measurements} />
        </section>

        <section className="mt-16">
          <h3 className="text-2xl font-semibold">
            검색과 복사 작업을 유지하기 위해 메모이제이션 채택
          </h3>
          <p className="mt-4">
            15,000명 기준 가상 스크롤의 INP는 16ms로, 메모이제이션의 176ms보다
            낮았습니다. 그러나 관리자는 브라우저의 <kbd>Ctrl+F</kbd>로 대상자를
            검색하고, 여러 행의 텍스트를 선택해 Excel에 붙여넣는 작업을 하고
            있었습니다.
          </p>
          <p className="mt-4">
            가상 스크롤은 화면 밖의 행을 DOM에서 제외하므로 전체 목록에 대한
            브라우저 검색과 연속적인 텍스트 선택이 제한됩니다. 이 작업 방식을
            유지하기 위해 전체 목록의 DOM을 보존하는 메모이제이션을 최종
            채택했습니다.
          </p>
          <p className="mt-4">
            그 결과 15,000명 기준 체크박스 INP를 5,464ms에서 176ms로, 5,288ms
            줄였습니다. 최적화 전 대비 약 96.8% 단축했으며, 관리자의 기존 검색과
            복사 작업도 유지했습니다.
          </p>
        </section>
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
