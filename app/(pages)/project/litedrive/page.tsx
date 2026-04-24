import Image from "next/image";
import { LinkSection } from "@/components/project/link-section";
import { HeaderSection } from "@/components/project/header-section";
import { TitleSection } from "@/components/project/title-section";
import { StackSection } from "@/components/project/stack-section";
import { FeatureSection } from "@/components/project/feature-section";
import {
  Cloud,
  GitBranch,
  ShieldCheck,
  TvMinimal,
  Upload,
  Database,
  HardDriveUpload,
  Workflow,
} from "lucide-react";

function ProjectPage_LITEDRIVE() {
  return (
    <main className="p-4 pt-20 mx-auto max-w-5xl leading-relaxed whitespace-pre-line">
      <HeaderSection
        title="파일 공유 서비스"
        titleEng="Litedrive"
        imgUrl="/images/project/litedrive/banner.png"
      />

      <section className="mt-16 md:mt-32">
        <TitleSection eyebrow="OVERVIEW" title="프로젝트 소개" />
        <p className="mt-4 md:mt-8">
          공용 PC에서 파일 하나 공유하려고 로그인하고, 인증까지 거치는 과정은 꽤
          번거롭습니다.
          <br />
          <br />
          Litedrive는 이런 불편함을 줄이기 위해, 계정 없이도 최소한의 인증만으로
          파일 업로드와 공유가 가능하도록 만든 서비스입니다. URL 구조도 단순하게
          가져가서, 누구나 바로 접근할 수 있게 했습니다.
          <br />
          <br />
          또한 대용량 업로드 과정에서 발생하는 실패 케이스(네트워크 끊김, 업로드
          중단 등)와 자원 소모 공격까지 고려해, 실제 서비스 환경에서도
          안정적으로 동작하도록 설계했습니다.
        </p>
      </section>

      <section className="mt-32">
        <TitleSection eyebrow="TECH STACK" title="프로젝트에 사용한 기술" />
        <StackSection
          stack={[
            {
              title: "Next.js",
              icon: "/icons/next.svg",
            },
            {
              title: "TanStack Query",
              icon: "/icons/tanstack-query.png",
            },
            {
              title: "Cloudflare Worker",
              icon: "/icons/cloudflare.svg",
            },
            {
              title: "Cloudflare R2",
              icon: "/icons/cloudflare.svg",
            },
          ]}
        />
      </section>

      <section className="mt-32">
        <TitleSection eyebrow="CORE FEATURES" title="핵심 기능" />
        <FeatureSection
          features={[
            {
              icon: <Upload />,
              title: "간편한 파일 업로드와 공유",
              description:
                "복잡한 계정 시스템 대신 최소한의 인증만으로 파일 업로드와 접근이 가능하도록 설계해 빠른 공유 경험을 제공했습니다.",
            },
            {
              icon: <ShieldCheck />,
              title: "대용량 요청 방어 구조",
              description:
                "업로드 용량 제한을 애플리케이션 계층이 아닌 Edge 단계에서 검증하여, 과도한 요청이 스토리지까지 도달하기 전에 차단하도록 구성했습니다.",
            },
            {
              icon: <Cloud />,
              title: "Edge 기반 업로드 처리",
              description:
                "Cloudflare Worker를 활용해 업로드 요청을 스트리밍 방식으로 처리하고, 용량 검증과 인증 검증을 빠르게 수행하도록 설계했습니다.",
            },
            {
              icon: <Workflow />,
              title: "상태 기반 업로드 트랜잭션",
              description:
                "Pending, Success, Fail 상태를 중심으로 업로드 흐름을 설계하여 실패 상황에서도 데이터 정합성을 유지할 수 있도록 했습니다.",
            },
          ]}
        />
      </section>

      <section className="mt-32">
        <TitleSection
          eyebrow="DEEP DIVE"
          title="파일 업로드 취약점 개선 및 아키텍처 재설계"
        />
        <p className="mt-2 md:mt-4 text-muted-foreground">
          초기 구조에서는 서버를 통해 업로드를 중계했지만, 업로드 용량을 서버
          이전 단계에서 효과적으로 차단하기 어려워 대용량 요청 기반 자원 소모
          공격에 취약한 문제가 있었습니다.
        </p>
        <div className="mt-8 p-4 md:p-8 rounded-lg bg-secondary">
          <div className="flex items-center gap-2">
            <HardDriveUpload />
            <h4 className="md:text-2xl font-bold">
              문제점: Cloudflare R2는 서버 측 업로드 용량 제한 API를 직접
              제공하지 않음
            </h4>
          </div>

          <p className="mt-4 font-medium">
            서버 레벨에서 요청을 미리 제어하기 어렵기 때문에, 대용량 요청이
            스토리지까지 도달하며 네트워크 및 저장 자원을 비효율적으로 점유할 수
            있었습니다.
          </p>
        </div>

        <p className="mt-8">
          기존 업로드 구조는 서버가 요청을 받아 스토리지로 중계하는 방식이었고,
          업로드 용량을 조기에 차단할 수 있는 제어 지점이 충분하지 않았습니다.
          그 결과 대용량 요청이 그대로 전달되면, 실제 저장 이전 단계에서도
          네트워크와 스토리지 자원이 불필요하게 점유될 수 있었습니다.
        </p>

        <p className="mt-8">
          이를 해결하기 위해 업로드 경로를 서버 중심 구조에서 Edge 기반 구조로
          재설계했습니다. Cloudflare Worker를 도입하여 업로드 요청을 스트리밍
          방식으로 처리하고, 데이터 수신 단계에서 누적 용량을 실시간으로
          검증하도록 구성했습니다.
        </p>

        <p className="mt-8">
          Worker는 요청 스트림을 직접 읽으면서 데이터 크기를 계산하고, 누적
          크기가 10MB를 초과하는 시점에 즉시 스트림을 종료합니다. 이를 통해
          요청이 스토리지까지 도달하기 전에 자원 사용을 선제적으로 차단할 수
          있도록 했습니다.
        </p>

        <p className="mt-8">
          또한 Edge 환경은 기존 서버의 인증 상태를 그대로 공유하지 않기 때문에,
          업로드 요청의 신뢰성을 확보하기 위해 업로드 전용 토큰 기반 인증 방식을
          도입했습니다. 서버에서 사전 발급한 토큰을 Worker가 검증한 뒤 업로드를
          허용함으로써, 인증되지 않은 요청을 효과적으로 차단할 수 있도록
          설계했습니다.
        </p>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div>
            <Image
              src={"/images/project/litedrive/img-2.png"}
              height={1024}
              width={1024}
              alt="img-2"
              className="p-2 rounded-lg border"
            />
            <p className="mt-4 text-sm text-center text-muted-foreground">
              파일 업로드 프로세스
            </p>
          </div>
          <div>
            <Image
              src={"/images/project/litedrive/img-1.png"}
              height={1024}
              width={1024}
              alt="img-1"
              className="p-2 rounded-lg border"
            />
            <p className="mt-4 text-sm text-center text-muted-foreground">
              Edge 기반으로 전환
            </p>
          </div>
        </div>
      </section>

      <section className="mt-32">
        <TitleSection
          eyebrow="TRANSACTION DESIGN"
          title="업로드 상태 기반 트랜잭션 설계"
        />

        <p className="mt-2 md:mt-4 text-muted-foreground">
          파일 업로드는 성공만 존재하는 단순 작업이 아니라, 네트워크 단절,
          사용자 중단, 용량 초과 등 다양한 실패 흐름을 포함합니다. 따라서 업로드
          완료 여부뿐 아니라 중간 상태까지 관리할 수 있는 구조가 필요했습니다.
        </p>

        <div className="mt-8 grid md:grid-cols-2 gap-4">
          <div className="p-4 md:p-8 rounded-lg bg-secondary">
            <h4 className="md:text-lg font-bold">
              <Workflow className="inline mr-2" /> 상태 기반 업로드 흐름 정의
            </h4>

            <div className="mt-4 p-4 rounded-lg bg-background">
              <p className="font-medium">상태 정의</p>
              <ul className="mt-4 ml-4 space-y-2 list-disc text-sm md:text-base text-muted-foreground">
                <li>Pending: 업로드 진행 중</li>
                <li>Success: 업로드 완료</li>
                <li>Fail: 업로드 실패</li>
              </ul>
            </div>

            <p className="mt-4 text-muted-foreground">
              업로드를 하나의 단발성 요청으로 보지 않고, 상태 전이를 가지는
              작업으로 모델링하여 비정상 종료 상황에서도 현재 상태를 추적할 수
              있도록 했습니다.
            </p>
          </div>

          <div className="p-4 md:p-8 rounded-lg border">
            <h4 className="md:text-lg font-bold">
              <Database className="inline mr-2" />
              데이터 정합성 보장 방식
            </h4>

            <p className="mt-4 text-muted-foreground">
              업로드 요청이 시작되면 서버는 먼저 Pending 상태의 레코드를
              생성하고, 업로드 전용 토큰을 발급합니다. 클라이언트는 이 토큰을
              포함해 Worker에 업로드를 요청하고, Worker는 검증을 마친 뒤
              스트리밍 방식으로 파일을 저장합니다.
            </p>

            <p className="mt-4 text-muted-foreground">
              업로드 완료 시에는 Success, 실패 시에는 Fail 상태로 갱신하여
              중단되거나 손상된 업로드에 대해서도 일관된 상태 관리가 가능하도록
              했습니다. 이를 통해 orphan 리소스나 데이터 불일치 발생 가능성을
              낮췄습니다.
            </p>
          </div>
        </div>
        <Image
          src={"/images/project/litedrive/img-3.png"}
          height={1024}
          width={1024}
          alt="img-3"
          className="mt-8 p-2 border rounded-lg"
        />
      </section>

      <section className="my-32">
        <TitleSection eyebrow="LINK" title="프로젝트 링크" />
        <p className="mt-4 text-muted-foreground">
          소스코드와 실제 서비스 링크를 통해 구현 결과를 직접 확인할 수 있도록
          연결했습니다.
        </p>
        <LinkSection
          links={[
            {
              icon: <GitBranch />,
              url: "https://github.com/mrbonk97/litedrive",
            },
            {
              icon: <TvMinimal />,
              url: "https://www.litedrive.app",
            },
          ]}
        />
      </section>
    </main>
  );
}

export default ProjectPage_LITEDRIVE;
