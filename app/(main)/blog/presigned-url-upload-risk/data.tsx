import { CodeBlock } from "@/components/util-component/code-block";
import { HighLight } from "@/components/util-component/high-light";
import { Article } from "@/types";

export const ARTICLE: Article = {
  id: "presigned-url-upload-risk",
  date: "2026.07.09",
  title: "버킷에 올라가는 파일 검증하기",
  banner: "/images/blog/presigned-url-upload-risk/banner.png",
  summary: "Cloudflare R2 파일 업로드 검증 구조",
  tags: ["Security", "Cloudflare", "R2", "Worker"],
  content: [
    <section
      key="content-1"
      className={`
    mt-16
    space-y-32
    text-balance
    break-keep
    leading-relaxed

    [&_h2]:text-2xl
    [&_h2]:md:text-4xl
    [&_h2]:font-semibold
    [&_h2]:text-balance

    [&_h4]:text-2xl
    [&_h4]:md:text-4xl
    [&_h4]:font-semibold
    [&_h4]:text-balance

    [&_h6]:text-lg
    [&_h6]:font-semibold
    [&_h6]:text-muted-foreground

    [&_div]:space-y-4
    [&_div]:md:space-y-8

    [&_ul]:p-4
    [&_ul]:text-custom-1
    [&_ul]:bg-custom-3
    [&_ul]:rounded
    [&_ul]:space-y-4
    [&_ul]:list-disc
    [&_ul]:pl-8

    [&_li]:text-balance
    [&_li]:break-keep
  `}
    >
      <div>
        <h4>Presigned URL의 한계</h4>
        <h6>서버가 업로드된 파일을 확인하지 못합니다.</h6>
        <p>
          Presigned URL은 클라이언트가 R2에 직접 업로드하므로 구조가 단순하고
          서버 트래픽이 적습니다. <strong>하지만</strong> API 서버는 실제 업로드
          크기를 확인할 수 없고, 잘못된 요청도 R2가 먼저 처리합니다.
        </p>
        <CodeBlock
          code={`클라이언트
  ↓ 업로드 URL 요청
API 서버
  ↓ presigned PUT URL 발급
클라이언트
  ↓ 파일 직접 업로드
R2`}
        />
      </div>

      <div>
        <h4>파훼법: Worker 기반 업로드로 변경</h4>

        <p>
          Worker가 요청을 먼저 받아 토큰, Content-Type, Content-Length를
          확인하고, 스트림의 누적 크기가 제한을 넘으면 업로드를 중단하도록
          구조를 개선하였습니다.
        </p>
        <CodeBlock
          code={`클라이언트
  ↓ 파일 업로드
Cloudflare Worker

1. 업로드 토큰 확인
2. Content-Type 허용 목록 확인
3. Content-Length 확인
4. stream의 실제 크기 확인
5. 통과한 stream만 R2에 저장

Cloudflare Worker
  ↓
R2`}
        />
      </div>

      <div>
        <h4>R2에 스트림 저장</h4>
        <h6>헤더와 실제 크기를 모두 제한한다</h6>
        <p>
          Content-Length로 요청을 빠르게 거절하고, 값이 없거나 실제 본문과 다른
          경우를 대비해 스트림을 읽는 동안 크기를 다시 계산합니다.
        </p>
        <CodeBlock
          code={`interface Env {
  MY_BUCKET: R2Bucket;
}

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const ALLOWED_CONTENT_TYPES = new Set([
  "image/png",
  "image/jpeg",
]);

export default {
  async fetch(request: Request, env: Env) {
    if (request.method !== "PUT" || !request.body) {
      return new Response("invalid request", { status: 400 });
    }

    const contentType = request.headers.get("content-type");
    const contentLength = request.headers.get("content-length");

    if (!contentType || !ALLOWED_CONTENT_TYPES.has(contentType)) {
      return new Response("unsupported file type", { status: 415 });
    }

    if (contentLength && Number(contentLength) > MAX_FILE_SIZE) {
      return new Response("file too large", { status: 413 });
    }

    const stream = createSizeLimitedStream(
      request.body,
      MAX_FILE_SIZE,
    );

    const key = \`pending/\${crypto.randomUUID()}\`;

    await env.MY_BUCKET.put(key, stream, {
      httpMetadata: { contentType },
      customMetadata: { status: "pending" },
    });

    return Response.json({ key });
  },
};`}
        />
      </div>

      <div>
        <h4>스트리밍 크기 제한</h4>
        <h6>파일 전체를 메모리에 올리지 않는다</h6>
        <p>
          TransformStream에서 각 chunk의 크기를 누적하면 메모리 사용량을 크게
          늘리지 않고 제한을 초과한 요청을 중단할 수 있습니다.
        </p>
        <CodeBlock
          code={`function createSizeLimitedStream(
  body: ReadableStream<Uint8Array>,
  maxSize: number,
) {
  let totalSize = 0;

  return body.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        totalSize += chunk.byteLength;

        if (totalSize > maxSize) {
          throw new Error("file too large");
        }

        controller.enqueue(chunk);
      },
    }),
  );
}`}
        />
      </div>

      <div>
        <h4>적용 구조</h4>
        <h6>완료 전에는 pending 상태로 관리한다</h6>
        <p>
          파일은 pending 경로에 저장한 뒤 처리 결과에 따라 success 또는 failed로
          변경합니다. 오래 남은 pending 객체는 정리 작업에서 삭제합니다.
        </p>
        <CodeBlock
          code={`업로드 토큰 발급
  ↓
Worker로 파일 전송
  ↓
헤더와 업로드 정책 확인
  ↓
stream 크기 확인
  ↓
R2 pending 경로에 저장
  ↓
메타데이터 기록
  ↓
success 또는 failed로 변경`}
        />
        <ul>
          <li>업로드 토큰의 만료 시간을 짧게 설정합니다.</li>
          <li>사용자와 IP 단위로 요청 횟수와 용량을 제한합니다.</li>
          <li>허용하는 Content-Type을 제한합니다.</li>
          <li>완료되지 않은 pending 객체를 주기적으로 삭제합니다.</li>
        </ul>
      </div>

      <div>
        <h4>토큰 재사용 방지</h4>
        <h6>pending 상태에서만 결과를 갱신한다</h6>
        <p>
          상태 변경 조건에 pending을 포함해 success 또는 failed로 종료된 토큰은
          다시 갱신할 수 없도록 했습니다. 같은 토큰으로 요청이 반복되더라도 최초
          처리만 성공하고 이후 요청은 거절됩니다.
        </p>
        <CodeBlock
          code={`UPDATE upload_tokens
SET status = :nextStatus
WHERE token = :token
  AND status = 'pending';

if (updatedRows === 0) {
  return new Response("expired or already used token", {
    status: 409,
  });
}`}
        />
        <p>
          조회 후 갱신을 따로 수행하면 동시에 들어온 요청이 같은 pending 상태를
          볼 수 있으므로, 상태 조건을 포함한 단일 UPDATE로 원자적으로
          처리합니다.
        </p>
      </div>

      <div>
        <h4>선택 기준</h4>
        <h6>검증 시점에 따라 방식을 선택한다</h6>
        <p>
          단순한 업로드에는 presigned URL이 적합합니다. 저장 전에 요청 정책과
          실제 크기를 확인해야 한다면 Worker 방식이 유리하지만, 실행 비용과 운영
          항목은 늘어납니다.
        </p>
        <CodeBlock
          code={`Presigned URL
- 구조가 단순함
- 서버의 파일 전달이 없음
- 업로드 중 실제 크기 확인이 어려움

Worker 기반 업로드
- 저장 전에 업로드 정책 적용 가능
- stream의 실제 크기 확인 가능
- 구현과 운영 비용이 증가함`}
        />
      </div>
    </section>,
  ],
};
