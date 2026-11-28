import {
  ArrowDown,
  ArrowDownUp,
  ArrowRight,
  Database,
  HardDrive,
  Monitor,
  Server,
  ShieldCheck,
} from "lucide-react";
import { StatusLabel } from "./status-label";

export function UploadGatewayDiagram() {
  return (
    <figure className="mt-8">
      <div className="p-4 rounded border">
        <div className="p-4 rounded border border-dashed">
          <p className="mb-4 font-medium">① 업로드 승인</p>
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4 text-center">
            <div className="p-4 rounded border bg-secondary">
              <Monitor
                className="mx-auto mb-2 size-8 text-custom-200"
                aria-hidden="true"
              />
              <p className="font-medium">클라이언트</p>
            </div>
            <div>
              <ArrowRight className="mx-auto size-4" aria-hidden="true" />
              <ArrowRight
                className="mx-auto mt-2 size-4 rotate-180"
                aria-hidden="true"
              />
            </div>
            <div className="p-4 rounded border bg-secondary">
              <Server
                className="mx-auto mb-2 size-8 text-custom-200"
                aria-hidden="true"
              />
              <p className="font-medium">앱 서버 (Railway)</p>
            </div>
          </div>
          <p className="mt-4 text-center text-muted-foreground">
            세션과 리소스 권한 확인 → <StatusLabel status="PENDING" /> 생성 →
            단기 토큰 반환
          </p>
        </div>
        <div className="my-4 text-center">
          <p className="text-muted-foreground">
            ② 클라이언트가 파일 + 토큰 전송
          </p>
          <ArrowDown className="mx-auto mt-2 size-4" aria-hidden="true" />
        </div>
        <div className="p-4 rounded border bg-custom-100 text-center text-custom-400">
          <ShieldCheck className="mx-auto mb-2 size-8" aria-hidden="true" />
          <p className="text-lg font-medium">Cloudflare Worker</p>
          <p className="mt-2">토큰 검증, 상태 선점, 수신 크기 검사</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="my-4">
              <ArrowDown className="mx-auto mb-2 size-4" aria-hidden="true" />
              <p>③ 파일 스트림</p>
            </div>
            <div className="p-4 rounded border">
              <HardDrive
                className="mx-auto mb-2 size-8 text-custom-200"
                aria-hidden="true"
              />
              <p className="font-medium">Cloudflare R2</p>
              <p className="mt-2 text-muted-foreground">객체 저장</p>
            </div>
          </div>
          <div className="text-center">
            <div className="my-4">
              <ArrowDownUp className="mx-auto mb-2 size-4" aria-hidden="true" />
              <p>상태 선점과 ④ 결과 기록</p>
            </div>
            <div className="p-4 rounded border">
              <Database
                className="mx-auto mb-2 size-8 text-custom-200"
                aria-hidden="true"
              />
              <p className="font-medium">서비스 DB</p>
              <p className="mt-2 text-muted-foreground">업로드 요청과 결과</p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center font-medium text-muted-foreground">
        [업로드 아키텍처의 승인 경로와 파일 전송 경로]
      </figcaption>
    </figure>
  );
}

export function UploadStateDiagram() {
  return (
    <figure className="mt-8">
      <div className="p-4 rounded border text-center">
        <div className="p-4 rounded border bg-secondary">
          <p>
            <StatusLabel status="PENDING" />
          </p>
          <p className="mt-2 text-muted-foreground">서버가 승인한 요청</p>
        </div>
        <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
        <div className="p-4 rounded border border-dashed">
          <p className="font-medium">조건부 UPDATE로 원자적 선점</p>
          <p className="mt-2 text-muted-foreground">
            사용자와 리소스 일치 / 만료 전 / 현재{" "}
            <StatusLabel status="PENDING" />
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
            <p className="mb-4 text-custom-200">
              갱신 성공
            </p>
            <div className="p-4 rounded border bg-custom-300">
              <p>
                <StatusLabel status="UPLOADING" />
              </p>
              <p className="mt-2">파일 전송 진행</p>
            </div>
          </div>
          <div>
            <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
            <p className="mb-4">갱신된 행 없음</p>
            <div className="p-4 rounded border bg-secondary">
              <p className="font-medium text-destructive">추가 요청 거부</p>
              <p className="mt-2">중복과 재사용 차단</p>
            </div>
          </div>
        </div>
        <div className="mt-8 p-4 rounded border">
          <p className="font-medium">
            <StatusLabel status="UPLOADING" /> 이후 저장 결과
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
              <div className="p-4 rounded border bg-custom-300">
                <p>
                  <StatusLabel status="SUCCESS" />
                </p>
                <p className="mt-2">R2 저장 완료</p>
              </div>
            </div>
            <div>
              <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
              <div className="p-4 rounded border bg-secondary">
                <p>
                  <StatusLabel status="FAILED" />
                </p>
                <p className="mt-2">저장 실패 또는 용량 초과</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center font-medium text-muted-foreground">
        [업로드 요청의 상태 전이]
      </figcaption>
    </figure>
  );
}

export function UploadStreamDiagram() {
  return (
    <figure className="mt-8">
      <div className="p-4 rounded border">
        <p className="font-medium">Worker가 수신한 청크</p>
        <ol className="mt-4 grid grid-cols-3 sm:grid-cols-6 gap-2 text-center">
          {[2, 4, 6, 8, 10, 12].map((size) => (
            <li
              key={size}
              className={
                size > 10
                  ? "p-2 rounded border bg-secondary text-destructive"
                  : "p-2 rounded border bg-custom-300 text-custom-200"
              }
            >
              <p>
                {size - 2}–{size}
              </p>
              <p>MiB</p>
            </li>
          ))}
        </ol>
        <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
        <div className="p-4 rounded border text-center">
          <p className="font-medium">누적 수신 크기 + 이번 청크 크기</p>
          <p className="mt-2 text-muted-foreground">
            Content-Length 사전 확인 후, 실제 바이트 수도 검증
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
            <div className="p-4 rounded border bg-custom-300">
              <p className="font-medium text-custom-100">
                10 MiB 이하
              </p>
              <p className="mt-2">해당 청크를 R2 스트림으로 전달</p>
              <p className="mt-4 font-mono">0–10 MiB → 전달</p>
            </div>
          </div>
          <div>
            <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
            <div className="p-4 rounded border bg-secondary">
              <p className="font-medium text-destructive">10 MiB 초과</p>
              <p className="mt-2">초과 청크를 전달하지 않고 중단</p>
              <p className="mt-4 font-mono">10–12 MiB → 차단</p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center font-medium text-muted-foreground">
        [청크 단위로 검증해 제한을 넘는 순간 전달 중단]
      </figcaption>
    </figure>
  );
}
