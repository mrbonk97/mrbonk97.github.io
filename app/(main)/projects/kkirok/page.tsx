import { ProjectHeader } from "@/components/projects/project-header";
import { ProjectScreenshots } from "@/components/projects/project-screenshots";
import { ArticleSection } from "@/components/article/article-section";
import {
  AccountDeletionDiagram,
  OfflineSyncDiagram,
  SyncConflictDiagram,
} from "@/components/projects/kkirok-diagrams";
import { TechStack } from "@/components/projects/tech-stack";
import { StatusLabel } from "@/components/projects/status-label";
import { DEV_PROJECTS } from "@/constants/dev-project";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "끼록 | mrbonk97",
  description:
    "끼니와 일상을 기록하는 안드로이드 앱 끼록의 1인 개발 기록. Outbox 기반 회원 탈퇴와 RoomDB 중심의 오프라인 동기화를 구현했습니다.",
};

const screenshots = [
  {
    file: "kkirok_home.png",
    alt: "오늘과 어제의 식사 사진을 날짜별로 모아 보여주는 끼록 홈 화면",
  },
  {
    file: "kkirok_detail.png",
    alt: "식사 사진, 기록 시간, 평점, 공개 여부와 서버 저장 상태를 보여주는 끼록 기록 상세 화면",
  },
  {
    file: "kkirok_group.png",
    alt: "선택한 날짜의 그룹 구성원별 아침, 점심, 저녁 기록을 보여주는 끼록 그룹 화면",
  },
  {
    file: "kkirok_widget.png",
    alt: "구성원의 식사 사진과 이름을 휴대폰 홈 화면에서 확인하는 끼록 위젯",
  },
];

export default function Page() {
  const project = DEV_PROJECTS.find((item) => item.id === "kkirok");
  if (!project) notFound();

  return (
    <main className="p-4 lg:p-4 pt-20 lg:pt-20 mx-auto max-w-3xl">
      <ProjectHeader
        project={project}
        links={[
          {
            label: "Google Play에서 보기",
            href: "https://play.google.com/store/apps/details?id=com.hypersoso.kkirok",
          },
        ]}
      />

      <article>
        <ArticleSection title="스크린샷">
          <ProjectScreenshots
            projectId={project.id}
            screenshots={screenshots}
            width={1080}
            height={2340}
          />
        </ArticleSection>

        <ArticleSection title="기술스택">
          <TechStack items={project.stack} />
        </ArticleSection>

        <ArticleSection title="시스템 아키텍처">
          <p>
            네트워크 연결 여부와 관계없이 기록을 조회하고 편집할 수 있도록
            RoomDB를 화면 데이터의 기준으로 삼았습니다. 화면은 로컬 데이터의
            변경을 구독하고, 서버 동기화는 백그라운드 Worker가 담당합니다.
          </p>
          <OfflineSyncDiagram />
        </ArticleSection>

        <ArticleSection title="문제 해결">
          <section>
            <h3 className="text-2xl font-semibold">
              Outbox로 탈퇴 요청과 실제 삭제 작업 분리
            </h3>
            <p className="mt-4">
              회원 탈퇴 시 서비스 DB뿐 아니라 Firebase 인증 계정과 Cloudflare
              R2에 저장된 이미지까지 삭제해야 했습니다. 서로 다른 시스템의
              작업을 하나의 트랜잭션으로 묶을 수 없어 일부만 삭제될 위험이
              있었고, 외부 API의 지연은 사용자 응답 시간에도 영향을 미쳤습니다.
            </p>
            <p className="mt-4">
              탈퇴 요청을 받으면 회원 상태를 <StatusLabel status="IDLE" />
              에서 <StatusLabel status="DELETING" />
              으로 변경하고, Outbox 테이블에 삭제 작업을 기록했습니다. 두 변경을{" "}
              <code>@Transactional</code>로 묶어 함께 커밋하고, 사용자에게는
              커밋 후 즉시 응답하도록 했습니다.
            </p>

            <AccountDeletionDiagram />

            <p className="mt-8">
              실제 삭제는 Worker의 세 Job으로 나눴습니다. Firebase 계정과 R2
              이미지 삭제가 모두 완료된 경우에만 서비스 DB의 회원 데이터를 최종
              삭제하도록 순서를 정했습니다.
            </p>
            <dl className="mt-8 space-y-12">
              <div>
                <dt className="font-semibold">실패한 작업부터 재시도</dt>
                <dd className="mt-2">
                  <p>
                    성공한 Job은 Worker 테이블에서 제거하고, 실패한 Job은 지수
                    백오프로 재시도했습니다. 서버가 중단되어도 테이블에 남은
                    작업부터 이어서 처리할 수 있도록 했습니다.
                  </p>
                </dd>
              </div>
              <div>
                <dt className="font-semibold">중복 실행에도 안전한 삭제</dt>
                <dd className="mt-2">
                  <p>
                    이미 삭제된 대상은 성공으로 간주했습니다. 최종 삭제 Job은 앞선
                    두 Job이 테이블에 남아 있지 않을 때만 실행해 외부 데이터
                    삭제가 완료되기 전에 회원 데이터가 사라지지 않도록 했습니다.
                  </p>
                </dd>
              </div>
            </dl>
            <p className="mt-4">
              외부 API의 처리를 기다리지 않고 탈퇴 요청에 응답하면서도, 장애로
              중단된 삭제 작업을 이어서 완료할 수 있도록 구현했습니다.
            </p>
          </section>

          <section className="mt-16">
            <h3 className="text-2xl font-semibold">
              네트워크 없이도 기록을 조회하고 편집하는 동기화 구조
            </h3>
            <p className="mt-4">
              모바일 환경에서는 연결이 불안정하거나 인터넷을 사용할 수 없는
              상황이 발생합니다. 기록을 확인하거나 편집할 때마다 서버 응답을
              기다리지 않도록, 생성, 수정, 삭제를 먼저 RoomDB에 반영하고 UI는
              RoomDB의 Flow를 구독하도록 구현했습니다.
            </p>
            <p className="mt-4">
              서버에 반영할 작업은 각 레코드의 동기화 상태로 관리했습니다.
              상태를 로컬 DB에 영속적으로 저장해 프로세스가 종료되어도 다음
              동기화에서 미완료 작업을 식별할 수 있도록 했습니다.
            </p>

            <table className="mt-8 w-full text-left">
              <caption className="mb-4 text-left font-medium">
                레코드별 동기화 상태
              </caption>
              <thead className="border-b">
                <tr>
                  <th scope="col" className="py-4 pr-4 font-medium">
                    상태
                  </th>
                  <th scope="col" className="py-4 font-medium">
                    의미
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y border-b">
                {(
                  [
                    ["SYNCED", "서버와 동기화가 완료된 상태"],
                    [
                      "PENDING_UPSERT",
                      "생성하거나 수정한 내용을 서버에 반영해야 하는 상태",
                    ],
                    ["PENDING_DELETE", "삭제 요청을 서버에 반영해야 하는 상태"],
                  ] as const
                ).map(([state, description]) => (
                  <tr key={state}>
                    <th scope="row" className="py-4 pr-4 align-top font-medium">
                      <StatusLabel status={state} />
                    </th>
                    <td className="py-4 align-top">{description}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <p className="mt-8">
              Worker는 동기화가 필요한 레코드의 최신 데이터를 조회해 서버로
              Push한 뒤, Pull로 서버 데이터를 로컬에 반영했습니다. 병합 시에는
              <StatusLabel status="PENDING_UPSERT" />와{" "}
              <StatusLabel status="PENDING_DELETE" /> 상태를 고려해 아직
              전송하지 않은 로컬 변경이 서버 데이터로 덮어써지지 않도록
              했습니다.
            </p>
          </section>

          <section className="mt-16">
            <h3 className="text-2xl font-semibold">
              동기화 응답을 기다리는 동안 발생한 수정 보호
            </h3>
            <p className="mt-4">
              Worker가 최신 데이터를 전송했더라도 응답을 기다리는 동안 사용자가
              같은 기록을 다시 수정할 수 있습니다. 이전 요청의 성공 응답만 보고
              <StatusLabel status="SYNCED" />로 바꾸면, 아직 서버에 반영하지
              않은 최신 변경이 동기화 대상에서 빠질 수 있었습니다.
            </p>
            <p className="mt-4">
              Push 요청 시점의 <code>updatedAt</code>과 서버 응답 시점의 로컬{" "}
              <code>updatedAt</code>을 비교하는 낙관적 동시성 제어를
              적용했습니다. 비교와 상태 변경은 Room 트랜잭션 안에서 원자적으로
              처리했습니다.
            </p>
            <SyncConflictDiagram />
            <p className="mt-8">
              네트워크 오류나 프로세스 종료 이후에도 미완료 작업을 재시도하고,
              동기화 중 발생한 최신 로컬 변경을 보존하도록 구현했습니다.
              사용자는 연결 상태와 관계없이 기록을 즉시 조회하고 편집할 수 있게
              됐습니다.
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
