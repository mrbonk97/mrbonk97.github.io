import { StackSection } from "@/components/project/stack-section";
import { TitleSection } from "@/components/project/title-section";
import { FeatureSection } from "@/components/project/feature-section";
import { HeaderSection } from "@/components/project/header-section";
import { Badge } from "@/components/ui/badge";
import {
  ShieldCheck,
  Gauge,
  ClipboardCheck,
  LayoutDashboard,
  MailWarning,
  Users,
  Bug,
} from "lucide-react";

function ProjectPage() {
  return (
    <main className="p-4 pt-20 mx-auto max-w-5xl leading-relaxed whitespace-pre-line">
      <HeaderSection
        title="악성메일 모의훈련 솔루션"
        titleEng="1QONCATCH"
        imgUrl="/images/project/1qcatch/banner.png"
      />

      <section className="mt-16 md:mt-32">
        <TitleSection eyebrow="OVERVIEW" title="프로젝트 소개" />
        <p className="mt-4 md:mt-8">
          악성메일 훈련을 실제처럼 구현하고, 기획부터 결과 분석까지 하나의
          흐름으로 연결되도록 직접 개발한 보안 훈련 플랫폼입니다. 이번
          프로젝트에서는 프론트엔드 전반을 담당했으며, 회원가입부터 사용자 관리,
          운영 대시보드, 메일 작성 및 훈련 실행까지 주요 기능을 모두 직접
          설계하고 구현했습니다.
        </p>
      </section>

      <section className="mt-32">
        <TitleSection eyebrow="TECH STACK" title="프로젝트에 사용한 기술" />
        <StackSection
          stack={[
            {
              title: "Next.js",
              icon: "/icons/next.svg",
            },
            {
              title: "TanStack Query",
              icon: "/icons/tanstack-query.png",
            },
            {
              title: "TinyMCE",
              icon: "/icons/tinymce.png",
            },
          ]}
        />
      </section>

      <section className="mt-32">
        <TitleSection eyebrow="CORE FEATURES" title="핵심 기능" />
        <p className="mt-2 text-muted-foreground">
          WYSIWYG 에디터를 활용한 메일 작성, 피싱 페이지 제작, 사용자 관리까지
          실제 훈련 운영에 필요한 기능을 하나로 통합해 직접 구현했습니다.
        </p>
        <FeatureSection
          features={[
            {
              icon: <MailWarning />,
              title: "악성메일 시뮬레이터",
              description:
                "실제 공격 메일과 유사한 형태의 훈련 메일을 작성하고 발송할 수 있도록 구성하여 현실감 있는 보안 훈련이 가능하도록 했습니다.",
            },
            {
              icon: <Users />,
              title: "훈련 대상자 관리",
              description:
                "대상자 조회, 등록, 분류 기능을 통해 훈련 인원을 체계적으로 관리할 수 있도록 설계했습니다.",
            },
            {
              icon: <LayoutDashboard />,
              title: "운영 대시보드",
              description:
                "훈련 현황과 결과를 한눈에 파악할 수 있는 관리자 중심 화면을 제공하여 운영 효율을 높였습니다.",
            },
            {
              icon: <ClipboardCheck />,
              title: "실시간 피드백",
              description:
                "사용자의 반응과 훈련 결과를 빠르게 확인할 수 있도록 하여, 훈련 후속 조치와 분석을 쉽게 수행할 수 있도록 했습니다.",
            },
          ]}
        />
      </section>

      <section className="mt-32">
        <TitleSection
          eyebrow="DEEP DIVE"
          title="대규모 리스트 렌더링 성능 개선"
        />
        <p className="mt-4 md:mt-8">
          훈련 대상자 조회 화면에서는 수천 명 단위의 사용자를 다루기 때문에,
          대량 데이터 렌더링 시 성능 저하가 실제 UX에 직접적인 영향을 주는
          문제가 있었습니다.
        </p>

        <div className="mt-8 p-4 md:p-8 rounded-lg bg-secondary">
          <div className="flex items-center gap-2">
            <Gauge />
            <h4 className="text-lg md:text-2xl font-bold">
              문제점: 4,000 Row 이상 렌더링 시 입력 반응 속도가 크게 저하됨
            </h4>
          </div>

          <p className="mt-8 font-medium">
            대상자 조회 화면에서 대량 데이터를 한 번에 렌더링할 경우 LCP와 INP가
            악화되어, 클릭이나 값 수정 같은 사용자 입력이 즉각적으로 반응하지
            않는 문제가 발생했습니다.
          </p>
        </div>

        <p className="mt-8">
          특히 조회 대상자가 4,000건을 넘기기 시작하면 화면 전체의 렌더링 부담이
          커졌고, 필터 변경이나 셀 수정 같은 상호작용이 눈에 띄게 느려졌습니다.
        </p>

        <p className="mt-8">
          이를 해결하기 위해 렌더링 비용이 큰 컴포넌트를 중심으로{" "}
          <Badge variant={"secondary"}>React.memo</Badge>를 적용하고, 이벤트
          핸들러와 콜백 함수는 <Badge variant={"secondary"}>useCallback</Badge>
          으로 메모이제이션하여 불필요한 재렌더링을 줄였습니다.
        </p>

        <p className="mt-8">
          그 결과 사용자 입력 반응성과 관련된 INP를 약 740ms 수준에서{" "}
          <strong>430ms</strong>
          수준까지 개선할 수 있었고, 대규모 대상자 목록을 다루는 화면에서도 보다
          안정적인 UX를 제공할 수 있게 되었습니다.
        </p>
      </section>

      <section className="my-32">
        <TitleSection eyebrow="TROUBLESHOOTING" title="DLP 환경 제약 대응" />

        {/* 문제 */}
        <div className="mt-8 p-4 md:p-8 rounded-lg bg-secondary">
          <div className="flex gap-2">
            <Bug />
            <div>
              <h4 className="md:text-lg font-bold">
                문제: 파일 업로드 방식이 DLP에 의해 차단됨
              </h4>
              <p className="mt-4 text-sm md:text-base text-muted-foreground">
                사용자 일괄 등록을 위해 엑셀 업로드를 도입했지만, DLP 솔루션이
                파일 업로드 자체를 차단했습니다.
              </p>
              <p className="mt-2 text-sm md:text-base font-medium">
                → 실제 환경에서 해당 방식은 사용 불가
              </p>
            </div>
          </div>
        </div>

        {/* 해결 */}
        <div className="mt-8 p-4 md:p-8 rounded-lg border">
          <div className="flex gap-2">
            <ShieldCheck />
            <div>
              <h4 className="md:text-lg font-bold">
                해결: 복사·붙여넣기 기반 입력 방식으로 전환
              </h4>
              <p className="mt-4 text-sm md:text-base text-muted-foreground">
                파일 업로드를 제거하고, 엑셀 시트 데이터를 그대로 붙여넣으면
                클립보드 데이터를 파싱해 등록하도록 설계를 변경했습니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ProjectPage;
