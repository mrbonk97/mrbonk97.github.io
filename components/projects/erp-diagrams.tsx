import { ArrowDown, ArrowRight } from "lucide-react";

export function SurveyPolicyDiagram() {
  return (
    <figure className="mt-8">
      <figcaption className="text-custom-100 dark:text-custom-300">
        <p className="font-medium">일시정지된 설문의 권한 판단 흐름</p>
        <p className="mt-2 text-muted-foreground">
          참여 대상 → 제출 여부 → 운영 상태 순으로 판단
        </p>
      </figcaption>
      <div className="mt-4 p-4 lg:p-8 rounded border">
        <ol>
          {[
            {
              question: "참여 대상인가?",
              branch: "아니요",
              result: "접근 차단",
              next: "예 (참여 대상)",
            },
            {
              question: "제출을 완료했는가?",
              branch: "예",
              result: "기존 결과 조회",
              next: "아니요 (미제출)",
            },
            {
              question: "설문이 일시정지 상태인가?",
              branch: "예",
              result: "수정과 제출 제한",
              next: null,
            },
          ].map((step, index) => (
            <li key={step.question}>
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4">
                <div className="p-4 rounded border text-center">
                  <p className="mb-2 text-custom-200 dark:text-custom-300">
                    판단 {index + 1}
                  </p>
                  <p className="font-medium">{step.question}</p>
                </div>
                <div className="text-center">
                  <p>{step.branch}</p>
                  <ArrowRight
                    className="mx-auto mt-2 size-4"
                    aria-hidden="true"
                  />
                </div>
                <p
                  className={
                    index === 1
                      ? "p-4 rounded border bg-custom-300/60 dark:bg-custom-300/10 text-center font-medium text-custom-100 dark:text-custom-300"
                      : index === 0
                        ? "p-4 rounded border bg-custom-400 dark:bg-custom-100/30 text-center font-medium text-destructive"
                        : "p-4 rounded border bg-custom-400 dark:bg-custom-100/30 text-center font-medium text-custom-200 dark:text-custom-300"
                  }
                >
                  {step.result}
                </p>
              </div>
              {step.next && (
                <div className="grid grid-cols-[1fr_auto_1fr] gap-2 sm:gap-4">
                  <div className="py-4 text-center">
                    <p className="text-muted-foreground">{step.next}</p>
                    <ArrowDown
                      className="mx-auto mt-2 size-4"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="invisible">아니요</span>
                  <span />
                </div>
              )}
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-4 text-muted-foreground">
        제출 완료자의 조회는 운영 상태보다 먼저 판단하고, 미제출자의 기존 답변은
        보존합니다.
      </p>
    </figure>
  );
}
