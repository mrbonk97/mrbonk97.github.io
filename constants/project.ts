import { Project } from "@/types";

export const DEV_PROJECT: Project[] = [
  {
    url: "1qcatch",
    title: "악성메일 모의훈련 솔루션",
    titleEng: "1QONCATCH",
    imgUrl: "/images/project/1qcatch/banner.png",
    summary:
      "악성메일 훈련을 실제처럼 구현하고, 기획부터 결과 분석까지 하나의 흐름으로 연결되도록 직접 개발한 보안 훈련 플랫폼입니다. 이번 프로젝트에서는 프론트엔드 전반을 담당했으며, 회원가입부터 사용자 관리, 운영 대시보드, 메일 작성 및 훈련 실행까지 주요 기능을 모두 직접 설계하고 구현했습니다.",
  },
  {
    url: "litedrive",
    title: "파일 공유 서비스",
    titleEng: "Litedrive",
    imgUrl: "/images/project/litedrive/banner.png",
    summary: `공용 PC에서 파일 하나 공유하려고 로그인하고, 인증까지 거치는 과정은 꽤 번거롭습니다.

    Litedrive는 이런 불편함을 줄이기 위해, 계정 없이도 최소한의 인증만으로 파일 업로드와 공유가 가능하도록 만든 서비스입니다. URL 구조도 단순하게 가져가서, 누구나 바로 접근할 수 있게 했습니다.

    또한 대용량 업로드 과정에서 발생하는 실패 케이스(네트워크 끊김, 업로드 중단 등)와 자원 소모 공격까지 고려해, 실제 서비스 환경에서도 안정적으로 동작하도록 설계했습니다.`,
  },
  {
    url: "erp",
    title: "한국수력원자력 ERP 고도화 프로젝트",
    titleEng: "ERP",
    imgUrl: "/images/project/erp/banner.png",
    summary: `5개 컨소시엄과 110명 이상이 참여한 대규모 고도화 프로젝트에 개발자로 참여했습니다. 약 1년 2개월 동안 프로젝트 전반에 걸쳐 BSC 성과지표 기반 업무 시스템 고도화 개발을 수행했으며, 동시에 전체 공정 관리에도 직접 참여했습니다.

    특히 BSC 성과지표 영역 중 설문조사 및 전자공청회 기능을 직접 개발했고, Oracle 메타데이터를 기반으로 Job과 Procedure 간 선후 관계를 분석하며 시스템 구조를 파악했습니다. 기존 문서가 상당 부분 유실된 상태에서 소스와 데이터 흐름을 직접 분석해 기능을 구현해야 했기 때문에 난이도가 높은 환경이었지만, 그만큼 실질적인 문제 해결 경험과 시스템 이해도를 크게 높일 수 있었습니다.`,
  },
  {
    url: "gitpmd",
    title: "Github 커밋 정적 분석기",
    titleEng: "PMD GitHub Analyzer",
    imgUrl: "/images/project/gitpmd/banner.png",
    summary: `PMD를 활용해 GitHub Java 저장소를 커밋 단위로 분석하고, 코드 품질 변화를 시간 흐름으로 추적하는 CLI 도구를 개발했습니다.
    
    기존 정적 분석 도구는 특정 시점의 코드 상태만 분석합니다. 이 프로젝트는 저장소의 전체 커밋 히스토리를 기준으로 분석을 반복 수행해, 코드 품질이 어떻게 변해왔는지를 확인할 수 있도록 설계했습니다.`,
  },
];

export const SECURITY_PROJECT = [
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
