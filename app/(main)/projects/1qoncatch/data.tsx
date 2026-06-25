import {
  ClipboardCheck,
  LayoutDashboard,
  MailWarning,
  Users,
} from "lucide-react";
import { HighLight } from "@/components/high-light";
import Link from "next/link";
import { Project } from "@/types";

export const DATA: Project = {
  title: "악성메일 모의훈련 솔루션",
  subtitle: "1QONCATCH",
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
      icon: <MailWarning size={48} className="stroke-custom-2" />,
      name: "악성메일 시뮬레이터",
      description:
        "TinyMCE 기반의 메일 작성 환경을 구현하여 실제 공격 메일과 유사한 형태의 훈련용 피싱 메일을 제작할 수 있도록 구현했습니다.",
    },
    {
      icon: <Users size={48} className="stroke-custom-2" />,
      name: "대용량 훈련 대상자 관리",
      description:
        "수백 명에서 수천 명 규모의 임직원을 효율적으로 조회, 등록, 분류할 수 있는 관리자 기능을 구현했습니다.",
    },
    {
      icon: <LayoutDashboard size={48} className="stroke-custom-2" />,
      name: "운영 대시보드",
      description:
        "관리자가 전체 훈련 진행 현황, 참여 상태, 주요 지표를 실시간으로 파악할 수 있는 대시보드 UI를 구현했습니다.",
    },
    {
      icon: <ClipboardCheck size={48} className="stroke-custom-2" />,
      name: "보고서 자동화",
      description:
        "훈련 결과 데이터를 기반으로 보고서를 자동 생성하고, xlsx 형식으로 다운로드할 수 있는 기능을 구현했습니다.",
    },
  ],

  content: [
    <>
      <header>
        <h2>[성능 최적화]</h2>
        <h4>대규모 리스트 렌더링 병목 개선</h4>
      </header>

      <div>
        <h5>문제 상황</h5>

        <p>
          악성메일 모의훈련 솔루션의 훈련 대상자 관리 화면에서 대규모 리스트
          렌더링 성능 문제가 발생했습니다.
        </p>

        <p>
          초기 개발 단계에서는 더미 데이터 수가 적어 문제가 드러나지 않았지만,
          실제 운영 환경에 가깝게 4,000명 이상의 임직원 데이터를 넣자 검색과
          선택 인터랙션이 눈에 띄게 느려졌습니다.
        </p>

        <p>
          input에 한 글자만 입력해도 화면이 잠깐 멈췄고, 체크박스를 클릭해도
          선택 상태가 한 박자 늦게 반영되었습니다. 주요 입력 인터랙션의 INP는 약
          740ms로 측정되었습니다.
        </p>
      </div>

      <div>
        <h5>원인 분석</h5>

        <p>
          <HighLight> React Profiler</HighLight>로 확인한 결과, 가장 큰 원인은
          단일 row 변경 시 리스트 전체가 리렌더링되는 구조였습니다. 한 명의 체크
          상태만 변경해도 부모 상태가 갱신되면서 수천 개의 리스트 아이템이 모두
          다시 렌더링되고 있었습니다.
        </p>

        <p>
          또한 <HighLight>React.memo</HighLight>를 적용해도 효과가
          제한적이었습니다. 부모 컴포넌트에서 onSelect, onDelete 같은 이벤트
          핸들러를 매 렌더링마다 새로 생성하고 있었기 때문에, row 입장에서는
          실제 데이터가 바뀌지 않아도 props 참조가 달라져 memoization이 깨지고
          있었습니다.
        </p>
      </div>

      <div>
        <h5>해결</h5>

        <p>
          이를 해결하기 위해 먼저 리스트 아이템을 별도 컴포넌트로 분리하고
          <HighLight>React.memo</HighLight>를 적용했습니다. 이후
          <HighLight>useCallback</HighLight>으로 부모에서 전달하는 이벤트
          핸들러의 참조를 안정화해, 실제로 변경된 row 중심으로만 렌더링이
          발생하도록 개선했습니다.
        </p>

        <p>
          다만 수천 개의 DOM 노드를 한 번에 렌더링하는 비용은 여전히 남아
          있었습니다. 그래서 <HighLight>TanStack Virtual</HighLight>을 적용해
          화면에 보이는 row와 overscan 영역만 렌더링하도록 구조를 변경했습니다.
          이를 통해 초기 렌더링 비용과 스크롤 부담을 줄이고, 대규모 데이터에서도
          리스트 조작이 더 안정적으로 동작하도록 만들었습니다.
        </p>
      </div>

      <div>
        <h5>개선 효과</h5>
        <p>
          5,000명의 사용자 데이터를 기준으로 다시 측정한 결과, INP는 약
          740ms에서 340ms로 감소했습니다. 약 <strong>54% 개선</strong>된
          결과였고, 검색 입력과 체크박스 선택 시 발생하던 체감 지연도 크게
          줄었습니다.
        </p>

        <p>
          자세한 과정이 궁금하시다면 게시글을 읽어보세요
          <br />
          <Link
            href="/blog/render-optimization"
            className="underline underline-offset-2"
          >
            [링크]
          </Link>
        </p>
      </div>
    </>,
  ],

  links: [
    {
      isInside: true,
      name: "Next.js 렌더링 최적화",
      url: "/blog/render-optiomization",
    },
  ],
};
