import { ArrowDown } from "lucide-react";

const collectionDecisions = [
  {
    title: "기존: 1시간마다 전체 변경 수집",
    description: "직전 1시간 동안 갱신된 취약점을 모두 다시 저장",
  },
  {
    title: "문제: 한 시간에 약 8만 건 유입",
    description: "11월 5일, 수집 작업이 장시간 종료되지 않음",
    failed: true,
  },
  {
    title: "시도: 동시 요청 수 확대",
    description: "1시간 내 처리를 시도했지만 OSV가 과도한 요청을 거부",
    failed: true,
  },
  {
    title: "개선: 15분마다 최대 1,000건",
    description: "저장과 후속 재진단 작업 등록을 마치면 배치 종료",
    selected: true,
  },
];

export function CollectionBatchDiagram() {
  return (
    <>
      <figure className="mt-8">
        <figcaption className="font-medium text-custom-100">
          문제 발생부터 수집 정책 변경까지
        </figcaption>
        <div className="mt-4 p-4 lg:p-8 rounded border">
          <ol className="mx-auto max-w-lg text-center">
            {collectionDecisions.map((step, index) => (
              <li key={step.title}>
                {index > 0 && (
                  <ArrowDown
                    className="mx-auto my-2 size-4"
                    aria-hidden="true"
                  />
                )}
                <div
                  className={`p-4 rounded border ${step.selected ? "bg-custom-300" : "bg-secondary"}`}
                >
                  <p className="font-medium">{step.title}</p>
                  <p
                    className={`mt-2 ${step.failed ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </figure>

      <figure className="mt-8">
        <figcaption className="font-medium text-custom-100">
          15분마다 1,000건을 선택한 근거
        </figcaption>
        <dl className="mt-4 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x rounded border">
          <div className="p-4">
            <dt className="font-medium">평소 유입량</dt>
            <dd className="mt-2 text-2xl font-semibold text-custom-200">
              약 1,000건 / 하루
            </dd>
            <dd className="mt-2 text-muted-foreground">
              실제 하루 평균 등록량을 기준으로 수집 규모 결정
            </dd>
          </div>
          <div className="p-4">
            <dt className="font-medium">수집 테스트</dt>
            <dd className="mt-2 text-2xl font-semibold text-custom-200">
              1,000건 / 15분
            </dd>
            <dd className="mt-2 text-muted-foreground">
              OSV의 요청 거부 없이 정상 처리되는 것을 확인
            </dd>
          </div>
        </dl>
      </figure>
    </>
  );
}

export function VersionNormalizationDiagram() {
  return (
    <figure className="mt-8">
      <figcaption className="font-medium text-custom-100">
        원본을 보존한 버전 분리
      </figcaption>
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x rounded border">
        {[
          {
            original: "11.19.3-SNAPSHOT_3",
            base: "11.19.3",
            suffix: "SNAPSHOT_3",
            note: "사전 릴리스 정보를 보존",
          },
          {
            original: "2.6.14-tuxcare.0",
            base: "2.6.14",
            suffix: "tuxcare.0",
            note: "배포사 식별자를 보존",
          },
        ].map((version) => (
          <div key={version.original} className="p-4">
            <p className="p-4 rounded border text-center font-mono">
              {version.original}
            </p>
            <ArrowDown className="mx-auto my-4 size-4" aria-hidden="true" />
            <dl className="space-y-4">
              <div className="p-4 rounded border bg-custom-300">
                <dt className="text-muted-foreground">기본 버전</dt>
                <dd className="mt-2 font-mono text-custom-200">
                  {version.base}
                </dd>
              </div>
              <div className="p-4 rounded border bg-custom-300">
                <dt className="text-muted-foreground">접미사</dt>
                <dd className="mt-2 font-mono text-custom-200">
                  {version.suffix}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-muted-foreground">{version.note}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-muted-foreground">
        기본 버전과 접미사를 분리한 뒤, 생태계별 비교 규칙으로 영향 범위를
        판단합니다.
      </p>
    </figure>
  );
}
