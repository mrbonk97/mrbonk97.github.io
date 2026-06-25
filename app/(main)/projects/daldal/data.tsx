import { Project } from "@/types";
import { Clock, Coffee, Database, Smartphone } from "lucide-react";
import Image from "next/image";

export const DATA: Project = {
  title: "단거주의보",
  subtitle: "카페별 음료 영양성분을 모아서 보여주는 서비스",
  banner: "/images/projects/daldal/banner.svg",
  metadata: [
    {
      name: "요약",
      content: `카페별 음료 영양성분을 모아서 보여주는 서비스`,
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
      icon: <Clock size={48} className="stroke-custom-2" />,
      name: "자동 영양성분 수집",
      description:
        "Vercel Cron을 활용해 정해진 시간마다 카페별 음료 정보를 자동으로 수집하고, 최신 영양성분 데이터를 주기적으로 갱신하도록 구성했습니다.",
    },
    {
      icon: <Coffee size={48} className="stroke-custom-2" />,
      name: "카페별 음료 데이터 크롤링",
      description:
        "Cheerio를 사용해 각 카페 공식 홈페이지의 음료명, 칼로리, 당류, 카페인 등 영양성분 정보를 파싱하고 서비스에서 활용 가능한 형태로 정리했습니다.",
    },
    {
      icon: <Database size={48} className="stroke-custom-2" />,
      name: "Supabase 기반 데이터 관리",
      description:
        "수집한 음료 영양성분 데이터를 Supabase DB에 저장하고, 카페·음료·영양성분 기준으로 조회하기 쉬운 데이터 구조를 설계했습니다.",
    },
    {
      icon: <Smartphone size={48} className="stroke-custom-2" />,
      name: "오늘 마신 음료 기록 앱",
      description:
        "Jetpack Compose 기반 안드로이드 앱을 개발하고, Room DB와 Hilt를 적용해 사용자가 오늘 마신 음료를 로컬에서 안정적으로 기록할 수 있도록 구현했습니다.",
    },
  ],

  content: [
    <>
      <header>
        <h2>고민한 부분</h2>
        <h4>웹과 모바일 앱이 함께 사용하는 영양성분 데이터 구조 설계</h4>
      </header>

      <div>
        <p>
          단거주의보는 여러 카페의 음료 영양성분을 모아서 보여주는 서비스입니다.
          따라서 단순히 데이터를 화면에 표시하는 것보다, 데이터를 어디서
          수집하고, 어떤 기준으로 정제하며, 웹과 모바일 앱이 어떤 데이터를
          신뢰하게 할 것인지가 더 중요한 문제였습니다.
        </p>

        <p>
          웹과 모바일 앱이 각각 음료 데이터를 관리하면 동일한 정보가 중복되고,
          카페별 영양성분이 변경될 때 정합성을 유지하기 어렵다고 판단했습니다.
          그래서 백엔드에서 카페별 공식 홈페이지 데이터를 수집한 뒤 Supabase에
          정제된 형태로 저장하고, 웹과 모바일 앱은 동일한 Supabase DB를 기준으로
          데이터를 조회하는 구조로 설계했습니다.
        </p>

        <Image
          src={"/images/projects/daldal/architecture.png"}
          alt="단거주의보 시스템 아키텍처"
          height={1080}
          width={1080}
        />
        <p className="text-sm! text-center text-muted-foreground">
          시스템 아키텍처
        </p>
      </div>

      <div>
        <h5>문제점</h5>

        <p>
          카페마다 공식 홈페이지의 HTML 구조, 영양성분 표기 방식, 음료 분류
          기준이 달랐습니다. 같은 영양 정보라도 어떤 곳은 표 형태로 제공하고,
          어떤 곳은 텍스트나 JSON 형식으로 제공했기 때문에 클라이언트에서 직접
          처리하기에는 데이터 형식이 불안정했습니다.
        </p>

        <p>
          또한 크롤링 기반 데이터는 외부 페이지 구조에 의존하기 때문에 언제든
          깨질 수 있습니다. 따라서 단순히 데이터를 가져오는 것보다, 브랜드별
          차이를 격리하고 실패했을 때도 전체 서비스에 영향을 주지 않는 구조가
          필요했습니다.
        </p>
      </div>
      <div>
        <h5>접근</h5>

        <p>
          크롤링 로직은 브랜드별로 분리했습니다. 특정 카페의 HTML 구조가
          변경되더라도 다른 브랜드의 수집 로직에 영향을 주지 않도록 하기
          위해서입니다. 수집된 원천 데이터는 바로 클라이언트에 노출하지 않고,
          음료명, 브랜드, 카테고리, 칼로리, 당류, 카페인 등 서비스에서 사용할
          공통 필드로 정규화한 뒤 저장했습니다.
        </p>
      </div>
      <div>
        <h5>자동화</h5>

        <p>
          데이터 갱신은 Vercel Cron을 활용해 자동화했습니다. 정해진 시간마다
          크롤링 작업을 실행하고, 새로 수집한 데이터를 공통 스키마로 변환한 뒤
          Supabase에 반영하도록 구성했습니다.
        </p>

        <p>
          크롤링 실패 가능성도 함께 고려했습니다. 특정 브랜드의 홈페이지 구조가
          변경되거나 일시적으로 데이터를 가져오지 못하더라도 전체 갱신 흐름이
          중단되지 않도록 브랜드 단위로 수집 책임을 분리했습니다.
        </p>

        <p>
          웹과 모바일 앱은 직접 크롤링하지 않고, 정제된 Supabase 데이터를
          기준으로 동작합니다. 모바일 앱에서는 Room DB와 Hilt를 적용해 사용자의
          「오늘 마신 음료」 기록을 로컬에 저장하고, 공통 음료 정보는 서버
          데이터를 기준으로 조회하도록 역할을 나눴습니다.
        </p>
      </div>
      <div>
        <h5>결과</h5>

        <p>
          결과적으로 데이터 수집 책임은 백엔드에, 공통 데이터 관리는 Supabase에,
          데이터 소비와 사용자 기록 관리는 클라이언트에 분리했습니다.
        </p>

        <p>
          이 구조를 통해 웹과 모바일 앱이 동일한 영양성분 데이터를 바라볼 수
          있게 되었고, 음료 정보가 변경되더라도 하나의 데이터 소스를 기준으로
          정합성을 유지할 수 있었습니다.
        </p>
        <p>
          또한 브랜드별 크롤링 로직을 분리해 외부 페이지 변경에 따른 영향 범위를
          줄이고, 유지보수 가능한 데이터 수집 구조를 만들었습니다.
        </p>
      </div>
    </>,
    <>
      <header>
        <h2>Next.js Parallel Route</h2>
        <h4>UX와 SEO를 함께 고려한 상세 화면 구조 설계</h4>
      </header>

      <div>
        <h5>문제점</h5>

        <p>
          음료 목록에서 특정 음료를 클릭할 때마다 상세 페이지로 이동하면, 단순
          정보 확인을 위해 페이지 depth가 하나 늘어나는 문제가 있었습니다.
        </p>

        <p>
          단거주의보의 사용자는 여러 음료의 칼로리, 당류, 카페인 정보를 빠르게
          비교해야 합니다. 그런데 매번 상세 페이지로 이동하고 다시 목록으로
          돌아오는 흐름은 탐색 맥락을 끊고, 비교 과정에서 불필요한 이동 비용을
          만든다고 판단했습니다.
        </p>
      </div>

      <div>
        <h5>접근</h5>

        <p>
          목록 맥락을 유지한 채 상세 정보를 확인할 수 있도록 Next.js의 Parallel
          Route와 Intercepting Route를 적용했습니다. 사용자가 목록에서 음료를
          클릭하면 별도 페이지로 완전히 이동하지 않고, 현재 목록 위에 상세
          정보를 모달로 표시하도록 구성했습니다.
        </p>

        <p className="mt-4 md:p-8 rounded-lg bg-secondary">
          음료 목록 → 음료 클릭 → 상세 모달 표시 → 닫으면 기존 목록 유지
        </p>

        <p>
          이 방식으로 사용자는 현재 보고 있던 목록을 벗어나지 않고 음료의
          영양성분을 확인할 수 있습니다. 특히 여러 음료를 비교할 때 상세
          페이지를 반복해서 오가는 흐름을 줄이고, 목록에서 이어지는 탐색 경험을
          유지할 수 있도록 했습니다.
        </p>
      </div>

      <div>
        <h5>한계</h5>

        <p>
          하지만 모달 중심의 상세 화면은 SEO 관점에서 한계가 있었습니다. 내부
          탐색에는 적합하지만, 검색 엔진이 음료 상세 정보를 독립적인 문서로
          인식하려면 개별 URL과 페이지 단위의 콘텐츠 구조가 필요했습니다.
        </p>

        <p>
          모달만으로 상세 정보를 제공하면 외부 링크로 직접 접근했을 때의 화면
          구조가 불명확해지고, 검색 결과에서 각 음료 상세 정보가 독립적으로
          노출되기 어렵다고 판단했습니다.
        </p>
      </div>

      <div>
        <h5>개선</h5>

        <p>
          그래서 내부 탐색과 외부 접근의 역할을 분리했습니다. 사용자가 서비스
          안에서 음료를 클릭할 때는 Intercepting Route를 통해 모달 상세 화면을
          보여주고, 검색 엔진이나 외부 링크로 직접 접근할 때는 독립 상세
          페이지를 렌더링하도록 구성했습니다.
        </p>

        <ul className="mt-4 list-disc pl-4">
          <li>내부 탐색: 목록 페이지의 맥락을 유지하는 상세 모달</li>
          <li>외부 접근 / SEO: 음료별 독립 URL을 가진 상세 페이지</li>
        </ul>

        <p>
          두 화면은 서로 다른 UX를 제공하지만, 같은 Supabase 데이터를 기준으로
          렌더링되도록 구성했습니다. 따라서 모달과 독립 페이지 간 정보 불일치를
          줄이고, 하나의 데이터 소스를 기준으로 상세 정보를 일관되게 제공할 수
          있었습니다.
        </p>
      </div>

      <div>
        <h5>결과</h5>

        <p>
          이 구조를 통해 사용자는 목록의 맥락을 유지하면서 빠르게 음료 정보를
          확인할 수 있고, 검색 엔진은 각 음료 상세 정보를 독립 페이지로 인식할
          수 있게 되었습니다.
        </p>

        <p>
          결과적으로 UX와 SEO를 하나의 화면에서 억지로 해결하지 않고, 내부
          탐색과 외부 접근의 요구사항을 분리했습니다. 이를 통해 사용성은 모달로
          개선하고, 검색 노출은 독립 상세 페이지로 보완하면서도 동일한 음료
          데이터를 기반으로 일관된 상세 정보를 제공할 수 있었습니다.
        </p>

        <Image
          src={"/images/projects/daldal/daldal-flow.png"}
          alt="단거주의보 상세 화면 흐름"
          height={1080}
          width={1080}
          className="mx-auto p-2 border rounded-lg"
        />
        <p className="text-sm! text-center text-muted-foreground">
          프로젝트 구조
        </p>
      </div>
    </>,
  ],

  links: [
    {
      isInside: false,
      name: "https://github.com/mrbonk97/litedrive",
      url: "https://github.com/mrbonk97/litedrive",
    },
    {
      isInside: false,
      name: "https://www.litedrive.app",
      url: "https://www.litedrive.app",
    },
  ],
};
