import { ProjectHeader } from "@/components/projects/project-header";
import { ArticleSection } from "@/components/article/article-section";
import { SurveyPolicyDiagram } from "@/components/projects/erp-diagrams";
import { TechStack } from "@/components/projects/tech-stack";
import { DEV_PROJECTS } from "@/constants/dev-project";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "한국수력원자력 ERP 고도화 프로젝트 | mrbonk97",
  description:
    "한국수력원자력 ERP 고도화 프로젝트에서 BSC 성과지표 관리와 전자공청회 시스템을 개발하고, 설문 상태 30개 조합의 권한을 SQL 기반으로 일관되게 처리했습니다.",
};

export default function Page() {
  const project = DEV_PROJECTS.find((item) => item.id === "erp");
  if (!project) notFound();

  return (
    <main className="p-4 lg:p-4 pt-20 lg:pt-20 mx-auto max-w-3xl">
      <ProjectHeader project={project} />

      <article>
        <ArticleSection title="기술스택">
          <TechStack items={project.stack} />
        </ArticleSection>

        <ArticleSection title="담당 업무">
          <ul className="pl-4 list-disc space-y-2">
            <li>BSC 성과지표 관리와 전자공청회 시스템 개발</li>
            <li>설문 운영 기능과 사용자 상태별 권한 제어 구현</li>
            <li>프로젝트 공정관리</li>
          </ul>
        </ArticleSection>

        <ArticleSection title="문제 해결">
          <h3 className="text-2xl font-semibold">
            다양한 설문 상태 조합의 권한 처리
          </h3>
          <p className="mt-4">
            설문 운영 상태 5개, 응답 상태 3개, 참여 대상 여부 2개에 따라 접근,
            수정, 제출, 결과 조회 권한이 달라졌습니다. 화면별로 조건을 판단하면
            정책이 달라질 수 있었고, 설문이 중단되어도 기존 답변은 보존해야
            했습니다.
          </p>

          <dl className="mt-8 space-y-12">
            <div>
              <dt className="font-semibold">SQL JOIN으로 상태 통합 조회</dt>
              <dd className="mt-2">
                <p>
                  설문 상태와 응답 상태를 분리해 관리하고, 참여 대상 여부까지 한
                  번에 조회했습니다. 응답 데이터가 없으면 미응답으로
                  구분했습니다.
                </p>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">권한 판단 순서 통일</dt>
              <dd className="mt-2">
                <p>
                  현업과 함께 참여 대상, 제출 완료, 운영 상태 순으로 판단 기준을
                  정했습니다. 일시정지 중에도 제출 완료자는 결과를 조회할 수
                  있고, 미제출자는 수정과 제출을 제한했습니다.
                </p>
              </dd>
            </div>
            <div>
              <dt className="font-semibold">저장과 제출 시 권한 재검증</dt>
              <dd className="mt-2">
                <p>
                  작성 중 설문 상태가 바뀔 수 있어, 임시 저장과 최종 제출 시
                  서버에서 최신 상태와 참여 자격을 다시 확인했습니다.
                </p>
              </dd>
            </div>
          </dl>

          <SurveyPolicyDiagram />
        </ArticleSection>
      </article>

      <Link
        href="/projects"
        className="mt-16 inline-block underline-offset-4 text-muted-foreground hover:underline"
      >
        프로젝트 목록
      </Link>
    </main>
  );
}
