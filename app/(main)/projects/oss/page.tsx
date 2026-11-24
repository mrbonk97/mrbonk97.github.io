import { ProjectHeader } from "@/components/projects/project-header";
import { ArticleSection } from "@/components/article/article-section";
import {
  DiagnosisScopeDiagram,
  VersionNormalizationDiagram,
} from "@/components/projects/oss-diagrams";
import { TechStack } from "@/components/projects/tech-stack";
import { DEV_PROJECTS } from "@/constants/dev-project";
import { Skull } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "오픈소스 취약점 관리 서비스 | mrbonk97",
  description:
    "오픈소스 취약점 관리 서비스의 백엔드 개발 기록. SBOM 재진단 대상 선별과 버전 비교 로직을 개선했습니다.",
};

export default function Page() {
  const project = DEV_PROJECTS.find((item) => item.id === "oss");
  if (!project) notFound();

  return (
    <main className="p-4 lg:p-4 pt-20 lg:pt-20 mx-auto max-w-3xl">
      <ProjectHeader project={project} />

      <article>
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
          <section className="leading-relaxed">
            <h3 className="text-lg font-semibold">
              변경된 취약점과 관련된 SBOM만 재진단
            </h3>
            <p className="mt-4">
              취약점 정보가 갱신될 때마다 모든 SBOM(소프트웨어 구성요소 목록)을
              다시 검사해, 변경과 무관한 패키지까지 반복 진단하고 있었습니다.
              영향 패키지를 사용하는 프로젝트의 최신 SBOM만 선별하도록
              바꿨습니다.
            </p>

            <DiagnosisScopeDiagram />

            <table className="mt-8 w-full text-left">
              <caption className="mb-4 text-left font-medium">
                선별과 재처리 기준
              </caption>
              <thead className="border-b">
                <tr>
                  <th scope="col" className="w-1/3 py-4 pr-4 font-medium">
                    구분
                  </th>
                  <th scope="col" className="py-4 font-medium">
                    적용한 기준
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y border-b">
                {[
                  [
                    "대상 선별",
                    "변경된 영향 패키지의 식별 정보로 관련된 최신 SBOM을 찾습니다. 이 단계에서는 버전을 제외합니다.",
                  ],
                  [
                    "최종 판정",
                    "후보의 실제 설치 버전과 취약 버전 범위를 비교해 영향 여부를 판정합니다.",
                  ],
                  [
                    "수집 중 실패",
                    "체크포인트를 기준으로 중단 이후의 데이터를 다시 처리할 수 있도록 했습니다.",
                  ],
                  [
                    "진단 중 변경",
                    "Revision 기반 큐 처리로 진단 중 들어온 새로운 변경 요청을 보존했습니다.",
                  ],
                  [
                    "결과 추적",
                    "취약점 원본과 판정 근거를 함께 남겨 진단 이력을 확인할 수 있도록 했습니다.",
                  ],
                ].map(([label, description]) => (
                  <tr key={label}>
                    <th scope="row" className="py-4 pr-4 align-top font-medium">
                      {label}
                    </th>
                    <td className="py-4 align-top">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-4">
              여러 프로젝트에서 쓰는 패키지는 관련 SBOM을 함께 검사하고, 특정
              프로젝트에만 쓰는 패키지는 해당 SBOM만 검사하게 됐습니다. 취약점의
              영향 범위에 맞춰 불필요한 재진단을 줄였습니다.
            </p>
          </section>

          <section className="mt-16 leading-relaxed">
            <h3 className="text-lg font-semibold">
              접미사가 포함된 버전의 비교 오류 개선
            </h3>
            <p className="mt-4">
              SNAPSHOT, rc, tuxcare 같은 접미사를 처리하지 못해 취약한 패키지를
              정상으로 판단하는 미탐이 발생했습니다. 접미사를 단순히 지우는 대신
              기본 버전과 부가 정보를 나누고, 원본을 보존하도록 개선했습니다.
            </p>

            <VersionNormalizationDiagram />

            <p className="mt-4">
              같은 기본 버전이어도 사전 릴리스나 배포사 패치에 따라 의미가
              달라질 수 있습니다. 사전 릴리스 식별자, 배포사 식별자, 빌드
              메타데이터를 구분하고 생태계별 비교 규칙을 적용했습니다.
            </p>

            <table className="mt-8 w-full text-left">
              <caption className="mb-4 text-left font-medium">
                비교 기준과 검증 항목
              </caption>
              <thead className="border-b">
                <tr>
                  <th scope="col" className="w-1/3 py-4 pr-4 font-medium">
                    확인할 경우
                  </th>
                  <th scope="col" className="py-4 font-medium">
                    비교와 판정 기준
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y border-b">
                <tr>
                  <th scope="row" className="py-4 pr-4 align-top font-medium">
                    숫자 비교
                  </th>
                  <td className="py-4">
                    <code>1.10.0 &gt; 1.9.0</code>
                    <p className="mt-2 text-muted-foreground">
                      각 숫자 요소를 문자열이 아닌 정수로 비교합니다.
                    </p>
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-4 align-top font-medium">
                    접미사 포함
                  </th>
                  <td className="py-4">
                    SNAPSHOT, rc, tuxcare 등의 정보를 유지하고 생태계별 규칙으로
                    비교합니다.
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-4 align-top font-medium">
                    취약 범위 경계
                  </th>
                  <td className="py-4">
                    범위의 시작과 종료 버전에서 경계값의 포함 여부를 확인합니다.
                  </td>
                </tr>
                <tr>
                  <th scope="row" className="py-4 pr-4 align-top font-medium">
                    비교 불확실
                  </th>
                  <td className="py-4">
                    관계를 명확히 판단할 수 없는 버전은 안전하다고 단정하지
                    않습니다.
                  </td>
                </tr>
              </tbody>
            </table>

            <p className="mt-4">
              접미사와 경계값 사례를 테스트에 추가해 같은 비교 실패가 반복되지
              않도록 검증했습니다. 오탐 가능성이 일부 늘더라도 취약점을 놓치는
              미탐을 줄이는 방향으로 판단 기준을 잡았습니다.
            </p>
          </section>
        </ArticleSection>
      </article>
      <Link
        href="/projects"
        className="mt-16 inline-block text-muted-foreground underline-offset-4 hover:underline"
      >
        프로젝트 목록
      </Link>
    </main>
  );
}
