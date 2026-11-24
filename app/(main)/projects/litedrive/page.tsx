import { ProjectHeader } from "@/components/projects/project-header";
import { ArticleSection } from "@/components/article/article-section";
import {
  UploadGatewayDiagram,
  UploadStateDiagram,
  UploadStreamDiagram,
} from "@/components/projects/litedrive-diagrams";
import { TechStack } from "@/components/projects/tech-stack";
import { StatusLabel } from "@/components/projects/status-label";
import { DEV_PROJECTS } from "@/constants/dev-project";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "LiteDrive | mrbonk97",
  description:
    "경량 파일 공유 서비스 LiteDrive의 풀스택 개발 기록. Cloudflare Worker에서 업로드 권한과 실제 파일 크기를 검증하고, 원자적 상태 전이로 요청 재사용을 차단했습니다.",
};

export default function Page() {
  const project = DEV_PROJECTS.find((item) => item.id === "litedrive");
  if (!project) notFound();

  return (
    <main className="p-4 lg:p-4 pt-20 lg:pt-20 mx-auto max-w-3xl">
      <ProjectHeader
        project={project}
        links={[
          { label: "서비스 보기", href: "https://www.litedrive.app" },
          { label: "GitHub", href: "https://github.com/mrbonk97/litedrive" },
        ]}
      />

      <article>
        <ArticleSection title="기술스택">
          <TechStack items={project.stack} />
        </ArticleSection>

        <ArticleSection title="주요 기능">
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold">파일 업로드, 다운로드, 공유</dt>
              <dd className="mt-2">
                최소한의 인증으로 파일을 올리고 공유할 수 있도록 구성했습니다.
                사용자와 대상 리소스의 접근 권한을 확인해 파일을 관리합니다.
              </dd>
            </div>
            <div>
              <dt className="font-semibold">폴더 조작과 계층 구조 표현</dt>
              <dd className="mt-2">
                드래그 앤 드롭으로 폴더를 조작하고, 계층형 쿼리로 폴더와 파일
                트리를 구성했습니다.
              </dd>
            </div>
          </dl>
        </ArticleSection>

        <ArticleSection title="시스템 아키텍처">
          <p className="mb-8">
            앱 서버는 사용자 인증과 업로드 승인을 담당하고, 파일은
            클라이언트에서 Worker를 거쳐 R2로 전송합니다. 앱 서버가 파일을 직접
            중계하지 않으면서도 Worker에서 업로드 정책을 검증하도록
            구성했습니다.
          </p>
          <UploadGatewayDiagram />
        </ArticleSection>

        <ArticleSection title="문제 해결">
          <section>
            <h3 className="text-lg font-semibold">
              Presigned URL 직접 업로드에 추가한 검증 단계
            </h3>
            <p className="mt-4">
              기존에는 서버가 Presigned URL을 발급하면 클라이언트가 R2에 직접
              파일을 업로드했습니다. 앱 서버의 네트워크와 메모리 부담은 줄일 수
              있었지만, URL 발급 이후 실제 수신 크기를 검사하거나 서비스 DB의
              상태와 연계해 요청을 한 번만 사용하도록 제한하기 어려웠습니다.
            </p>
            <p className="mt-4">
              클라이언트와 R2 사이에 Worker를 배치했습니다. 앱 서버에서 세션과
              리소스 권한을 확인한 뒤 <StatusLabel status="PENDING" /> 요청을
              생성하고, 해당 요청에 사용할 단기 업로드 토큰을 발급하도록
              변경했습니다.
            </p>

            <table className="mt-8 w-full text-left">
              <caption className="mb-4 text-left font-medium">
                업로드 토큰에 담은 승인 범위
              </caption>
              <thead className="border-b">
                <tr>
                  <th scope="col" className="py-4 pr-4 font-medium">
                    필드
                  </th>
                  <th scope="col" className="py-4 font-medium">
                    확인할 정보
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y border-b">
                {[
                  ["sub", "업로드를 승인받은 사용자"],
                  ["uploadId", "DB에 생성한 업로드 요청"],
                  ["resourceId", "파일을 업로드할 대상 리소스"],
                  ["objectKey", "저장할 R2 객체 경로"],
                  ["maxSize", "허용할 최대 파일 크기"],
                  ["exp", "토큰 만료 시간"],
                ].map(([field, description]) => (
                  <tr key={field}>
                    <th scope="row" className="py-4 pr-4 align-top font-medium">
                      <code className="text-custom-200 dark:text-custom-300">
                        {field}
                      </code>
                    </th>
                    <td className="py-4 align-top">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-4">
              Worker는 토큰 서명과 만료를 검증하고 사용자, 리소스, 객체 경로를
              서버가 승인한 요청과 대조합니다. 앱 서버의 세션을 직접 공유하지
              않아도 승인된 범위 안에서만 파일을 저장하도록 했습니다.
            </p>
          </section>

          <section className="mt-16">
            <h3 className="text-lg font-semibold">
              원자적 상태 전이로 동시 요청과 재사용 차단
            </h3>
            <p className="mt-4">
              만료 시간만 확인하면 유효한 토큰 하나로 여러 업로드 요청을 동시에
              보낼 수 있습니다. 파일 전송을 시작하기 전에 DB 상태를
              <StatusLabel status="PENDING" />
              에서 <StatusLabel status="UPLOADING" />
              으로 선점하도록 했습니다.
            </p>

            <UploadStateDiagram />

            <p className="mt-8">
              사용자와 리소스가 일치하고, 아직 만료되지 않았으며, 현재 상태가
              <StatusLabel status="PENDING" />인 행만 조건부 UPDATE로
              변경합니다. 여러 요청이 동시에 도착해도 하나만 상태 변경에
              성공하도록 하고, 갱신된 행이 없으면 업로드를 거부했습니다.
            </p>
            <p className="mt-4">
              R2 저장이 완료되면 <StatusLabel status="SUCCESS" />
              로, 실패하면 <StatusLabel status="FAILED" />로 기록했습니다. 승인
              요청과 저장 객체를 연결하고 완료 여부와 실패 원인을 추적할 수
              있도록 구성했습니다.
            </p>
          </section>

          <section className="mt-16">
            <h3 className="text-lg font-semibold">
              실제 수신 바이트를 세어 스트리밍 용량 제한
            </h3>
            <p className="mt-4">
              파일 전체를 ArrayBuffer로 변환하면 파일 크기만큼 Worker 메모리를
              사용합니다. 요청 본문을 스트림 상태로 처리하고,
              TransformStream에서 청크의 byteLength를 누적해 용량을
              검사했습니다.
            </p>
            <UploadStreamDiagram />
            <p className="mt-4 text-muted-foreground">
              최대 크기는 10 × 1024 × 1024바이트(10 MiB)로 설정했습니다.
            </p>
            <p className="mt-8">
              제한 안의 청크만 R2 바인딩의 put()으로 전달해 파일 전체를 메모리에
              적재하지 않도록 했습니다. 앱 서버가 파일 스트림을 직접 처리하지
              않는 구조를 유지하면서, Worker에서 승인 범위와 실제 업로드 크기,
              요청 재사용 여부를 통제할 수 있게 됐습니다.
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
