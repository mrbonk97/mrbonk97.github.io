import { ArrowDown, FileText } from "lucide-react";

const snapshots = [
  { name: "A 최신", target: true, reason: "패키지 X 포함" },
  { name: "A 이전", target: false, reason: "이전 버전 제외" },
  { name: "B 최신", target: false, reason: "관련 패키지 없음" },
  { name: "C 최신", target: true, reason: "패키지 X 포함" },
];

export function DiagnosisScopeDiagram() {
  return (
    <figure className="mt-8">
      <figcaption className="text-custom-100 dark:text-custom-300">
        <p className="font-medium">
          전체 탐색에서 관련 최신 SBOM으로 좁힌 재진단 범위
        </p>
        <p className="mt-2 text-muted-foreground">
          패키지 X의 취약점 정보가 변경된 경우를 나타낸 예시
        </p>
      </figcaption>
      <div className="border rounded mt-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {[false, true].map((selective) => (
          <div key={String(selective)} className="p-4 border-r">
            <div className="mb-4 flex items-center justify-between gap-4">
              <p className="font-medium">
                {selective ? "개선 후: 관련 최신 SBOM" : "기존: 전체 SBOM"}
              </p>
              <p
                className={
                  selective
                    ? "text-2xl font-semibold text-custom-200 dark:text-custom-300"
                    : "text-2xl font-semibold text-muted-foreground"
                }
              >
                {selective ? 2 : 4}개
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-2">
              {snapshots.map((snapshot) => {
                const target = !selective || snapshot.target;
                return (
                  <li
                    key={snapshot.name}
                    className={
                      target
                        ? selective
                          ? "p-4 rounded border bg-custom-200/10 text-custom-200 dark:text-custom-300"
                          : "p-4 rounded border bg-custom-400 dark:bg-custom-100/30"
                        : "p-4 rounded border border-dashed text-muted-foreground"
                    }
                  >
                    <FileText className="mb-2 size-8" aria-hidden="true" />
                    <p className="font-medium">{snapshot.name}</p>
                    <p className="mt-2">
                      {target ? "재진단" : snapshot.reason}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4 text-muted-foreground">
        변경 패키지 식별 → 관련 SBOM 조회 → 프로젝트별 최신 버전 선별 → 취약점
        재진단
      </p>
    </figure>
  );
}

export function VersionNormalizationDiagram() {
  return (
    <figure className="mt-8">
      <figcaption className="font-medium text-custom-100 dark:text-custom-300">
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
              <div className="p-4 rounded border bg-custom-200/10">
                <dt className="text-muted-foreground">기본 버전</dt>
                <dd className="mt-2 font-mono text-custom-200 dark:text-custom-300">
                  {version.base}
                </dd>
              </div>
              <div className="p-4 rounded border bg-custom-300/60 dark:bg-custom-300/10">
                <dt className="text-muted-foreground">접미사</dt>
                <dd className="mt-2 font-mono text-custom-200 dark:text-custom-300">
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
