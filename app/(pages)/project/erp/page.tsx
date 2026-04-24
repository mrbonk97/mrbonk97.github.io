import { HeaderSection } from "@/components/project/header-section";
import { TitleSection } from "@/components/project/title-section";
import { StackSection } from "@/components/project/stack-section";

function ProjectPage_ERP() {
  return (
    <main className="pt-20 p-4 mx-auto max-w-5xl leading-relaxed whitespace-pre-line">
      <HeaderSection
        title={"한국수력원자력 ERP 고도화 프로젝트"}
        titleEng={"ERP"}
        imgUrl={"/images/project/erp/banner.png"}
      />

      <section className="mt-16 md:mt-32">
        <TitleSection eyebrow="OVERVIEW" title="프로젝트 소개" />
        <p className="mt-4 md:mt-8">
          5개 컨소시엄과 110명 이상이 참여한 대규모 고도화 프로젝트에 개발자로
          참여했습니다. 약 1년 2개월 동안 프로젝트 전반에 걸쳐 BSC 성과지표 기반
          업무 시스템 고도화 개발을 수행했으며, 동시에 전체 공정 관리에도 직접
          참여했습니다.
          <br />
          <br />
          특히 BSC 성과지표 영역 중 설문조사 및 전자공청회 기능을 직접 개발했고,
          Oracle 메타데이터를 기반으로 Job과 Procedure 간 선후 관계를 분석하며
          시스템 구조를 파악했습니다. 기존 문서가 상당 부분 유실된 상태에서
          소스와 데이터 흐름을 직접 분석해 기능을 구현해야 했기 때문에 난이도가
          높은 환경이었지만, 그만큼 실질적인 문제 해결 경험과 시스템 이해도를
          크게 높일 수 있었습니다.
        </p>
      </section>

      <section className="mt-32">
        <TitleSection eyebrow="TECH STACK" title="프로젝트에 사용한 기술" />
        <StackSection
          stack={[
            {
              title: "Nexacro",
              icon: "/icons/nexacro.svg",
            },
            {
              title: "Oracle",
              icon: "/icons/oracle.png",
            },
          ]}
        />
      </section>

      <section className="mt-32">
        <TitleSection
          eyebrow="DEEP DIVE"
          title="문서 없는 ERP를 코드와 데이터로 분석한 경험"
        />
        <p className="mt-8">
          문서가 하나도 없는 레거시 ERP를 분석해야 했습니다. 오래된 시스템이라
          남아있는 문서가 거의 없었고, 결국 &quot;이 시스템이 실제로 어떻게
          돌아가는지&quot;를 직접 파악하는 것부터 시작해야 했습니다.
          <br />
          <br />
          화면을 수정하기 전에 먼저 관련된 Job과 Procedure가 어떤 순서로
          실행되는지 정리했습니다. 그리고 Controller → Service → DAO 흐름을
          따라가면서 실제로 어떤 로직이 수행되는지 하나씩 추적했습니다. 단순히
          코드만 보는 게 아니라, DB까지 내려가 어떤 테이블에서 데이터가 생성되고
          변경되는지도 같이 확인했습니다.
          <br />
          <br />이 과정을 거치면서 기능 하나를 수정할 때 어떤 영역까지 영향이
          퍼지는지를 미리 알 수 있게 됐습니다. 처음에는 막막했지만, 결과적으로는
          시스템 전체 흐름을 이해하는 데 큰 도움이 되었던 경험이었습니다.
        </p>
      </section>

      <section className="mt-32">
        <TitleSection title="넥사크로 + 레거시 조합" />
        <p className="mt-8">
          넥사크로 환경에서 작업하면서 가장 어려웠던 점은 레이아웃 처리였습니다.
          일반적인 웹처럼 flex나 grid를 쓸 수 없고, 대부분을 absolute 좌표로
          직접 배치해야 했기 때문입니다.
          <br />
          <br />
          정적인 통계 화면이나 테이블 UI에는 강점이 있지만, 동적으로 변하는
          화면에서는 제약이 꽤 크게 느껴졌습니다.
          <br />
          <br />
          특히 설문조사 화면을 구현할 때가 그랬습니다. 문항 타입도 다양했고,
          선택지 개수나 텍스트 길이에 따라 화면을 전부 동적으로 그려야 했습니다.
          <br />
          <br />
          결국 텍스트 길이를 기준으로 width를 계산하고, 줄 수를 나누는 로직까지
          직접 구현했습니다. 지금 보면 레이아웃 엔진이 할 일을 수동으로 처리한
          셈이지만, 당시에는 현실적인 선택이었습니다.
        </p>
      </section>
    </main>
  );
}

export default ProjectPage_ERP;
