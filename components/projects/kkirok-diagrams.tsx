import {
  ArrowDown,
  ArrowDownUp,
  Database,
  RefreshCw,
  Server,
  Smartphone,
} from "lucide-react";
import { StatusLabel } from "./status-label";

export function OfflineSyncDiagram() {
  return (
    <figure className="mt-8">
      <div className="p-4 rounded border text-center">
        <div className="p-4 rounded border">
          <Smartphone
            className="mx-auto mb-2 size-8 text-custom-200"
            aria-hidden="true"
          />
          <p className="font-medium">Jetpack Compose 화면</p>
          <p className="mt-2 text-muted-foreground">
            기록 조회, 생성, 수정, 삭제
          </p>
        </div>
        <div className="my-4 flex items-center justify-center gap-4">
          <ArrowDownUp className="size-4 shrink-0" aria-hidden="true" />
          <p>로컬 쓰기 ↓ / Room Flow 구독 ↑</p>
        </div>
        <div className="p-4 rounded border bg-custom-100 text-custom-400">
          <Database className="mx-auto mb-2 size-8" aria-hidden="true" />
          <p className="font-medium">화면 데이터의 기준인 RoomDB</p>
          <p className="mt-2">기록 + 동기화 상태를 함께 저장</p>
        </div>
        <div className="my-4 flex items-center justify-center gap-4">
          <ArrowDownUp className="size-4 shrink-0" aria-hidden="true" />
          <p>미완료 작업 조회 ↓ / 결과 반영 ↑</p>
        </div>
        <div className="p-4 rounded border border-dashed">
          <p className="mb-4 text-muted-foreground">백그라운드 동기화</p>
          <div className="p-4 rounded border bg-secondary">
            <RefreshCw
              className="mx-auto mb-2 size-8 text-custom-200"
              aria-hidden="true"
            />
            <p className="font-medium">
              Worker에서 최신 로컬 변경 Push 후 Pull
            </p>
          </div>
          <div className="my-4 flex items-center justify-center gap-4">
            <ArrowDownUp className="size-4 shrink-0" aria-hidden="true" />
            <p>API 요청과 응답</p>
          </div>
          <div className="p-4 rounded border">
            <Server
              className="mx-auto mb-2 size-8 text-custom-200"
              aria-hidden="true"
            />
            <p className="font-medium">서버의 API와 서비스 DB</p>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center font-medium text-muted-foreground">
        [RoomDB 중심의 오프라인 동기화 구조]
      </figcaption>
    </figure>
  );
}

export function AccountDeletionDiagram() {
  return (
    <figure className="mt-8">
      <div className="p-4 rounded border text-center">
        <div className="p-4 rounded border">
          <p className="font-medium">탈퇴 요청을 하나의 트랜잭션으로 처리</p>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <p className="p-4 rounded border bg-secondary">
              회원 상태
              <br />
              <StatusLabel status="IDLE" /> → <StatusLabel status="DELETING" />
            </p>
            <p className="p-4 rounded border bg-secondary">
              Outbox
              <br />
              삭제 작업 기록
            </p>
          </div>
        </div>
        <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
        <p className="font-medium">커밋 후 사용자에게 즉시 응답</p>
        <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
        <div className="p-4 rounded border border-dashed">
          <p className="mb-4 font-medium">Worker에서 외부 시스템 데이터 삭제</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded border bg-secondary">
              <p className="text-muted-foreground">Job 1</p>
              <p className="mt-2 font-medium">Firebase 인증 계정</p>
            </div>
            <div className="p-4 rounded border bg-secondary">
              <p className="text-muted-foreground">Job 2</p>
              <p className="mt-2 font-medium">R2 이미지</p>
            </div>
          </div>
          <div className="mt-4 p-4 flex items-start gap-4 rounded border bg-secondary text-left text-custom-200">
            <RefreshCw className="mt-2 size-4 shrink-0" aria-hidden="true" />
            <p>실패한 Job 보존 → 지수 백오프 → 해당 작업 재시도</p>
          </div>
        </div>
        <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
        <p>두 외부 삭제 Job이 모두 완료되어 제거된 경우에만</p>
        <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
        <div className="p-4 rounded border bg-secondary text-destructive">
          <p>Job 3</p>
          <p className="mt-2 font-medium">서비스 DB 회원 데이터 최종 삭제</p>
        </div>
      </div>
      <figcaption className="mt-2 text-center font-medium text-muted-foreground">
        [Outbox로 탈퇴 요청과 삭제 작업 분리]
      </figcaption>
    </figure>
  );
}

export function SyncConflictDiagram() {
  return (
    <figure className="mt-8">
      <div className="p-4 rounded border">
        <ol className="space-y-4">
          {[
            ["1", "Push 요청", "Worker가 updatedAt = t1인 기록을 전송"],
            [
              "2",
              "응답 대기 중 로컬 수정",
              "사용자가 같은 기록을 수정하면 RoomDB는 t2로 변경",
            ],
            [
              "3",
              "이전 요청의 성공 응답",
              "응답은 t1 기준이고, 현재 로컬 기록은 t2",
            ],
          ].map(([number, title, description]) => (
            <li key={number} className="p-4 flex gap-4 rounded border">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-custom-300 font-medium text-custom-100">
                {number}
              </span>
              <div className="flex-1">
                <p className="font-medium">{title}</p>
                <p className="mt-2 text-muted-foreground">{description}</p>
              </div>
            </li>
          ))}
        </ol>
        <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
        <div className="p-4 rounded border bg-secondary text-center text-custom-100">
          <p className="font-medium">Room 트랜잭션에서 원자적 비교</p>
          <p className="mt-2 font-mono">요청 updatedAt = 현재 updatedAt ?</p>
        </div>
        <div className="mt-4 sm:mt-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <ArrowDown
              className="mx-auto my-4 size-4 hidden sm:block"
              aria-hidden="true"
            />
            <div className="p-4 rounded border bg-custom-300">
              <p className="font-medium">같음: 추가 수정 없음</p>
              <p className="mt-2">
                <StatusLabel status="SYNCED" />
              </p>
              <p className="mt-2">동기화 완료로 전환</p>
            </div>
          </div>
          <div>
            <ArrowDown
              className="mx-auto my-4 size-4 hidden sm:block"
              aria-hidden="true"
            />
            <div className="p-4 rounded border bg-custom-300">
              <p className="font-medium">다름: 위 사례 t1 ≠ t2</p>
              <p className="mt-2">
                <StatusLabel status="PENDING_UPSERT" />
              </p>
              <p className="mt-2">최신 변경을 다음 동기화에 포함</p>
            </div>
          </div>
        </div>
      </div>
      <figcaption className="mt-2 text-center font-medium text-muted-foreground">
        [동기화 중 수정이 발생했을 때 updatedAt 비교 흐름]
      </figcaption>
    </figure>
  );
}
