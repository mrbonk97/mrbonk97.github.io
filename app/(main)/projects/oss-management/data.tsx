import { CodeBlock } from "@/components/util-component/code-block";
import { HighLight } from "@/components/util-component/high-light";
import { Project } from "@/types";
import { Database, History, ScanSearch, ShieldCheck } from "lucide-react";

export const DATA: Project = {
  id: "oss-management",
  title: "오픈소스 관리시스템",
  summary:
    "오픈소스 패키지별 취약점을 식별하고, 점검 결과와 조치 현황을 체계적으로 관리할 수 있는 보안 관리 서비스입니다.",
  banner: "/images/projects/oss-management/banner.png",

  metadata: [
    {
      name: "요약",
      content: `관계사별 저장소와 SBOM을 기반으로 오픈소스 구성 요소를 관리하고, OSV의 공개 취약점 데이터를 자동 수집 및 매칭해 그룹 전체의 영향 범위를 즉시 확인할 수 있도록 구축한 오픈소스 취약점 통합 관리 플랫폼입니다.`,
    },
    { name: "기간", content: "2026.05 ~ 2026.07" },
    { name: "인원", content: "6명" },
    { name: "역할", content: "풀스택 개발" },
  ],

  stacks: [
    {
      name: "Spring Boot",
      iconUrl: "/icons/spring-boot.svg",
    },
    {
      name: "Postgresql",
      iconUrl: "/icons/postgresql.svg",
    },
    {
      name: "Next.js",
      iconUrl: "/icons/next.svg",
    },
    {
      name: "TanStack Query",
      iconUrl: "/icons/tanstack-query.png",
    },
  ],

  features: [
    {
      icon: <Database size={32} className="stroke-custom-2" />,
      name: "취약점 데이터 자동 수집",
      description:
        "OSV, NVD, GitHub Advisory를 연동해 공개 취약점 데이터를 주기적으로 수집하고 통합 관리합니다.",
    },
    {
      icon: <ScanSearch size={32} className="stroke-custom-2" />,
      name: "SBOM 기반 자동 매칭",
      description:
        "등록된 SBOM의 패키지 이름과 버전 범위를 분석해 사용 중인 오픈소스와 공개 취약점을 자동으로 매칭합니다.",
    },
    {
      icon: <ShieldCheck size={32} className="stroke-custom-2" />,
      name: "다관계사 권한 관리",
      description:
        "관계사와 사용자 역할에 따른 RBAC를 적용해 각 조직이 허용된 저장소와 취약점 정보에만 접근하도록 관리합니다.",
    },
    {
      icon: <History size={32} className="stroke-custom-2" />,
      name: "스냅샷 기반 이력 관리",
      description:
        "SBOM을 스냅샷 단위로 저장해 시점별 오픈소스 구성과 취약점 매칭 결과를 추적할 수 있습니다.",
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
        <h2>취약점 대응 자동화</h2>
        <h4>SBOM 기반 그룹 오픈소스 취약점 통합 관리 플랫폼</h4>

        <p className="mt-4 p-4 md:p-8 text-lg rounded bg-custom-2 text-custom-4">
          관계사별 SBOM과 공개 취약점 데이터를 자동으로 매칭해, 공지와
          전수조사에 의존하지 않고 영향받는 저장소를 식별할 수 있도록 했습니다.
        </p>
      </header>

      <div>
        <h5>1. 수작업 중심 대응의 한계</h5>

        <p>
          기존에는 새로운 오픈소스 취약점이 공개되면 관계사에 공지 메일을
          발송하고, 각 IT 부서가 담당 시스템에서 해당 패키지를 사용하는지 직접
          조사했습니다.
        </p>

        <CodeBlock
          code={`취약점 공개
  ↓
관계사 공지 메일 발송
  ↓
담당자별 오픈소스 사용 여부 조사
  ↓
영향받는 시스템과 버전 확인
  ↓
결과 취합 및 조치 현황 관리`}
        />

        <p>
          어떤 시스템이 특정 오픈소스를 사용하는지 중앙에서 확인할 수 없었기
          때문에, 담당자는 저장소와 서버를 개별적으로 점검해야 했습니다.
        </p>

        <p>
          이 과정은 담당자의 기억과 수작업에 의존했고, 그룹 전체의 영향 범위를
          확인하는 데 수일에서 수주가 걸렸습니다. 조사 대상이 누락되거나
          관계사마다 다른 형식으로 결과가 관리돼 과거 대응 이력을 추적하기도
          어려웠습니다.
        </p>

        <CodeBlock
          code={`기존 대응 방식의 한계

오픈소스 자산 정보 분산
+ 관계사별 수작업 조사
+ 패키지 버전 확인 기준 불일치
+ 조사 및 조치 이력 분산
──────────────────────────
영향 범위 파악 지연
조사 누락 가능성
반복적인 전수조사 발생`}
        />
      </div>

      <div>
        <h5>2. SBOM 기반 오픈소스 자산 관리</h5>

        <p>
          관계사별 저장소에서 생성한 <HighLight>SBOM</HighLight>을 플랫폼에
          등록해, 각 시스템을 구성하는 오픈소스 패키지와 버전을 중앙에서
          관리하도록 구성했습니다.
        </p>

        <CodeBlock
          code={`그룹
└── 관계사
    └── 저장소
        └── SBOM Snapshot
            ├── 패키지 식별자
            ├── 패키지 버전
            ├── 패키지 생태계
            ├── 라이선스
            └── 의존 관계`}
        />

        <p>
          단순히 최신 SBOM만 덮어쓰지 않고 배포 시점별
          <HighLight>Snapshot</HighLight>으로 저장했습니다. 이를 통해 현재 사용
          중인 구성 요소뿐 아니라 특정 시점에 어떤 버전이 사용됐는지도 확인할 수
          있도록 했습니다.
        </p>

        <CodeBlock
          code={`2025.01 배포 Snapshot
├── package-a@1.4.0
└── package-b@2.1.0

2025.03 배포 Snapshot
├── package-a@1.5.2
├── package-b@2.1.0
└── package-c@3.0.1

→ 배포 시점별 구성 변경 추적
→ 당시 사용 버전과 취약점 이력 재확인`}
        />

        <p>
          스냅샷과 취약점 매칭 결과를 함께 보존해, 패키지 버전 변경 전후의 위험
          상태와 조치 이력을 추적할 수 있도록 했습니다.
        </p>
      </div>

      <div>
        <h5>3. 공개 취약점 데이터 수집</h5>

        <p>
          공개 취약점 데이터 원천에서 신규 및 변경 데이터를 주기적으로 수집하고,
          플랫폼 내부에서 매칭할 수 있는 공통 구조로 정규화했습니다.
        </p>

        <CodeBlock
          code={`공개 취약점 데이터
  ↓
신규·변경 데이터 수집
  ↓
공통 데이터 모델로 정규화
  ├── 취약점 식별자
  ├── 패키지 생태계
  ├── 패키지 이름
  ├── 영향 버전 범위
  ├── 심각도
  └── 공개 및 수정 시각
  ↓
취약점 데이터베이스 적재`}
        />

        <p>
          데이터 원천마다 패키지 식별 방식과 버전 범위 표현이 달랐기 때문에,
          취약점 ID만 저장하지 않고 패키지 생태계와 영향 버전 범위를 함께
          정규화했습니다.
        </p>

        <p>
          중간 발표 시점에는 복수의 공개 데이터 원천에서 수집한 약
          <HighLight>24.5만 건</HighLight>의 취약점 데이터를 플랫폼에
          적재했습니다.
        </p>
      </div>

      <div>
        <h5>4. SBOM과 취약점 자동 매칭</h5>

        <p>
          수집한 취약점 데이터를 SBOM의 패키지와 자동으로 비교해, 관계사와
          저장소별 영향 여부를 계산했습니다.
        </p>

        <CodeBlock
          code={`SBOM Component
├── ecosystem: npm
├── package: example-package
└── version: 2.3.1

Vulnerability
├── ecosystem: npm
├── package: example-package
└── affected: >= 2.0.0, < 2.4.0

매칭 결과
└── 2.3.1이 영향 범위에 포함
    → 취약 저장소로 식별`}
        />

        <p>
          단순한 문자열 일치가 아니라 패키지 생태계, 패키지 식별자와 버전 범위를
          기준으로 비교했습니다. 사용 중인 버전이 취약점의 영향 범위에 포함되면
          관계사, 저장소, SBOM 스냅샷과 연결된 매칭 결과를 생성했습니다.
        </p>

        <CodeBlock
          code={`취약점 데이터 수집
  ↓
영향받는 패키지와 버전 범위 추출
  ↓
SBOM Component 검색
  ↓
관계사·저장소·Snapshot 연결
  ↓
취약점 매칭 결과 생성
  ↓
담당자 확인 및 조치 상태 관리`}
        />

        <p>
          담당자는 공지 메일을 받은 뒤 시스템별로 다시 조사하지 않아도, 어떤
          관계사의 어떤 저장소가 영향을 받는지 플랫폼에서 바로 확인할 수 있게
          됐습니다.
        </p>
      </div>

      <div>
        <h5>5. 다관계사 환경의 접근 제어</h5>

        <p>
          여러 관계사가 하나의 플랫폼을 사용하므로, 사용자의 소속과 역할에 따라
          조회하고 관리할 수 있는 데이터 범위를 분리했습니다.
        </p>

        <CodeBlock
          code={`그룹 관리자
└── 전체 관계사와 저장소 조회

관계사 관리자
└── 소속 관계사의 저장소와 취약점 관리

저장소 담당자
└── 담당 저장소의 SBOM과 조치 상태 관리

조회 사용자
└── 허용된 범위의 취약점 현황 조회`}
        />

        <p>
          역할만 확인하는 방식이 아니라 관계사와 저장소 범위를 함께 검증해, 다른
          관계사의 SBOM이나 취약점 대응 정보에 접근하지 못하도록 구성했습니다.
        </p>
      </div>

      <div>
        <h5>6. 결과</h5>

        <CodeBlock
          code={`개선 전

취약점 공개
→ 공지 메일 발송
→ 관계사별 전수조사
→ 결과 취합
→ 영향 범위 확인


개선 후

취약점 데이터 수집
→ SBOM 자동 매칭
→ 영향받는 관계사·저장소 식별
→ 담당자 조치 상태 관리`}
        />

        <ul>
          <li>관계사와 저장소별 오픈소스 구성 요소 가시화</li>
          <li>패키지 생태계와 영향 버전 범위 기반 취약점 자동 매칭</li>
          <li>SBOM 스냅샷을 활용한 배포 시점별 구성 변경 추적</li>
          <li>취약점 발견부터 조치 완료까지의 대응 이력 통합 관리</li>
          <li>다관계사 환경에 맞춘 역할 및 데이터 범위 기반 접근 제어</li>
        </ul>

        <p>
          수작업 전수조사에 의존하던 대응 과정을 취약점 수집과 SBOM 매칭 중심의
          자동화 구조로 전환했습니다. 이를 통해 새로운 취약점이 수집되면 그룹 내
          영향받는 관계사와 저장소를 즉시 확인할 수 있는 기반을 마련했습니다.
        </p>

        <p>
          또한 SBOM과 취약점 데이터를 스냅샷 및 조치 이력과 연결해, 현재의 위험
          현황뿐 아니라 특정 배포 시점의 오픈소스 구성과 과거 대응 과정까지
          추적할 수 있도록 했습니다.
        </p>
      </div>
    </section>,
  ],
  links: [],
};
