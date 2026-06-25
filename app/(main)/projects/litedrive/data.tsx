import { Cloud, ShieldCheck, Upload, Workflow } from "lucide-react";
import { Project } from "@/types";
import { HighLight } from "@/components/high-light";

export const DATA: Project = {
  title: "Litedrive",
  subtitle: "파일 공유 서비스",
  banner: "/images/projects/litedrive/banner.png",
  metadata: [
    {
      name: "요약",
      content: `Litedrive는 계정 없이 최소 인증만으로 파일을 업로드하고 공유할 수 있는 서비스입니다.
      단순한 URL 구조로 누구나 쉽게 접근할 수 있으며, 대용량 업로드 실패와 자원 소모 공격까지 고려해 안정적으로 동작하도록 설계했습니다.`,
    },
    { name: "기간", content: "2025.06 ~ 2026.02" },
    { name: "인원", content: "1명" },
    { name: "역할", content: "풀스택 개발" },
  ],

  stacks: [
    {
      name: "Next.js",
      iconUrl: "/icons/next.svg",
    },
    {
      name: "TanStack Query",
      iconUrl: "/icons/tanstack-query.png",
    },
    {
      name: "Cloudflare Worker",
      iconUrl: "/icons/cloudflare.svg",
    },
    {
      name: "Cloudflare R2",
      iconUrl: "/icons/cloudflare.svg",
    },
  ],

  features: [
    {
      icon: <Upload size={48} className="stroke-custom-2" />,
      name: "간편한 파일 업로드와 공유",
      description:
        "복잡한 계정 시스템 대신 최소한의 인증만으로 파일 업로드와 접근이 가능하도록 설계해 빠른 공유 경험을 제공했습니다.",
    },
    {
      icon: <ShieldCheck size={48} className="stroke-custom-2" />,
      name: "대용량 요청 방어 구조",
      description:
        "업로드 용량 제한을 애플리케이션 계층이 아닌 Edge 단계에서 검증하여, 과도한 요청이 스토리지까지 도달하기 전에 차단하도록 구성했습니다.",
    },
    {
      icon: <Cloud size={48} className="stroke-custom-2" />,
      name: "Edge 기반 업로드 처리",
      description:
        "Cloudflare Worker를 활용해 업로드 요청을 스트리밍 방식으로 처리하고, 용량 검증과 인증 검증을 빠르게 수행하도록 설계했습니다.",
    },
    {
      icon: <Workflow size={48} className="stroke-custom-2" />,
      name: "상태 기반 업로드 트랜잭션",
      description:
        "Pending, Success, Fail 상태를 중심으로 업로드 흐름을 설계하여 실패 상황에서도 데이터 정합성을 유지할 수 있도록 했습니다.",
    },
  ],

  content: [
    <>
      <header>
        <h2>고민한 부분</h2>
        <h4>파일 업로드 취약점 개선 및 아키텍처 재설계</h4>
      </header>

      <div>
        <h5>1. R2 직접 업로드 구조의 한계</h5>
        <p>
          기존 파일 업로드 구조는 클라이언트가 애플리케이션 서버로부터 Presigned
          URL을 발급받은 뒤, Cloudflare R2에 직접 <HighLight>PUT</HighLight>
          요청을 보내는 방식이었습니다.
        </p>

        <section className="mt-4 p-8 bg-secondary rounded">
          <p className="mt-0! font-medium">
            Client ← Server (PresignedURL 발급)
          </p>
          <p className="font-medium">Client → R2 (파일 직접 업로드)</p>
        </section>
        <p>
          이 구조의 가장 큰 장점은 애플리케이션 서버가 파일 바디를 직접 처리하지
          않아도 된다는 점이었습니다. 서버가 대용량 파일 스트림을 중계하지 않기
          때문에 네트워크, 커넥션, 메모리 자원 사용을 줄일 수 있었습니다.
        </p>
        <p>
          하지만 클라이언트가 R2에 직접 업로드하는 구조에서는 서비스 정책에 맞는
          세밀한 검증을 적용하기 어려웠습니다. 특히 다음과 같은 애플리케이션
          레벨의 정책을 R2 단독으로 강제하기에는 한계가 있었습니다.
        </p>

        <ul>
          <li>업로드 요청 사용자의 권한 검증</li>
          <li>업로드 대상 리소스의 유효성 검증</li>
          <li>파일 크기 제한</li>
          <li>업로드 토큰 재사용 방지</li>
          <li>만료된 업로드 요청 차단</li>
        </ul>
        <p>
          가장 큰 문제는 서비스 정책상 최대 업로드 크기인
          <strong>10MB 제한을 업로드 단계에서 강제하기 어렵다</strong>는
          점이었습니다. R2는 객체 저장소이기 때문에 파일 저장에는 적합하지만,
          애플리케이션의 인증·인가 정책이나 업로드 제한 정책을 직접 수행하는
          계층으로 사용하기에는 적절하지 않았습니다.
        </p>
      </div>

      <div>
        <h5>2. Cloudflare Worker 기반 업로드 게이트웨이 도입</h5>
        <p>
          이 문제를 해결하기 위해 클라이언트가 R2에 직접 업로드하던 구조를
          변경하고, R2 앞단에 <strong>Cloudflare Worker</strong> 기반 업로드
          게이트웨이를 추가했습니다.
        </p>

        <p>
          개선된 구조에서는 클라이언트가 먼저 애플리케이션 서버로부터 업로드
          전용 단기 토큰을 발급받습니다. 이후 클라이언트는 R2가 아니라
          Cloudflare Worker로 파일 업로드 요청을 전송합니다.
        </p>

        <p>
          로드 요청을 전송합니다. Worker는 요청에 포함된 업로드 토큰을 검증하고,
          토큰이 유효한 경우에만 업로드 스트림을 R2에 저장합니다.
        </p>

        <section className="mt-4 p-8 rounded bg-secondary font-medium">
          <p className="mt-0!">Client ← Server(업로드 전용 단기 토큰 발급)</p>
          <p>Client → Cloudflare Worker(파일 업로드 요청)</p>
          <p>Cloudflare Worker → Cloudflare R2(검증된 파일만 저장)</p>
        </section>

        <p>
          이 구조를 통해 R2 앞단에 애플리케이션 정책을 적용할 수 있는 Edge
          계층을 두었습니다. R2는 최종 파일 저장소 역할에 집중하고, Worker는
          업로드 요청의 인증, 검증, 제한을 담당하도록 책임을 분리했습니다.
        </p>
      </div>

      <div>
        <h5>3. Worker 환경에서의 인증 문제와 단기 토큰 설계</h5>

        <p>
          Cloudflare Worker는 애플리케이션 서버와 분리된 Edge 환경에서
          실행됩니다. 따라서 기존 서버 세션을 그대로 공유하기 어렵고,
          클라이언트가 Worker로 직접 업로드 요청을 보낼 경우 Worker는 해당
          요청이 어떤 사용자로부터 발생한 것인지 자체적으로 판단하기 어렵습니다.
        </p>

        <p>
          이를 해결하기 위해 업로드 전용 단기 <strong>토큰</strong>을
          도입했습니다.
        </p>

        <p>
          애플리케이션 서버는 사용자가 업로드를 요청하면 먼저 기존 서버 세션을
          기반으로 사용자를 인증합니다. 인증이 완료되면 서버는 해당 업로드
          요청에 필요한 정보를 포함한 단기 토큰을 발급합니다.
        </p>

        <p>토큰에는 다음과 같은 정보를 포함했습니다.</p>

        <ul>
          <li>사용자 ID</li>
          <li>업로드 요청 ID</li>
          <li>토큰 만료 시간</li>
        </ul>

        <p>
          클라이언트는 이 토큰을 Worker에 전달하고, Worker는 토큰의 서명, 만료
          시간, 업로드 대상을 검증한 뒤 업로드를 허용합니다
        </p>
        <p>
          이를 통해 Worker가 서버 세션을 직접 참조하지 않더라도, 애플리케이션
          서버가 사전에 승인한 업로드 요청만 처리할 수 있도록 설계했습니다.
        </p>
      </div>

      <div>
        <h5>4. 스트리밍 기반 업로드 크기 검증</h5>

        <p>
          Worker에서는 업로드 데이터를 메모리에 한 번에 적재하지 않고, 스트리밍
          방식으로 처리하도록 구현했습니다.
        </p>

        <p>
          업로드 요청을 수신하는 동안 각 청크의 크기를 누적 계산하고, 누적
          크기가 서비스 정책상 허용된 최대 크기인 <strong>10MB</strong>를
          초과하면 즉시 스트림을 중단합니다.
        </p>

        <section className="mt-4 p-8 rounded bg-secondary font-medium">
          <p className="mt-0! text-sm! text-center">업로드 스트림 수신</p>
          <p className="text-xs! text-center">↓</p>
          <p className="text-sm! text-center">청크 단위 크기 계산</p>
          <p className="text-xs! text-center">↓</p>
          <p className="text-sm! text-center">누적 크기 확인</p>
          <p className="text-xs! text-center">↓</p>
          <p className="text-sm! text-center">10MB 초과시 업로드 중단</p>
          <p className="text-xs! text-center">↓</p>
          <p className="text-sm! text-center">유효한 경우에만 R2 저장</p>
        </section>

        <p>
          이 방식은 파일 전체를 메모리에 올리지 않기 때문에 Edge 환경에서도
          효율적으로 동작합니다. 또한 초과 용량 파일은 R2에 저장되기 전에
          차단되므로, 불필요한 저장소 사용과 정책 위반 업로드를 방지할 수
          있습니다.
        </p>
      </div>

      <div>
        <h5>5. 개선 효과</h5>

        <p>
          이번 개선을 통해 기존 R2 직접 업로드 구조에서 부족했던 인증, 검증,
          제한 체계를 Cloudflare Worker 계층에서 보완했습니다.
        </p>

        <p>
          기존에는 클라이언트가 Presigned URL을 통해 R2에 직접 접근했기 때문에
          업로드 요청에 대한 애플리케이션 레벨 검증을 세밀하게 수행하기
          어려웠습니다. 개선 이후에는 Worker가 업로드 게이트웨이 역할을
          담당하면서, R2에 파일이 저장되기 전 단계에서 정책 검증을 수행할 수
          있게 되었습니다.
        </p>

        <p>
          또한 애플리케이션 서버는 파일 업로드 스트림을 직접 처리하지 않고,
          사용자 인증 후 업로드 전용 단기 토큰만 발급하도록 구성했습니다. 이를
          통해 서버의 자원 사용을 최소화하면서도 업로드 요청에 대한 통제권을
          확보할 수 있었습니다.
        </p>

        <p>결과적으로 다음과 같은 효과를 얻었습니다.</p>

        <ul className="ml-0! p-8 bg-secondary rounded">
          <li>업로드 요청에 대한 별도 검증 계층 확보</li>
          <li>R2 저장 전 인증·인가·크기 제한 수행</li>
          <li>Edge 환경에서도 서버가 승인한 업로드 요청만 허용</li>
          <li>10MB 초과 업로드를 저장 전에 차단</li>
          <li>애플리케이션 서버의 파일 스트림 처리 부담 최소화</li>
          <li>저장소 계층과 검증 계층의 책임 분리</li>
        </ul>
      </div>
    </>,
  ],

  links: [
    {
      isInside: false,
      name: "https://github.com/mrbonk97/litedrive",
      url: "https://github.com/mrbonk97/litedrive",
    },
    {
      isInside: false,
      name: "https://www.litedrive.app",
      url: "https://www.litedrive.app",
    },
  ],
};
