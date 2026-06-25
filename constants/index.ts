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
    tag: "dev",
    name: "개발",
  },
  {
    tag: "sec",
    name: "보안",
  },
];

export const DEV_PROJECTS: ProjectPreview[] = [
  {
    id: "1qoncatch",
    title: "악성메일 모의훈련 플랫폼",
    banner: "/images/projects/1qcatch/banner.png",
  },
  {
    id: "litedrive",
    title: "Litedrive",
    banner: "/images/projects/litedrive/banner.png",
  },
  {
    id: "erp",
    title: "ERP 고도화 프로젝트",
    banner: "/images/projects/erp/banner.png",
  },
  {
    id: "gitpmd",
    title: "PMD GitHub Analyzer",
    banner: "/images/projects/gitpmd/banner.svg",
  },
  {
    id: "daldal",
    title: "단거주의보",
    banner: "/images/projects/daldal/banner.svg",
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
