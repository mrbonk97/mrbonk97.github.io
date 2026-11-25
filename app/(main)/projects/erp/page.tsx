import { ProjectHeader } from "@/components/projects/project-header";
import { ArticleSection } from "@/components/article/article-section";
import {
  SurveyPolicyDiagram,
  SurveyStateMatrix,
} from "@/components/projects/erp-diagrams";
import { TechStack } from "@/components/projects/tech-stack";
import { DEV_PROJECTS } from "@/constants/dev-project";
import { Skull } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "한국수력원자력 ERP 고도화 프로젝트 | mrbonk97",
  description:
    "한국수력원자력 ERP 고도화 프로젝트의 풀스택 개발 기록. 설문 상태 30개 조합의 접근 권한을 SQL 기반으로 처리하고, 저장과 제출 시 최신 상태를 재검증하도록 설계했습니다.",
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

        <ArticleSection title="시스템 아키텍처">
          <div className="p-4 lg:p-8 h-64 flex flex-col items-center justify-center gap-4 rounded bg-secondary">
            <Skull
              className="size-8 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="font-medium text-muted-foreground">비공개</p>
          </div>
        </ArticleSection>

        <ArticleSection title="문제 해결">
          <section>
            <h3 className="text-lg font-semibold">
              설문 상태 30개 조합의 접근 권한을 일관되게 처리
            </h3>
            <p className="mt-4">
              BSC 성과지표 설문조사는 설문 운영 상태와 사용자 응답 상태, 참여
              대상 여부에 따라 접근, 수정, 제출, 결과 조회 권한이 달라졌습니다.
              설문이 일시정지되거나 종료되어도 기존 답변은 보존해야 했고,
              화면마다 권한을 판단하면 조건이 중복되거나 서로 다른 정책이 적용될
              수 있었습니다.
            </p>

            <p className="mt-4">
              운영 상태 5개(생성, 예약, 진행, 일시정지, 종료), 응답 상태
              3개(미응답, 작성 중, 제출 완료), 참여 대상 여부 2개를 조합하면
              총 30개 입력 조합이 됩니다. 각 조합의 접근, 수정, 제출 권한과
              표시할 화면을 하나의 정책으로 결정했습니다.
            </p>

            <SurveyStateMatrix />

            <p className="mt-8">
              설문 운영 상태와 사용자 응답 상태를 독립적으로 관리하고, SQL
              JOIN으로 설문 상태, 응답 상태, 참여 대상 여부를 한 번에 조회하도록
              설계했습니다. 응답 데이터가 없는 사용자는 미응답으로 구분해 별도의
              상태 관리 로직을 최소화했습니다.
            </p>
            <p className="mt-4">
              설문 운영 상태가 바뀌어도 응답 데이터는 유지하고, 조회한 상태
              조합을 기준으로 허용할 동작을 판단하도록 구성했습니다.
            </p>
          </section>

          <section className="mt-16">
            <h3 className="text-lg font-semibold">
              참여 대상과 제출 여부를 먼저 판단하는 정책 우선순위
            </h3>
            <p className="mt-4">
              설문이 일시정지되었다고 모든 사용자의 접근을 막을 수는 없었습니다.
              제출을 마친 사용자는 기존 결과를 조회할 수 있어야 하지만, 미제출
              사용자의 수정과 제출은 제한해야 했습니다. 현업과 함께 참여 대상
              여부, 제출 완료 여부, 설문 운영 상태 순으로 정책 우선순위를
              정의했습니다.
            </p>

            <SurveyPolicyDiagram />

            <table className="mt-8 w-full text-left">
              <caption className="mb-4 text-left font-medium">
                설문 일시정지 시 적용한 권한 정책
              </caption>
              <thead className="border-b">
                <tr>
                  <th scope="col" className="py-4 pr-4 font-medium">
                    사용자 상태
                  </th>
                  <th scope="col" className="py-4 font-medium">
                    처리 기준
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y border-b">
                {[
                  [
                    "참여 비대상",
                    "참여 대상 여부를 먼저 확인해 접근을 차단합니다.",
                  ],
                  [
                    "제출 완료",
                    "제출 완료자에 대한 예외를 적용해 기존 결과 조회를 허용합니다.",
                  ],
                  [
                    "미제출",
                    "일시정지 상태에 따라 수정과 제출을 제한하고 기존 답변은 보존합니다.",
                  ],
                ].map(([state, policy]) => (
                  <tr key={state}>
                    <th scope="row" className="py-4 pr-4 align-top font-medium">
                      {state}
                    </th>
                    <td className="py-4 align-top">{policy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section className="mt-16 leading-relaxed">
            <h3 className="text-lg font-semibold">
              저장과 제출 시 서버에서 최신 상태를 재검증
            </h3>
            <p className="mt-4">
              사용자가 답변을 작성하는 도중에도 설문은 일시정지될 수 있었습니다.
              화면을 열 때 확인한 권한만으로는 데이터 변경 시점의 참여 가능
              여부를 보장할 수 없었습니다.
            </p>
            <p className="mt-4">
              임시 저장과 최종 제출 시 서버에서 최신 설문 상태와 참여 자격을
              다시 검증하도록 설계했습니다. 화면 진입 이후 운영 상태가
              바뀌더라도 변경 시점의 정책에 따라 처리하도록 했습니다.
            </p>
            <p className="mt-4">
              상태 조회부터 권한 판단까지 SQL 기반으로 일관되게 처리해 Java의
              복잡한 조건 분기와 중복 로직을 최소화했습니다. 기존 답변을
              보존하면서 다양한 상태 조합에 같은 기준을 적용해 유지보수성과
              정책의 일관성을 높였습니다.
            </p>
          </section>
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
