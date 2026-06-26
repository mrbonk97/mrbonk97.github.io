import { ProjectPreview, SecurityProject } from "@/types";

export const ROUTES = [
  {
    url: "/projects",
    name: "프로젝트",
  },
  {
    url: "/blog",
    name: "블로그",
  },
  {
    url: "about-me",
    name: "소개",
  },
];

export const BLOG_CATEGORY = [
  {
    tags: "dev",
    name: "개발",
  },
  {
    tags: "sec",
    name: "보안",
  },
];

export const PROJECT_PREVIEWS: ProjectPreview[] = [
  {
    id: "daldal",
    title: "단거주의보",
    summary:
      "카페별 음료 영양성분을 수집해 보여주고, 웹과 모바일 앱에서 음료 정보와 섭취 기록을 확인할 수 있는 서비스입니다.",
    tags: ["fullstack"],
    stacks: ["Next.js", "Jetpack Compose", "Supabase", "Cheerio"],
    banner: "/images/projects/daldal/banner.svg",
    backgroundImg: "/images/pattern/pattern-01.svg",
  },
  {
    id: "1qoncatch",
    title: "악성메일 모의훈련 솔루션",
    summary:
      "피싱 메일 훈련 운영부터 대상자 관리, 현황 대시보드, 결과 보고서 생성까지 지원하는 보안 인식 훈련 플랫폼입니다.",
    tags: ["frontend"],
    stacks: ["Next.js", "TanStack Query", "TinyMCE", "xlwings"],
    banner: "/images/projects/1qcatch/banner.png",
    backgroundImg: "/images/pattern/pattern-02.png",
  },
  {
    id: "litedrive",
    title: "Litedrive",
    summary:
      "최소 인증으로 파일을 업로드·공유하고, Edge 단계에서 업로드 검증과 용량 제한을 처리하는 파일 공유 서비스입니다.",
    tags: ["fullstack"],
    stacks: ["Next.js", "TanStack Query", "Cloudflare Worker", "Cloudflare R2"],
    banner: "/images/projects/litedrive/banner.png",
    backgroundImg: "/images/pattern/pattern-03.svg",
  },
  {
    id: "erp",
    title: "한수원 ERP 고도화",
    summary:
      "레거시 ERP 환경에서 BSC 성과지표의 설문조사·전자공청회 기능을 개발하고, 기존 업무 흐름과 데이터 구조를 분석한 프로젝트입니다.",
    tags: ["fullstack"],
    stacks: ["Nexacro", "XUp", "Oracle"],
    banner: "/images/projects/erp/banner.png",
    backgroundImg: "/images/pattern/pattern-01.svg",
  },
  {
    id: "gitpmd",
    title: "PMD GitHub Analyzer",
    summary:
      "PMD로 Java 저장소의 커밋별 코드 품질 변화를 분석하고, bare clone과 git worktree로 반복 분석 비용을 줄인 CLI 도구입니다.",
    tags: ["backend"],
    stacks: ["PMD", "Docker", "Java"],
    banner: "/images/projects/gitpmd/banner.svg",
    backgroundImg: "/images/pattern/pattern-02.png",
  },
];

export const SECURITY_PROJECTS: SecurityProject[] = [
  {
    title: "하나카드 자동차 담보대출 구축 앱 점검",
    company: "하나카드",
    duration: "2026.04 - 2026.04",
  },
  {
    title: "글로벌솔루션셀, Web3팀, DTUniv 웹 점검",
    company: "하나금융TI",
    duration: "2026.03 - 2026.04",
  },
  {
    title: "하나금융파인드 웹 점검",
    company: "파인드",
    duration: "2026.03 - 2026.04",
  },
  {
    title: "전자문서센터 픽스톡 앱 취약점 점검",
    company: "하나금융TI",
    duration: "2026.03 - 2026.03",
  },
  {
    title: "하나카드 API 플랫폼 구축사업 인프라 점검",
    company: "하나카드",
    duration: "2026.02 - 2026.02",
  },
  {
    title: "하나카드 FDS 시스템 인프라 개선 점검",
    company: "하나카드",
    duration: "2025.12 - 2026.01",
  },
  {
    title: "나라사랑카드 연계 금융업무 대응개발 모바일 점검",
    company: "하나카드",
    duration: "2025.12 - 2025.12",
  },
  {
    title: "전자문서센터 공개용 웹 취약점 점검",
    company: "하나금융TI",
    duration: "2025.12 - 2025.12",
  },
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
