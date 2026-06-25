import {
  CalendarClock,
  ClipboardList,
  GitBranch,
  MessagesSquare,
} from "lucide-react";
import { Project } from "@/types";
import Image from "next/image";

export const DATA: Project = {
  title: "한수원 ERP 고도화 프로젝트",
  subtitle: "BSC 성과지표 개발",
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
    <>
      <header>
        <h4>설문 라이프사이클과 응답 상태 분리를 통한 복잡도 제어</h4>
      </header>
      <div>
        <h5>문제 상황</h5>
        <p>
          설문조사 기능은 처음에는 단순한 CRUD 기능처럼 보였지만, 실제로는
          관리자 관점의 설문 상태와 사용자 관점의 응답 상태가 함께 맞물리는
          구조였습니다. 관리자는 설문을 생성, 예약, 진행중, 일시정지, 종료
          상태로 관리했고, 사용자는 대상자 여부와 응답 상태에 따라 접근 가능
          여부가 달라졌습니다.
        </p>
        <p>
          특히 진행중인 설문이지만 대상자가 아닌 경우, 임시저장 후 설문이
          일시정지된 경우, 이미 제출한 사용자가 다시 접근하는 경우처럼 상태
          조합에 따라 예외 케이스가 계속 늘어났습니다. 설문 상태 하나만으로
          화면과 권한을 제어하면 조건문이 복잡해지고, 변경 사항이 생길 때마다
          로직을 추적하기 어려운 문제가 있었습니다.
        </p>
      </div>
      <div>
        <h5>고민한 지점</h5>
        <p>
          핵심은 설문 자체의 라이프사이클과 사용자별 응답 흐름을 같은 상태로
          다룰 것인지, 별도의 상태로 분리할 것인지였습니다. 두 흐름을 하나로
          합치면 초기 구현은 단순해 보이지만, 상태 조합이 늘어날수록 조건 분기가
          많아지고 예외 처리가 파편화될 가능성이 컸습니다.
        </p>
        <p>
          그래서 설문 상태는 서비스 노출과 응답 가능 여부를 판단하는 기준으로,
          사용자 응답 상태는 임시저장, 제출완료, 재진입 시 기존 답변 조회 같은
          사용자 흐름을 제어하는 기준으로 분리했습니다.
        </p>
      </div>
      <div>
        <h5>해결</h5>
        <p>
          설문 라이프사이클 상태와 사용자 응답 상태를 분리한 뒤, 두 상태의
          조합에 따라 화면 노출, 버튼 활성화, 응답 가능 여부를 일관되게
          판단하도록 구조화했습니다.
        </p>
        <Image
          src={"/images/projects/erp/img-1.png"}
          alt="설문조사 상태 전이 다이어그램"
          height={1080}
          width={1080}
          className="mt-4 p-4 rounded border mx-auto w-4/5 md:w-4/5 max-w-lg"
        />
        <p className="mt-2 text-sm! text-muted-foreground text-center">
          설문조사 상태 전이 다이어그램
        </p>
        <p>
          이를 통해 진행중이지만 대상자가 아닌 경우, 일시정지 상태인 경우,
          임시저장 후 다시 진입한 경우, 이미 제출한 경우처럼 복잡한 상태 조합을
          동일한 기준으로 처리할 수 있었습니다.
        </p>
      </div>
      <div>
        <h5>결과</h5>
        <p>
          상태를 분리하면서 관리자 화면과 사용자 화면의 제어 기준이 명확해졌고,
          새로운 예외 케이스가 추가되더라도 어떤 상태를 기준으로 판단해야 하는지
          추적하기 쉬워졌습니다.
        </p>
        <p>
          이 경험을 통해 업무 시스템에서는 단순한 입력 기능이라도 상태 전이와
          예외 흐름을 먼저 정리해야 유지보수 가능한 구조를 만들 수 있다는 점을
          체감했습니다.
        </p>
      </div>
    </>,
  ],

  links: [],
};
