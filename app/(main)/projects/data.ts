import { ProjectPreview, SecurityProject } from "@/types";
import { DATA as Qoncatch } from "./1qoncatch/data";
import { DATA as Erp } from "./erp/data";
import { DATA as Daldal } from "./daldal/data";
import { DATA as Gitpmd } from "./gitpmd/data";
import { DATA as Litedrive } from "./litedrive/data";
import { DATA as OSS } from "./oss-management/data";

export const DEV_PROJECTS: ProjectPreview[] = [
  Qoncatch,
  Litedrive,
  OSS,
  Erp,
  Daldal,
  Gitpmd,
].map(({ id, title, summary, banner, stacks }) => ({
  id,
  title,
  summary,
  banner,
  stacks,
}));

export const SECURITY_PROJECTS: SecurityProject[] = [
  {
    title: "하나자산신탁 AML, ERP 소스코드 취약점 점검",
    company: "하나자산신탁",
    duration: "2026.07 - 2026.07",
  },
  {
    title: "하나펀드서비스 인프라 취약점 점검",
    company: "하나펀드서비스",
    duration: "2026.06 - 2026.07",
  },
  {
    title: "하나카드 스마트창구 구축 소스코드 점검",
    company: "하나카드",
    duration: "2026.06 - 2026.06",
  },
  {
    title: "하나벤처스 웹 취약점 점검",
    company: "하나벤처스",
    duration: "2026.05 - 2026.05",
  },
  {
    title: "하나대체투자자산운용 인프라 취약점 점검",
    company: "하나대체투자자산운용",
    duration: "2026.05 - 2026.05",
  },
  {
    title: "하나캐피탈 AI챗봇 웹/앱 점검",
    company: "하나캐피탈",
    duration: "2026.04 - 2026.05",
  },
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
