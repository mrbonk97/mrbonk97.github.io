import Image from "next/image";
import surveyPolicyFlowchart from "@/public/projects/erp/survey-policy-flowchart-v2.png";

const surveyStates = ["생성", "예약", "진행", "일시정지", "종료"] as const;
const responseStates = ["미응답", "작성 중", "제출 완료"] as const;

function getDisplayPolicy(
  surveyState: (typeof surveyStates)[number],
  responseState: (typeof responseStates)[number],
  isTarget: boolean,
) {
  if (!isTarget)
    return { label: "접근 차단", access: false, edit: false, submit: false };
  if (responseState === "제출 완료") {
    return { label: "결과 조회", access: true, edit: false, submit: false };
  }
  if (surveyState === "일시정지") {
    return { label: "일시정지 안내", access: true, edit: false, submit: false };
  }
  if (surveyState !== "진행") {
    return { label: "접근 제한", access: false, edit: false, submit: false };
  }
  return {
    label: responseState === "작성 중" ? "이어서 작성" : "신규 응답",
    access: true,
    edit: true,
    submit: true,
  };
}

export function SurveyStateMatrix() {
  return (
    <figure className="mt-8">
      <div className="p-4 divide-y rounded border">
        {[true, false].map((isTarget) => (
          <div
            key={String(isTarget)}
            className="p-4 overflow-x-auto"
            tabIndex={0}
          >
            <table className="w-full text-center">
              <caption className="mb-4 text-left font-medium">
                {isTarget ? "참여 대상" : "참여 비대상"}: 15개 조합
              </caption>
              <thead className="border-b">
                <tr>
                  <th scope="col" className="p-2 font-medium">
                    운영 상태
                  </th>
                  {responseStates.map((state) => (
                    <th
                      key={state}
                      scope="col"
                      className="p-2 border-l font-medium"
                    >
                      {state}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y">
                {surveyStates.map((surveyState) => (
                  <tr key={surveyState}>
                    <th scope="row" className="p-2 bg-secondary font-medium">
                      {surveyState}
                    </th>
                    {responseStates.map((responseState) => {
                      const policy = getDisplayPolicy(
                        surveyState,
                        responseState,
                        isTarget,
                      );
                      return (
                        <td
                          key={responseState}
                          className={`p-2 border-l ${policy.edit ? "bg-custom-300" : ""}`}
                        >
                          <p
                            className={
                              policy.access
                                ? "font-medium text-custom-100"
                                : "text-muted-foreground"
                            }
                          >
                            {policy.label}
                          </p>
                          <p className="mt-2 whitespace-nowrap font-mono">
                            {policy.access ? "O" : "X"} /{" "}
                            {policy.edit ? "O" : "X"} /{" "}
                            {policy.submit ? "O" : "X"}
                          </p>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
      <figcaption className="mt-2 text-center font-medium text-muted-foreground">
        [30개 입력 조합의 권한 매트릭스]
      </figcaption>
    </figure>
  );
}

export function SurveyPolicyDiagram() {
  return (
    <figure className="mt-8">
      <div className="p-4 overflow-hidden rounded border">
        <Image
          src={surveyPolicyFlowchart}
          alt="SQL JOIN으로 30개 입력 조합의 상태를 조회합니다. 비대상 15개는 접근을 차단하고, 대상자 중 제출 완료 5개는 결과 조회만 허용합니다. 나머지는 생성과 예약, 종료에서 각 2개씩 접근을 제한하고, 일시정지 2개는 안내와 답변 보존만 허용합니다. 진행 상태에서는 미응답 1개는 신규 응답, 작성 중 1개는 이어서 작성을 허용합니다. 저장과 제출 요청 시 최신 상태를 재조회해 허용되면 반영하고 아니면 변경을 거부합니다."
          sizes="(min-width: 768px) 702px, calc(100vw - 66px)"
          className="h-auto w-full"
        />
      </div>
      <figcaption className="mt-2 text-center font-medium text-muted-foreground">
        [30개 조합을 처리하는 전체 권한 판단 흐름]
      </figcaption>
    </figure>
  );
}
