import { Cloud, ShieldCheck, Upload, Workflow } from "lucide-react";
import { Project } from "@/types";
import { HighLight } from "@/components/util-component/high-light";
import { CodeBlock } from "@/components/util-component/code-block";

export const DATA: Project = {
  id: "litedrive",
  title: "Litedrive",
  summary:
    "최소 인증으로 파일을 업로드·공유하고, Edge 단계에서 업로드 검증과 용량 제한을 처리하는 파일 공유 서비스입니다.",
  banner: "/images/projects/litedrive/banner.svg",
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
      icon: <Upload size={32} className="stroke-custom-2" />,
      name: "간편한 파일 업로드와 공유",
      description:
        "복잡한 계정 시스템 대신 최소한의 인증만으로 파일 업로드와 접근이 가능하도록 설계해 빠른 공유 경험을 제공했습니다.",
    },
    {
      icon: <ShieldCheck size={32} className="stroke-custom-2" />,
      name: "대용량 요청 방어 구조",
      description:
        "업로드 용량 제한을 애플리케이션 계층이 아닌 Edge 단계에서 검증하여, 과도한 요청이 스토리지까지 도달하기 전에 차단하도록 구성했습니다.",
    },
    {
      icon: <Cloud size={32} className="stroke-custom-2" />,
      name: "Edge 기반 업로드 처리",
      description:
        "Cloudflare Worker를 활용해 업로드 요청을 스트리밍 방식으로 처리하고, 용량 검증과 인증 검증을 빠르게 수행하도록 설계했습니다.",
    },
    {
      icon: <Workflow size={32} className="stroke-custom-2" />,
      name: "상태 기반 업로드 트랜잭션",
      description:
        "Pending, Success, Fail 상태를 중심으로 업로드 흐름을 설계하여 실패 상황에서도 데이터 정합성을 유지할 수 있도록 했습니다.",
    },
  ],

  content: [
    <section
      key={`content-1`}
      className={`
        space-y-32
        text-balance
        break-keep
        leading-relaxed

        [&_header]:space-y-2

        [&_h2]:text-2xl
        [&_h2]:md:text-4xl
        [&_h2]:font-semibold
        [&_h2]:text-balance

        [&_h4]:text-lg
        [&_h4]:font-semibold
        [&_h4]:text-muted-foreground
        
        [&_h5]:text-2xl
        [&_h5]:font-semibold
        [&_div]:space-y-4
        [&_div]:md:space-y-8

        [&_ul]:p-4
        [&_ul]:text-custom-1
        [&_ul]:bg-custom-3
        [&_ul]:rounded
        [&_ul]:space-y-4
        [&_ul]:list-disc
        [&_ul]:pl-12

        [&_li]:text-balance
        [&_li]:break-keep
    `}
    >
      <header>
        <h2>보안 한 숟갈</h2>
        <h4>Cloudflare Worker 기반 파일 업로드 게이트웨이 설계</h4>

        <p className="mt-4 p-4 md:p-8 text-lg rounded bg-custom-2 text-custom-4">
          애플리케이션 서버가 파일을 직접 중계하지 않으면서도, R2 저장 전에
          인증, 파일 크기, 요청 만료와 재사용 여부를 검증하도록 구성했습니다.
        </p>
      </header>
      <div>
        <h5>1. 기존 업로드 구조의 한계</h5>

        <p>
          기존에는 애플리케이션 서버가 Presigned URL을 발급하고, 클라이언트가
          Cloudflare R2에 파일을 직접 업로드했습니다.
        </p>

        <CodeBlock
          code={`1. Client → Server
   Presigned URL 발급 요청

2. Server → Client
   특정 객체에 대한 임시 업로드 URL 반환

3. Client → R2
   애플리케이션 서버를 거치지 않고 파일 업로드`}
        />

        <p>
          애플리케이션 서버가 파일 스트림을 처리하지 않으므로 서버의 네트워크와
          메모리 부담을 줄일 수 있었습니다.
        </p>

        <p>
          하지만 URL이 발급된 이후의 업로드는 클라이언트와 R2 사이에서
          이루어집니다. 따라서 애플리케이션의 DB 상태와 연계해 요청을 한 번만
          사용하도록 제한하거나, 실제 수신한 바이트를 기준으로 파일 크기를
          검사하기 어려웠습니다.
        </p>

        <CodeBlock
          code={`Presigned URL로 제어 가능한 범위
├── 업로드할 객체 경로
├── 허용할 HTTP 메서드
├── URL 만료 시간
└── 일부 요청 헤더

추가로 필요했던 애플리케이션 정책
├── 사용자의 업로드 권한 확인
├── 대상 리소스의 유효성 확인
├── 실제 수신 파일의 10MB 제한
├── 승인 요청과 저장 객체 연결
└── 완료된 요청의 재사용 방지`}
        />

        <p>
          R2는 객체 저장을 담당하지만, 서비스의 인증·인가나 업로드 요청 상태를
          관리하지는 않습니다. 따라서 파일이 저장되기 전에 애플리케이션 정책을
          검증할 별도의 통제 지점이 필요했습니다.
        </p>
      </div>
      <div>
        <h5>2. Worker를 업로드 게이트웨이로 배치</h5>

        <p>
          클라이언트와 R2 사이에 Cloudflare Worker를 배치하고, 애플리케이션
          서버가 승인한 요청만 Worker를 통과할 수 있도록 변경했습니다.
        </p>

        <CodeBlock
          code={`┌────────┐   업로드 권한 요청   ┌─────────────┐
│ Client │ ─────────────────→ │ App Server  │
└────────┘                    └─────────────┘
     ↑                               │
     │       단기 업로드 토큰         │
     └───────────────────────────────┘
     │
     │ 토큰 + 파일
     ▼
┌───────────────┐   검증된 스트림   ┌────┐
│ Upload Worker │ ────────────────→ │ R2 │
└───────────────┘                  └────┘
     │
     └── 인증 정보·요청 상태·만료·파일 크기 검증`}
        />

        <p>
          애플리케이션 서버는 기존 세션으로 사용자를 인증하고, 사용자가 해당
          리소스에 파일을 업로드할 권한이 있는지 확인합니다.
        </p>

        <p>
          검증을 통과하면 업로드 요청을 DB에
          <HighLight>PENDING</HighLight> 상태로 생성하고, 해당 요청에서만 사용할
          수 있는 단기 토큰을 발급합니다.
        </p>

        <CodeBlock
          code={`Upload Token
├── sub: 사용자 ID
├── uploadId: 업로드 요청 ID
├── resourceId: 업로드 대상 리소스
├── objectKey: 저장할 R2 객체 경로
├── maxSize: 10MB
└── exp: 토큰 만료 시간`}
        />

        <p>
          Worker는 토큰의 서명과 만료 시간을 검증한 뒤, 토큰의
          사용자·리소스·객체 경로가 서버에서 승인한 업로드 요청과 일치하는지
          확인합니다.
        </p>

        <p>
          따라서 Worker가 애플리케이션 세션을 직접 공유하지 않아도, 서버가
          사전에 승인한 범위 안에서만 파일을 저장할 수 있습니다.
        </p>
      </div>
      <div>
        <h5>3. 원자적 상태 전이로 요청 재사용 차단</h5>

        <p>
          토큰의 만료 여부만 확인하면 같은 토큰으로 여러 요청을 동시에 전송할 수
          있습니다. 이를 막기 위해 업로드 시작 시 DB 상태를 원자적으로
          변경했습니다.
        </p>

        <CodeBlock
          code={`PENDING
   │
   │ 업로드 권한 선점
   ▼
UPLOADING
   ├── 저장 성공 ──→ SUCCESS
   └── 저장 실패 ──→ FAILED

SUCCESS 또는 UPLOADING 상태의 요청
→ 같은 uploadId를 사용한 추가 요청 거부`}
        />

        <p>
          Worker는 파일을 저장하기 전에 업로드 요청을
          <HighLight>PENDING</HighLight>에서
          <HighLight>UPLOADING</HighLight>으로 전환합니다. 이때 현재 상태가
          <HighLight>PENDING</HighLight>인 요청만 변경하도록 조건을
          적용했습니다.
        </p>

        <CodeBlock
          code={`UPDATE upload_requests
SET
  status = 'UPLOADING',
  started_at = NOW()
WHERE id = :uploadId
  AND user_id = :userId
  AND resource_id = :resourceId
  AND status = 'PENDING'
  AND expires_at > NOW();`}
        />

        <p>
          업데이트 결과가 없으면 이미 사용 중이거나 완료됐거나 만료된 요청으로
          판단해 업로드를 거부합니다. 여러 요청이 동시에 도착하더라도 하나의
          요청만
          <HighLight>UPLOADING</HighLight> 상태를 선점할 수 있습니다.
        </p>

        <p>
          R2 저장이 완료되면 <HighLight>SUCCESS</HighLight>로 전환하고, 실패한
          요청은 <HighLight>FAILED</HighLight>로 기록해 완료 여부와 실패 원인을
          추적할 수 있도록 했습니다.
        </p>
      </div>
      <div>
        <h5>4. 스트리밍 기반 파일 크기 제한</h5>

        <p>
          Worker에서 파일 전체를 <HighLight>ArrayBuffer</HighLight>로 변환하면
          파일 크기만큼 메모리를 점유하게 됩니다. 이를 피하기 위해 요청 본문을
          스트림 상태로 처리했습니다.
        </p>

        <CodeBlock
          code={`Request Body
    │
    ▼
Content-Length 사전 확인
    │
    ▼
TransformStream에서 청크 크기 누적
    │
    ├── 누적 크기 ≤ 10MB → R2로 전달
    │
    └── 누적 크기 > 10MB → 스트림 중단
                                  │
                                  ▼
                             업로드 실패 처리`}
        />

        <p>
          <HighLight>Content-Length</HighLight>가 존재하면 불필요한 스트림
          처리를 줄이기 위해 먼저 확인합니다. 다만 요청 헤더만 신뢰하지 않고,
          실제로 수신한 바이트를 누적해 다시 검증합니다.
        </p>

        <CodeBlock
          code={`const MAX_FILE_SIZE = 10 * 1024 * 1024

let receivedBytes = 0

const sizeLimiter = new TransformStream<Uint8Array, Uint8Array>({
  transform(chunk, controller) {
    receivedBytes += chunk.byteLength

    if (receivedBytes > MAX_FILE_SIZE) {
      throw new Error("FILE_SIZE_LIMIT_EXCEEDED")
    }

    controller.enqueue(chunk)
  },
})

const limitedStream = request.body?.pipeThrough(sizeLimiter)

if (!limitedStream) {
  return new Response("File body is required", {
    status: 400,
  })
}

await env.UPLOAD_BUCKET.put(objectKey, limitedStream, {
  httpMetadata: {
    contentType,
  },
})`}
        />

        <p>
          제한을 초과하면 스트림 처리를 중단하고 업로드 요청을 실패 상태로
          변경합니다. 정상 범위의 파일만 R2 바인딩의
          <HighLight>put()</HighLight>으로 전달하므로 전체 파일을 Worker
          메모리에 적재할 필요가 없습니다.
        </p>
      </div>
      <div>
        <h5>5. 최종 업로드 흐름</h5>

        <CodeBlock
          code={`1. 사용자 인증
   Client → App Server

2. 권한 및 대상 리소스 검증
   App Server → DB

3. 업로드 요청 생성
   status: PENDING

4. 단기 토큰 발급
   uploadId + objectKey + maxSize + exp

5. 토큰과 파일 전송
   Client → Upload Worker

6. 토큰 서명·만료·요청 정보 검증

7. 상태 선점
   PENDING → UPLOADING

8. 스트림 크기 검증
   실제 수신 크기 ≤ 10MB

9. R2 저장

10. 처리 결과 기록
    성공: SUCCESS
    실패: FAILED`}
        />
      </div>
      <div>
        <h5>6. 결과</h5>

        <p>
          업로드 과정의 책임을 애플리케이션 서버, Worker, R2와 DB로
          분리했습니다.
        </p>

        <CodeBlock
          code={`App Server
├── 사용자 인증
├── 리소스 접근 권한 확인
├── 업로드 요청 생성
└── 단기 토큰 발급

Upload Worker
├── 토큰 서명과 만료 검증
├── 승인된 요청 정보 확인
├── 업로드 상태 선점
├── 실제 파일 크기 검증
└── 파일 스트림 전달

Cloudflare R2
└── 검증을 통과한 객체 저장

Database
├── PENDING
├── UPLOADING
├── SUCCESS
└── FAILED 상태 관리`}
        />

        <p>
          애플리케이션 서버가 파일 스트림을 직접 처리하지 않는 장점은
          유지하면서, 파일이 R2에 저장되기 전에 업로드 정책을 검증할 수 있는
          통제 지점을 확보했습니다.
        </p>

        <p>
          또한 실제 수신 크기를 기준으로 10MB를 초과한 파일을 차단하고, 원자적인
          상태 전이를 적용해 동일한 업로드 요청이 동시에 또는 반복해서 사용되는
          것을 방지했습니다.
        </p>

        <p>
          결과적으로 인증과 권한 검증은 애플리케이션 서버가 담당하고, Worker는
          업로드 정책과 스트림을 통제하며, R2는 객체 저장에 집중하는 구조를
          구성했습니다.
        </p>
      </div>
    </section>,
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
