import {
  CalendarClock,
  ClipboardList,
  GitBranch,
  MessagesSquare,
} from "lucide-react";
import { Project } from "@/types";
import Image from "next/image";
import { CodeBlock } from "@/components/util-component/code-block";

export const DATA: Project = {
  id: "erp",
  title: "한수원 ERP 고도화 프로젝트",
  summary:
    "레거시 ERP 환경에서 BSC 성과지표의 설문조사·전자공청회 기능을 개발하고, 기존 업무 흐름과 데이터 구조를 분석한 프로젝트입니다.",
  banner: "/images/projects/erp/banner.png",
  metadata: [
    {
      name: "요약",
      content: (
        <>
          <p className="mt-4">
            한수원의 단위업무시스템 중 BSC 성과지표의 설문조사와 전자공청회
            기능을 담당했으며, 기존 ERP 업무 흐름과 연계되는 기능이었기 때문에
            Java 소스, Oracle DB, Procedure, 배치 Job 흐름까지 직접 분석하며
            개발했습니다.
          </p>
          <p className="mt-4">
            문서가 부족한 레거시 환경에서 화면과 데이터 흐름을 추적해 시스템
            구조를 파악했고, 이를 바탕으로 신규 기능을 안정적으로 구현했습니다.
            이 경험을 통해 복잡한 업무 시스템을 해석하는 능력과 레거시
            환경에서의 개발 역량을 키울 수 있었습니다.
          </p>
        </>
      ),
    },
    { name: "기간", content: "2022.12 ~ 2024.02" },
    { name: "인원", content: "120명+" },
    { name: "역할", content: "풀스택 개발" },
  ],

  stacks: [
    {
      name: "Nexacro",
      iconUrl: "/icons/nexacro.svg",
    },
    {
      name: "XUp",
      iconUrl: "/icons/xup.png",
    },
    {
      name: "Oracle",
      iconUrl: "/icons/oracle.svg",
    },
  ],

  features: [
    {
      icon: <ClipboardList size={48} className="stroke-custom-2" />,
      name: "설문조사 기능 개발",
      description:
        "설문 생성, 예약, 진행, 일시정지, 종료 상태에 따라 사용자 노출 여부와 응답 가능 여부를 제어하는 설문조사 기능을 구현했습니다.",
    },
    {
      icon: <MessagesSquare size={48} className="stroke-custom-2" />,
      name: "전자공청회 기능 개발",
      description:
        "사용자 참여, 의견 등록, 조회 흐름을 기존 ERP 업무 프로세스와 연계하여 전자공청회 기능을 구현했습니다.",
    },
    {
      icon: <GitBranch size={48} className="stroke-custom-2" />,
      name: "레거시 데이터 흐름 분석",
      description:
        "Java 소스, Oracle DB, Procedure, 배치 Job을 직접 추적하며 ERP 내부 데이터 처리 흐름과 기능 간 의존성을 분석했습니다.",
    },
    {
      icon: <CalendarClock size={48} className="stroke-custom-2" />,
      name: "프로젝트 공정관리 참여",
      description:
        "Primavera P6와 CPM 기법을 활용해 대규모 프로젝트의 일정, 공정률, 주요 마일스톤 관리 업무를 지원했습니다.",
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
        <h4>복잡도 제어</h4>
        <h2>설문 라이프사이클과 응답 상태를 분리한 접근 제어 설계</h2>

        <p className="mt-4 p-4 md:p-8 text-lg rounded bg-custom-2 text-custom-4">
          설문 운영 상태와 사용자별 응답 상태를 독립적으로 모델링하고, 상태
          조합에 따른 접근·수정·제출 정책을 하나의 기준으로 통합했습니다.
        </p>
      </header>

      <div>
        <h5>문제 상황</h5>

        <p>
          설문조사 기능은 설문을 생성하고 응답을 저장하는 단순한 CRUD가
          아니었습니다. 설문 자체의 운영 상태와 사용자별 응답 상태가 동시에
          화면과 동작을 결정하는 구조였습니다.
        </p>

        <CodeBlock
          code={`설문 운영 상태
├── 생성
├── 예약
├── 진행
├── 일시정지
└── 종료

사용자 상태
├── 설문 대상 여부
├── 응답 시작 여부
├── 임시저장 여부
└── 제출 완료 여부`}
        />

        <p>
          예를 들어 설문이 진행 중이더라도 대상자가 아닌 사용자는 응답할 수
          없고, 임시저장 이후 설문이 일시정지되면 기존 답변은 유지하되 수정과
          제출은 제한해야 했습니다.
        </p>

        <p>
          또한 제출을 완료한 사용자가 다시 접근하면 신규 응답 화면이 아니라 제출
          결과를 확인하는 읽기 전용 화면을 제공해야 했습니다.
        </p>

        <CodeBlock
          code={`같은 설문이라도 사용자 상태에 따라 결과가 달라짐

진행 중 + 대상자 + 미응답
→ 신규 응답 가능

진행 중 + 대상자 + 임시저장
→ 기존 답변 이어서 작성

일시정지 + 대상자 + 임시저장
→ 답변 유지, 수정 및 제출 차단

진행 중 + 제출 완료
→ 읽기 전용 결과 화면

진행 중 + 대상자 아님
→ 접근 제한`}
        />

        <p>
          이러한 조건을 각 화면에서 개별적으로 처리하면 동일한 조건문이
          반복되고, 정책이 변경될 때 여러 화면의 분기 로직을 함께 수정해야 하는
          문제가 발생했습니다.
        </p>
      </div>
      <div>
        <h5>상태 모델 분리</h5>

        <p className="p-4 rounded bg-custom-3 text-custom-1 font-bold text-balance break-keep">
          설문의 운영 상태와 사용자 개인의 응답 진행 상태를 서로 독립된 모델로
          분리했습니다.
        </p>

        <p>
          설문 상태는 설문 공개 여부와 응답 허용 여부를 결정하도록 구성했습니다.
        </p>

        <CodeBlock
          code={`SurveyStatus

CREATED
   │
   ├── 예약 설정
   ▼
SCHEDULED
   │
   ├── 시작 시간 도달
   ▼
IN_PROGRESS ◀────▶ PAUSED
   │                 설문 일시정지
   │
   ├── 종료 시간 도달 또는 관리자 종료
   ▼
CLOSED`}
        />

        <p>
          사용자 응답 상태는 개인별 작성 진행 상황과 재접근 시 보여줄 화면을
          결정하도록 구성했습니다.
        </p>

        <CodeBlock
          code={`ResponseStatus

NOT_STARTED
    │
    ├── 응답 시작 또는 임시저장
    ▼
IN_PROGRESS
    │
    ├── 최종 제출
    ▼
SUBMITTED`}
        />

        <p>
          두 상태를 분리하면서 설문이 일시정지되거나 종료되더라도 사용자가
          작성한 응답 상태는 유지했습니다. 반대로 특정 사용자가 응답을 제출해도
          설문 전체의 운영 상태에는 영향을 주지 않도록 했습니다.
        </p>
      </div>
      <div>
        <h5>상태 조합 기반 접근 정책</h5>

        <p>
          화면마다 조건문을 작성하는 대신 설문 상태, 응답 상태, 대상자 여부를
          입력받아 사용자가 수행할 수 있는 동작을 반환하는 공통 정책으로
          정리했습니다.
        </p>

        <CodeBlock
          code={`SurveyStatus
+ ResponseStatus
+ isTarget
─────────────────────────
canAccess      접근 가능 여부
canEdit        답변 수정 가능 여부
canSubmit      최종 제출 가능 여부
viewMode       표시할 화면 유형`}
        />

        <p>주요 상태 조합은 다음과 같은 기준으로 처리했습니다.</p>

        <CodeBlock
          code={`┌─────────────┬─────────────┬────────┬────────┬────────┬─────────────┐
│ 설문 상태   │ 응답 상태    │ 대상자 │ 접근   │ 수정   │ 화면          │
├─────────────┼─────────────┼────────┼────────┼────────┼─────────────┤
│ IN_PROGRESS │ NOT_STARTED │ O      │ 허용   │ 허용   │ 신규 응답     │
│ IN_PROGRESS │ IN_PROGRESS │ O      │ 허용   │ 허용   │ 이어서 작성   │
│ IN_PROGRESS │ SUBMITTED   │ O      │ 허용   │ 차단   │ 제출 결과     │
│ PAUSED      │ IN_PROGRESS │ O      │ 허용   │ 차단   │ 일시정지 안내 │
│ CLOSED      │ SUBMITTED   │ O      │ 허용   │ 차단   │ 제출 결과     │
│ IN_PROGRESS │ 모든 상태    │ X      │ 차단   │ 차단   │ 접근 제한     │
└─────────────┴─────────────┴────────┴────────┴────────┴─────────────┘`}
        />

        <p>
          이 기준을 공통 함수로 구현해 관리자 화면과 사용자 화면이 동일한 정책을
          사용하도록 구성했습니다.
        </p>

        <CodeBlock
          code={`function getSurveyAccessPolicy({
  surveyStatus,
  responseStatus,
  isTarget,
}: SurveyAccessInput): SurveyAccessPolicy {
  if (!isTarget) {
    return {
      canAccess: false,
      canEdit: false,
      canSubmit: false,
      viewMode: "ACCESS_DENIED",
    }
  }

  if (responseStatus === "SUBMITTED") {
    return {
      canAccess: true,
      canEdit: false,
      canSubmit: false,
      viewMode: "READ_ONLY",
    }
  }

  if (surveyStatus === "PAUSED") {
    return {
      canAccess: true,
      canEdit: false,
      canSubmit: false,
      viewMode: "PAUSED",
    }
  }

  if (surveyStatus !== "IN_PROGRESS") {
    return {
      canAccess: false,
      canEdit: false,
      canSubmit: false,
      viewMode: "UNAVAILABLE",
    }
  }

  return {
    canAccess: true,
    canEdit: true,
    canSubmit: true,
    viewMode:
      responseStatus === "IN_PROGRESS"
        ? "CONTINUE"
        : "NEW_RESPONSE",
  }
}`}
        />

        <p>
          컴포넌트에서는 복잡한 상태 조합을 직접 해석하지 않고, 정책 함수가
          반환한 결과에 따라 화면과 버튼만 렌더링하도록 역할을 분리했습니다.
        </p>

        <CodeBlock
          code={`const policy = getSurveyAccessPolicy({
  surveyStatus,
  responseStatus,
  isTarget,
})

if (!policy.canAccess) {
  return <SurveyAccessDenied />
}

if (policy.viewMode === "PAUSED") {
  return <SurveyPausedNotice />
}

if (policy.viewMode === "READ_ONLY") {
  return <SubmittedResponse />
}

return (
  <SurveyForm
    readOnly={!policy.canEdit}
    canSubmit={policy.canSubmit}
  />
)`}
        />

        <Image
          src={"/images/projects/erp/img-1.png"}
          alt="설문 라이프사이클과 사용자 응답 상태 전이 다이어그램"
          height={1080}
          width={1080}
          className="mt-4 p-4 rounded border mx-auto w-4/5 max-w-lg"
        />

        <p className="mt-2 text-sm! text-muted-foreground text-center">
          설문 라이프사이클과 사용자 응답 상태 전이
        </p>
      </div>
      <div>
        <h5>결과</h5>

        <p>
          설문 운영 상태와 사용자 응답 상태를 독립적으로 관리하면서도, 두 상태의
          조합에 따른 접근 규칙은 하나의 정책 함수에서 일관되게 처리할 수
          있었습니다.
        </p>

        <CodeBlock
          code={`개선 전
각 화면에서 상태 조건을 개별 처리
→ 조건문 중복
→ 화면별 정책 불일치
→ 상태 추가 시 영향 범위 추적 어려움

개선 후
상태 모델 분리
→ 상태 조합을 정책 함수에서 판단
→ 컴포넌트는 반환된 결과만 렌더링
→ 정책 변경 지점을 한 곳으로 제한`}
        />

        <p>
          진행 중, 일시정지, 임시저장, 제출 완료처럼 여러 화면에 흩어져 있던
          예외 처리를 공통 기준으로 통합해 화면마다 다른 판단이 내려지는 문제를
          줄였습니다.
        </p>

        <p>
          새로운 설문 상태나 응답 정책이 추가되더라도 상태 전이 규칙과 접근
          정책을 중심으로 영향 범위를 확인할 수 있어 유지보수 복잡도와 변경
          비용을 낮췄습니다.
        </p>
      </div>
    </section>,
  ],

  links: [],
};
