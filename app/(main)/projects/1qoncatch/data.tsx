import {
  ClipboardCheck,
  LayoutDashboard,
  MailWarning,
  Users,
} from "lucide-react";
import { HighLight } from "@/components/util-component/high-light";
import Link from "next/link";
import { Project } from "@/types";
import { CodeBlock } from "@/components/util-component/code-block";

export const DATA: Project = {
  id: "1qoncatch",
  title: "악성메일 모의훈련 솔루션",
  summary:
    "피싱 메일 훈련 운영부터 대상자 관리, 현황 대시보드, 결과 보고서 생성까지 지원하는 보안 인식 훈련 플랫폼입니다.",
  banner: "/images/projects/1qcatch/banner.png",
  metadata: [
    {
      name: "요약",
      content: "조직 내 보안 인식 제고를 위한 악성메일 시뮬레이션 플랫폼",
    },
    { name: "기간", content: "2025.08 ~ 2026.04" },
    { name: "인원", content: "3명" },
    { name: "역할", content: "프론트엔드 개발" },
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
      name: "TinyMCE",
      iconUrl: "/icons/tinymce.png",
    },
    {
      name: "xlwings",
      iconUrl: "/icons/xlwings.svg",
    },
  ],

  features: [
    {
      icon: <MailWarning size={32} className="stroke-custom-2" />,
      name: "악성메일 시뮬레이터",
      description:
        "TinyMCE 기반의 메일 작성 환경을 구현하여 실제 공격 메일과 유사한 형태의 훈련용 피싱 메일을 제작할 수 있도록 구현했습니다.",
    },
    {
      icon: <Users size={32} className="stroke-custom-2" />,
      name: "대용량 훈련 대상자 관리",
      description:
        "수백 명에서 수천 명 규모의 임직원을 효율적으로 조회, 등록, 분류할 수 있는 관리자 기능을 구현했습니다.",
    },
    {
      icon: <LayoutDashboard size={32} className="stroke-custom-2" />,
      name: "운영 대시보드",
      description:
        "관리자가 전체 훈련 진행 현황, 참여 상태, 주요 지표를 실시간으로 파악할 수 있는 대시보드 UI를 구현했습니다.",
    },
    {
      icon: <ClipboardCheck size={32} className="stroke-custom-2" />,
      name: "보고서 자동화",
      description:
        "훈련 결과 데이터를 기반으로 보고서를 자동 생성하고, xlsx 형식으로 다운로드할 수 있는 기능을 구현했습니다.",
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
        <h4>성능 최적화</h4>
        <h2>대규모 리스트 렌더링 병목 개선</h2>

        <p className="mt-4 p-4 md:p-8 text-lg rounded bg-custom-2 text-custom-4">
          5,000명 규모의 리스트에서 INP를 740ms에서 340ms로 개선했습니다.
        </p>
      </header>
      <div>
        <h5>문제 상황</h5>

        <p>
          악성메일 모의훈련 솔루션의 대상자 관리 화면에서는 수천 명의 임직원을
          검색하고, 체크박스로 훈련 대상을 선택할 수 있어야 했습니다.
        </p>

        <p>
          소량의 더미 데이터에서는 문제가 없었지만, 운영 환경과 유사한 5,000명의
          데이터를 적용하자 검색 입력과 체크박스 선택이 눈에 띄게 느려졌습니다.
        </p>

        <CodeBlock
          code={`검색어 한 글자 입력
→ 검색 상태 변경
→ 5,000개 row 전체 리렌더링
→ 검색 결과 DOM 갱신
→ 화면 반응까지 약 740ms

체크박스 한 개 선택
→ 부모의 선택 상태 변경
→ 5,000개 row 전체 리렌더링
→ 선택 상태가 늦게 반영`}
        />

        <p>
          주요 인터랙션의 INP는 약 <strong>740ms</strong>로 측정됐고, 사용자는
          입력이나 선택 이후 화면이 한 박자 늦게 반응하는 지연을 체감할 수
          있었습니다.
        </p>
      </div>
      <div>
        <h5>원인 분석</h5>

        <p>
          <HighLight>React Profiler</HighLight>로 렌더링 과정을 확인한 결과,
          하나의 행만 변경해도 리스트 전체가 다시 렌더링되고 있었습니다.
        </p>

        <CodeBlock
          code={`RecipientsPage
└── RecipientList
    ├── RecipientRow #1    다시 렌더링
    ├── RecipientRow #2    다시 렌더링
    ├── RecipientRow #3    다시 렌더링
    ├── ...
    └── RecipientRow #5000 다시 렌더링

원인
1. 선택 상태를 부모 컴포넌트에서 관리
2. 상태 변경 시 부모 컴포넌트 리렌더링
3. 이벤트 핸들러가 매번 새로운 참조로 생성
4. 변경되지 않은 row까지 함께 리렌더링`}
        />

        <p>
          불필요한 리렌더링뿐 아니라 화면에 보이지 않는 항목까지 모두 DOM에
          생성하고 있다는 점도 병목이었습니다. 브라우저는 실제 화면에 표시되는
          일부 행만 필요했지만, 5,000개의 DOM 노드를 계속 관리하고 있었습니다.
        </p>
      </div>
      <div>
        <h5>리렌더링 범위 축소</h5>

        <p>
          먼저 각 행을 별도 컴포넌트로 분리하고
          <HighLight>React.memo</HighLight>를 적용했습니다. 부모에서 전달하는
          선택 핸들러는 <HighLight>useCallback</HighLight>으로 참조를
          유지했습니다.
        </p>

        <CodeBlock
          code={`const RecipientRow = React.memo(function RecipientRow({
  recipient,
  selected,
  onToggle,
}: RecipientRowProps) {
  return (
    <label>
      <input
        type="checkbox"
        checked={selected}
        onChange={() => onToggle(recipient.id)}
      />

      {recipient.name}
    </label>
  )
})

const handleToggle = useCallback((id: string) => {
  setSelectedIds((prev) => {
    const next = new Set(prev)

    if (next.has(id)) {
      next.delete(id)
    } else {
      next.add(id)
    }

    return next
  })
}, [])`}
        />

        <p>
          이벤트 핸들러의 참조가 유지되면서 선택 상태가 변경되지 않은 행은 기존
          렌더링 결과를 재사용할 수 있게 됐습니다. 체크박스를 선택할 때는 실제
          <code>selected</code> 값이 변경된 행을 중심으로 렌더링이 발생했습니다.
        </p>
      </div>
      <div>
        <h5>DOM 노드 가상화</h5>

        <p>
          리렌더링 범위를 줄인 뒤에도 5,000개의 DOM 노드를 한 번에 생성하고
          유지하는 비용은 남아 있었습니다.
        </p>

        <p>
          <HighLight>TanStack Virtual</HighLight>을 적용해 현재 화면에 보이는
          행과 일부 overscan 영역만 DOM에 렌더링하도록 변경했습니다.
        </p>

        <CodeBlock
          code={`const rowVirtualizer = useVirtualizer({
  count: recipients.length,
  getScrollElement: () => scrollRef.current,
  estimateSize: () => 48,
  overscan: 8,
})

const virtualRows = rowVirtualizer.getVirtualItems()

return virtualRows.map((virtualRow) => {
  const recipient = recipients[virtualRow.index]

  return (
    <RecipientRow
      key={recipient.id}
      recipient={recipient}
      selected={selectedIds.has(recipient.id)}
      onToggle={handleToggle}
    />
  )
})`}
        />

        <CodeBlock
          code={`개선 전
데이터 5,000개
→ React 컴포넌트 5,000개 렌더링
→ DOM 노드 5,000개 유지

개선 후
데이터 5,000개
→ 화면에 보이는 약 20개 row 계산
→ overscan을 포함한 일부 row만 렌더링
→ 스크롤 위치에 따라 DOM 재사용`}
        />

        <p>
          전체 데이터는 유지하면서도 브라우저가 실제로 처리하는 DOM 노드 수를
          제한해 초기 렌더링, 검색 결과 갱신, 스크롤 과정의 부담을 줄였습니다.
        </p>
      </div>
      <div>
        <h5>개선 효과</h5>

        <CodeBlock
          code={`테스트 조건
- 사용자 데이터: 5,000명
- 측정 대상: 검색 입력, 체크박스 선택

개선 전 INP  740ms
개선 후 INP  340ms
개선율         약 54%`}
        />

        <p>
          동일한 데이터 환경에서 다시 측정한 결과, 주요 인터랙션의 INP가
          <strong> 740ms에서 340ms로 감소</strong>했습니다.
        </p>

        <p>
          검색어를 입력했을 때 결과가 늦게 갱신되는 현상과 체크박스 선택 상태가
          지연되어 표시되는 현상도 함께 줄었습니다.
        </p>

        <p>
          자세한 분석과 구현 과정은 아래 글에서 확인할 수 있습니다.
          <br />
          <Link
            href="/blog/render-optimization"
            className="underline underline-offset-2"
          >
            대규모 React 리스트 렌더링 최적화 과정
          </Link>
        </p>
      </div>
    </section>,
  ],

  links: [
    {
      isInside: true,
      name: "Next.js 렌더링 최적화",
      url: "/blog/render-optiomization",
    },
  ],
};
