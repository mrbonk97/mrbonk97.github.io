import { CodeBlock } from "@/components/util-component/code-block";
import { HighLight } from "@/components/util-component/high-light";
import { Project } from "@/types";
import { Clock, Coffee, Database, Smartphone } from "lucide-react";
import Image from "next/image";

export const DATA: Project = {
  id: "daldal",
  title: "단거주의보",
  summary:
    "카페별 음료 영양성분을 수집해 보여주고, 웹과 모바일 앱에서 음료 정보와 섭취 기록을 확인할 수 있는 서비스입니다.",
  banner: "/images/projects/daldal/banner.svg",
  metadata: [
    {
      name: "요약",
      content: `카페별 음료 영양성분을 수집해 보여주고, 웹과 모바일 앱에서 음료 정보와 섭취 기록을 확인할 수 있는 서비스입니다.`,
    },
    { name: "기간", content: "2025.06 ~ 2026.02" },
    { name: "인원", content: "1명" },
    { name: "역할", content: "풀스택 개발" },
  ],

  stacks: [
    {
      name: "Jetpack Compose",
      iconUrl: "/icons/android-head_flat.svg",
    },
    {
      name: "Next.js",
      iconUrl: "/icons/next.svg",
    },
    {
      name: "Supabase",
      iconUrl: "/icons/supabase.svg",
    },
    {
      name: "Cheerio",
      iconUrl: "/icons/cheerio.svg",
    },
  ],

  features: [
    {
      icon: <Clock size={32} className="stroke-custom-2" />,
      name: "자동 영양성분 수집",
      description:
        "Vercel Cron을 활용해 정해진 시간마다 카페별 음료 정보를 자동으로 수집하고, 최신 영양성분 데이터를 주기적으로 갱신하도록 구성했습니다.",
    },
    {
      icon: <Coffee size={32} className="stroke-custom-2" />,
      name: "카페별 음료 데이터 크롤링",
      description:
        "Cheerio를 사용해 각 카페 공식 홈페이지의 음료명, 칼로리, 당류, 카페인 등 영양성분 정보를 파싱하고 서비스에서 활용 가능한 형태로 정리했습니다.",
    },
    {
      icon: <Database size={32} className="stroke-custom-2" />,
      name: "Supabase 기반 데이터 관리",
      description:
        "수집한 음료 영양성분 데이터를 Supabase DB에 저장하고, 카페·음료·영양성분 기준으로 조회하기 쉬운 데이터 구조를 설계했습니다.",
    },
    {
      icon: <Smartphone size={32} className="stroke-custom-2" />,
      name: "오늘 마신 음료 기록 앱",
      description:
        "Jetpack Compose 기반 안드로이드 앱을 개발하고, Room DB와 Hilt를 적용해 사용자가 오늘 마신 음료를 로컬에서 안정적으로 기록할 수 있도록 구현했습니다.",
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
        <h4>UX와 SEO를 고려한 설계</h4>
        <h2>Next.js Parallel Route를 활용한 상세 화면 설계</h2>
        <p className="mt-4 md:mt-8">
          단거주의보에서는 사용자가 여러 음료의 칼로리, 당류, 카페인 정보를
          연속해서 비교합니다.
        </p>
        <p>
          하지만 음료를 선택할 때마다 독립 상세 페이지로 전환하면 목록과 상세
          화면을 반복해서 오가야 했고, 사용자가 확인하던 목록의 맥락도 쉽게
          끊겼습니다.
        </p>
      </header>
      <div>
        <h5>문제점</h5>
        <p>
          음료별 독립 상세 페이지는 고유 URL을 제공할 수 있어 외부 공유와 검색
          엔진의 개별 콘텐츠 접근에 유리합니다. 반면 서비스 내부에서는 여러
          음료를 빠르게 비교해야 하므로, 매번 전체 상세 페이지로 이동하는 방식이
          탐색 흐름에 적합하지 않았습니다.
        </p>

        <p>따라서 상세 화면은 다음 두 가지 조건을 모두 충족해야 했습니다.</p>

        <ul>
          <li>목록의 위치와 탐색 맥락을 유지한 채 상세 정보를 확인할 것</li>
          <li>외부에서는 음료별 고유 URL로 상세 페이지에 접근할 수 있을 것</li>
        </ul>
      </div>
      <div>
        <h5>접근</h5>

        <p>
          Next.js App Router의 Parallel Route와 Intercepting Route를 조합해,
          동일한 상세 URL을 접근 방식에 따라 모달 또는 독립 페이지로
          렌더링했습니다.
        </p>

        <p>
          음료 목록이 렌더링되는 <HighLight>/drinks</HighLight> 경로에{" "}
          <HighLight>@modal</HighLight>
          슬롯을 추가하고, 목록에서 <HighLight>/drinks/[id]</HighLight>로 이동할
          때<HighLight>(.)[id]</HighLight> 경로가 상세 페이지를 인터셉트하도록
          구성했습니다. 이를 통해 URL은 상세 경로로 변경되지만, 화면에서는 기존
          목록 위에 상세 모달이 표시됩니다.
        </p>

        <CodeBlock
          code={`app/drinks/
├── page.tsx
│
├── [id]/
│   └── page.tsx
│       # /drinks/[id] 독립 상세 페이지
│
└── @modal/
    ├── default.tsx
    │   # 모달이 활성화되지 않은 경우 null 반환
    │
    └── (.)[id]/
        └── page.tsx
            # 목록에서 이동한 경우 상세 정보를 모달로 렌더링`}
        />

        <p>
          <HighLight>drinks/layout.tsx</HighLight>에서는 목록에 해당하는
          <HighLight>children</HighLight>과 모달 슬롯인
          <HighLight>modal</HighLight>을 함께 렌더링했습니다. 따라서 상세 모달이
          열려도 목록 컴포넌트가 교체되지 않고 기존 화면 뒤에 유지됩니다.
        </p>

        <p>
          모달을 닫을 때는 <HighLight>router.back()</HighLight>으로 이전 URL로
          이동시켜, 사용자가 상세 정보를 열기 전의 목록 화면으로 자연스럽게
          복귀하도록 처리했습니다.
        </p>
      </div>
      <div>
        <h5>직접 접근 처리</h5>

        <p>
          같은 <HighLight>/drinks/[id]</HighLight> URL이라도 외부 링크로 직접
          접속하거나 페이지를 새로고침한 경우에는 Intercepting Route가 적용되지
          않습니다. 이때는 <HighLight>[id]/page.tsx</HighLight>가 전체 상세
          페이지를 렌더링합니다.
        </p>

        <ul>
          <li>목록에서 이동: 기존 목록 위에 상세 모달 표시</li>
          <li>URL 직접 접근 및 새로고침: 독립된 상세 페이지 표시</li>
        </ul>

        <p>
          두 화면은 동일한 음료 데이터를 사용하도록 구성해 표시 방식이 달라도
          콘텐츠가 일관되게 유지되도록 했습니다. 이를 통해 서비스 내부에서는
          빠른 비교 경험을 제공하면서, 외부에서는 음료별 고유 URL로 상세 정보에
          접근할 수 있도록 했습니다.
        </p>
      </div>
      <div>
        <h5>결과</h5>

        <p>
          서비스 내부에서는 목록의 맥락을 유지해 음료 비교에 필요한 이동을
          줄였습니다. 외부에서는 각 음료의 고유 URL을 통해 상세 정보를 바로
          확인할 수 있도록 했습니다.
        </p>

        <p>
          결과적으로 상세 화면을 하나의 방식으로 고정하지 않고, 사용자의 접근
          경로에 따라 모달과 독립 페이지를 선택적으로 제공하는 라우팅 구조를
          구현했습니다.
        </p>

        <p>
          하나의 상세 URL을 유지하면서도 접근 경로에 따라 모달과 독립 페이지를
          선택적으로 제공하는 구조를 구현했습니다.
        </p>

        <figure className="mt-16">
          <Image
            src="/images/projects/daldal/daldal-flow.png"
            alt="단거주의보 상세 화면 흐름"
            height={1080}
            width={1080}
            className="mx-auto p-1 rounded border"
          />

          <figcaption className="mt-4 text-center text-sm text-muted-foreground">
            상세 화면 라우팅 흐름
          </figcaption>
        </figure>
      </div>
    </section>,
    ,
  ],

  links: [
    {
      isInside: false,
      name: "https://daldal.app",
      url: "https://daldal.app",
    },
  ],
};
