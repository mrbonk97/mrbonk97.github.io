import {
  Bike,
  Binary,
  Brackets,
  Cake,
  CalendarDays,
  HardDrive,
  Laptop,
} from "lucide-react";

export const PROGRAMMING_PROJECT = [
  {
    id: "litedrive",
    icon: <HardDrive size={96} />,
    title: "LiteDrive",
    description:
      "불필요한 기능을 모두 덜어내고, 파일 공유에 필요한 핵심만 담아 빠르고 간단하게 사용할 수 있도록 설계한 미니멀 파일 공유 플랫폼",
    duration: "2025.07 - 유지보수",
    role: "풀스택 개발",
    stack: "Next.js",
    images: [
      "/images/projects/litedrive/litedrive-1.png",
      "/images/projects/litedrive/litedrive-2.png",
      "/images/projects/litedrive/litedrive-3.png",
      "/images/projects/litedrive/litedrive-4.png",
      "/images/projects/litedrive/litedrive-5.png",
      "/images/projects/litedrive/litedrive-6.png",
      "/images/projects/litedrive/litedrive-7.png",
    ],
    links: [
      {
        name: "깃허브",
        url: "https://github.com/mrbonk97/litedrive",
      },
      {
        name: "웹사이트",
        url: "https://litedrive.app",
      },
    ],
  },
  {
    id: "ym-picker",
    icon: <CalendarDays size={96} />,
    title: "Year Month Picker",
    description:
      "연·월 단위 날짜 선택에 최적화된 React UI 컴포넌트 라이브러리로, 간단한 API와 일관된 인터랙션을 제공하도록 설계된 날짜 선택 도구",
    duration: "2024.07 - 유지보수",
    role: "라이브러리 개발",
    stack: "tsup, emotion.js",
    images: [
      "/images/projects/ym-picker/ym-picker-1.png",
      "/images/projects/ym-picker/ym-picker-2.png",
      "/images/projects/ym-picker/ym-picker-3.png",
      "/images/projects/ym-picker/ym-picker-4.png",
      "/images/projects/ym-picker/ym-picker-5.png",
    ],
    links: [
      {
        name: "npm",
        url: "https://www.npmjs.com/package/year-month-picker",
      },
      {
        name: "깃허브",
        url: "https://github.com/mrbonk97/year-month-picker",
      },
      {
        name: "데모",
        url: "https://year-month-picker.vercel.app",
      },
    ],
  },

  {
    id: "daldal",
    icon: <Cake size={96} />,
    title: "단거주의보",
    description:
      "카페 음료의 당 함량을 브랜드별로 비교하고, 사용자에게 음료 선택의 기준을 제공하는 설탕량 안내 플랫폼",
    duration: "2025.07 - 유지보수",
    role: "풀스택 개발",
    stack: "Next.js, cheerio",
    images: [
      "/images/projects/daldal/daldal-1.png",
      "/images/projects/daldal/daldal-2.png",
      "/images/projects/daldal/daldal-3.png",
      "/images/projects/daldal/daldal-4.png",
      "/images/projects/daldal/daldal-5.png",
    ],
    links: [
      {
        name: "깃허브",
        url: "https://github.com/mrbonk97/sweet-alert",
      },
      {
        name: "웹사이트",
        url: "https://daldal.app",
      },
    ],
  },
  {
    id: "repo-pmd",
    icon: <Brackets size={96} />,
    title: "Repository 정적 분석 툴",
    description:
      "PMD 엔진을 기반으로 레포지토리 내 코드를 자동 분석하여 잠재적인 버그, 규칙 위반을 탐지하고 품질 개선을 지원하는 정적 분석 도구",
    duration: "2025.08 - 2205.08",
    role: "솔루션 개발",
    stack: "Java, PMD",
    images: ["/images/projects/pmd/pmd-1.png"],
    links: [
      {
        name: "깃허브",
        url: "https://github.com/mrbonk97/pmd-github-analyzer",
      },
    ],
  },
  {
    id: "erp",
    icon: <Laptop size={96} />,
    title: "한국수력원자력 ERP 고도화 프로젝트",
    description:
      "한국수력원자력의 기존 ERP 시스템을 Nexacro 및 xUP 기반으로 재구축하는 고도화 프로젝트로, 노후화된 레거시 환경 개선과 업무 효율성 향상을 목표로 진행된 시스템 현대화 작업",
    duration: "2022.12 - 2024.02",
    role: "BSC 성과지표 시스템 개발",
    stack: ["Nexacro"],
    images: [],
    links: [],
  },
  {
    id: "hana-apt",
    icon: <Binary size={96} />,
    title: "악성메일 모의훈련 솔루션",
    description:
      "피싱 메일 공격 시나리오를 기반으로 사용자 반응을 모의 훈련하고, 보안 인식 수준을 측정·관리하는 악성메일 모의훈련 플랫폼",
    duration: "2025.08 - 진행중",
    role: "프론트엔드 개발",
    stack: "Next.js",
    images: [],
    links: [],
  },
];

export const SECURITY_PROJECT = [
  {
    title: "핀크 앱 취약점 점검",
    company: "핀크",
    duration: "2025.11 - 2025.11",
  },
  {
    title: "AI챗봇 서비스 개발 웹 점검",
    company: "하나금융TI",
    duration: "2025.09 - 2025.10",
  },
  {
    title: "하나ON 메신저 시스템 DR 구축 인프라 점검",
    company: "하나금융TI",
    duration: "2025.09 - 2025.10",
  },
  {
    title: "전자문서센터 주요서비스 비상시스템 인프라 점검",
    company: "하나금융TI",
    duration: "2025.09 - 2025.09",
  },
  {
    title: "클라우드 운영관리 전용 노드 구축 인프라 점검",
    company: "하나금융TI",
    duration: "2025.09 - 2025.09",
  },
  {
    title: "하나캐피탈 모바일 신분증 인증 웹/앱 점검",
    company: "하나캐피탈",
    duration: "2025.09 - 2025.09",
  },
  {
    title: "전자문서센터 중계시스템 인프라 점검",
    company: "하나금융TI",
    duration: "2025.09 - 2025.09",
  },
  {
    title: "그룹리스크관리시스템 리빌드 인프라 점검",
    company: "하나금융TI",
    duration: "2025.09 - 2025.09",
  },
  {
    title: "지주 우리사주조합관리시스템 웹 점검",
    company: "하나금융지주",
    duration: "2025.08 - 2025.08",
  },
  {
    title: "전자문서센터 웹 점검",
    company: "하나금융TI",
    duration: "2025.08 - 2025.08",
  },
  {
    title: "하나카드 마이데이터 2.0 인프라 점검",
    company: "하나카드",
    duration: "2025.08 - 2025.08",
  },
  {
    title: "하나대체투자자산운용 인프라 웹 점검",
    company: "하나대체투자자산운용",
    duration: "2025.07 - 2025.07",
  },
  {
    title: "하나자산신탁 웹 점검",
    company: "하나자산신탁",
    duration: "2025.07 - 2025.07",
  },
  {
    title: "IDC운영셀 인프라 점검",
    company: "하나금융TI",
    duration: "2025.06 - 2025.08",
  },
  {
    title: "하나펀드서비스 인프라 점검",
    company: "하나펀드서비스",
    duration: "2025.06 - 2025.06",
  },
  {
    title: "그룹 RPA 포탈 웹 점검",
    company: "하나금융TI",
    duration: "2025.06 - 2025.06",
  },
  {
    title: "TI 상반기 공개용 웹 취약점 점검",
    company: "하나금융TI",
    duration: "2025.05 -2025.05",
  },
  {
    title: "통합모니터링 솔루션 공동개발 고도화 소스코드 점검",
    company: "하나금융TI",
    duration: "2025.05 -2025.05",
  },
  {
    title: "통합모니터링 솔루션 공동개발 고도화 웹 점검",
    company: "하나금융TI",
    duration: "2025.05 -2025.05",
  },
  {
    title: "하나벤처스 웹 점검",
    company: "하나벤처스",
    duration: "2025.05 -2025.05",
  },
  {
    title: "그룹 스마트워크 시스템 웹 점검",
    company: "하나금융TI",
    duration: "2025.04 - 2025.05",
  },
  {
    title: "하나손해보험 인프라 점검",
    company: "하나손해보험",
    duration: "2025.04 - 2025.05",
  },
  {
    title: "하나머니 채널 마케팅 리빌드 웹 점검",
    company: "하나카드",
    duration: "2025.04 - 2025.04",
  },
  {
    title: "하나금융허브 재구축 인프라 취약점 점검",
    company: "하나금융지주",
    duration: "2025.03 - 2025.03",
  },
  {
    title: "하나생명 2025 상반기 웹 점검",
    company: "하나생명",
    duration: "2025.03 - 2025.03",
  },
  {
    title: "2024년 하반기 인프라 취약점 점검",
    company: "하나금융TI",
    duration: "2025.02 - 2025.02",
  },
  {
    title: "RPA 솔루션 구축사업 웹 점검",
    company: "하나금융TI",
    duration: "2025.02 - 2025.02",
  },
];

export const JOB_EXPERIENCE = [
  {
    company: "하나금융TI",
    duration: "2024.11 - 재직중",
    department: "정보보호센터 / 사원",
    role: "보안 솔루션 개발 & 보안 취약점 점검",
    logo: "/icons/hana.svsize={96}g",
  },
  {
    company: "",
    duration: "",
    department: "",
    role: "",
    logo: null,
  },
  {
    company: "한전KDN",
    duration: "2022.12 - 2024.02",
    department: "원전ERP고도화TF / 사원",
    role: "한수원 ERP 시스템 고도화 프로젝트",
    logo: "/icons/kdn.svsize={96}g",
  },
];
