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
    "악성메일 모의훈련 솔루션의 프론트엔드 개발 기록. 대규모 대상자 목록의 검색과 복사 기능을 유지하면서 체크박스 선택 지연을 개선했습니다.",
};

const measurements = [
  { count: 100, before: 40, memoization: 16, virtualization: 16 },
  { count: 500, before: 104, memoization: 24, virtualization: 16 },
  { count: 1000, before: 176, memoization: 32, virtualization: 16 },
  { count: 2000, before: 216, memoization: 72, virtualization: 16 },
  { count: 5000, before: 862, memoization: 152, virtualization: 16 },
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
          <p className="text-sm font-medium text-muted-foreground">비공개</p>
        </div>
      </ArticleSection>

      <ArticleSection title="문제 해결">
        <section>
          <h3 className="text-lg font-semibold">
            대규모 대상자 목록의 체크박스 선택 지연
          </h3>
          <p className="mt-4">
            관리자는 수천 명의 훈련 대상자를 하나의 목록에서 확인하고 선택해야
            했습니다. 대상자가 늘어날수록 체크박스를 누른 뒤 화면에 반영되기까지
            지연이 커졌고, Chrome DevTools로 측정한 결과 5,000명 기준 최대
            862ms가 걸렸습니다.
          </p>
          <p className="mt-4">
            렌더링 과정을 분석하니 한 명의 선택 상태가 바뀔 때 관련 없는 다른
            행까지 다시 렌더링되고 있었습니다. 불필요한 행 렌더링을 줄이는
            방법과, 화면에 렌더링하는 행 자체를 줄이는 방법을 각각 검증했습니다.
          </p>

          <dl className="mt-8 space-y-4">
            <div>
              <dt className="font-semibold">
                메모이제이션을 적용해 변경된 행 중심으로 렌더링
              </dt>
              <dd className="mt-2">
                각 행에 <code>React.memo</code>를 적용하고 이벤트 핸들러는{" "}
                <code>useCallback</code>으로 함수 참조를 유지했습니다. 선택
                상태가 바뀌지 않은 행의 불필요한 렌더링을 줄였습니다.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">가상 스크롤로 렌더링 범위 제한</dt>
              <dd className="mt-2">
                TanStack Virtual을 적용해 전체 목록 대신 화면에 보이는 행을
                중심으로 렌더링했습니다. 목록이 커져도 실제 렌더링하는 행 수를
                제한할 수 있었습니다.
              </dd>
            </div>
          </dl>

          <MailPerformance measurements={measurements} />
        </section>

        <section className="mt-8">
          <h3 className="text-lg font-semibold">
            검색과 복사 작업을 유지하기 위한 선택
          </h3>
          <p className="mt-4">
            측정값은 가상 스크롤이 가장 빨랐습니다. 하지만 관리자들은 브라우저의{" "}
            <kbd>Ctrl+F</kbd>로 특정 대상자를 찾고, 여러 행의 텍스트를 드래그해
            Excel에 붙여넣는 방식으로 목록을 활용하고 있었습니다.
          </p>
          <p className="mt-4">
            가상 스크롤에서는 화면 밖의 행이 DOM에 존재하지 않아 브라우저 검색과
            연속적인 텍스트 복사를 기존처럼 유지하기 어려웠습니다. 전체 목록의
            사용성을 보존하면서 지연을 줄일 수 있는 메모이제이션을 최종
            선택했습니다.
          </p>
          <p className="mt-4">
            메모이제이션을 실제 서비스에 적용해 5,000명 기준 체크박스 반응시간을
            862ms에서 152ms로 약 82% 단축했습니다. 관리자의 기존 검색과 복사
            작업을 유지하면서 선택 지연을 개선했습니다.
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
