import { ArrowDown } from "lucide-react";

const steps = [
  {
    title: "OSV 데이터 fetch",
    description: "Node.js에서 15분마다 최대 1,000건 수집",
  },
  { title: "정제와 정규화" },
  { title: "DB 저장" },
  {
    title: "관련 최신 SBOM 선별",
    description: "변경된 취약점의 영향 패키지를 기준으로 선별",
  },
  { title: "워커의 작업 큐에 등록" },
];

export function DiagnosisWorkflowDiagram() {
  return (
    <figure className="mt-8">
      <figcaption>
        <p className="font-medium text-custom-100">
          취약점 수집부터 프로젝트 재진단까지
        </p>
        <p className="mt-2 text-muted-foreground">
          Node.js가 수집부터 작업 등록까지 처리하고, Spring Boot 워커가 재진단합니다.
        </p>
      </figcaption>

      <div className="mt-4 p-4 lg:p-8 rounded border">
        <div className="mx-auto max-w-lg text-center">
          <ol>
            {steps.map((step) => (
              <li key={step.title}>
                <div className="px-4 py-2 rounded border bg-secondary">
                  <p className="font-medium">{step.title}</p>
                  {step.description && (
                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                  )}
                </div>
                <ArrowDown className="mx-auto my-2 size-4" aria-hidden="true" />
              </li>
            ))}
          </ol>

          <div className="px-4 py-2 rounded border bg-custom-300">
            <p className="font-medium">5초마다 작업 확인</p>
            <p className="mt-2 text-custom-200">
              Java Spring Boot Worker
            </p>
            <p className="mt-2 text-muted-foreground">
              작업이 없으면 대기 후 다시 확인
            </p>
          </div>

          <div className="relative my-2 h-8 flex items-center justify-center">
            <ArrowDown className="size-4" aria-hidden="true" />
            <span className="absolute left-1/2 ml-4 text-muted-foreground">
              작업 있음
            </span>
          </div>

          <div className="px-4 py-2 rounded border bg-custom-300">
            <p className="font-medium">해당 프로젝트 재진단</p>
            <p className="mt-2 text-muted-foreground">
              설치 버전과 취약 범위를 비교
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}
