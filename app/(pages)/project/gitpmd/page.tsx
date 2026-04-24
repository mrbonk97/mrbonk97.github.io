import { LinkSection } from "@/components/project/link-section";
import { HeaderSection } from "@/components/project/header-section";
import { TitleSection } from "@/components/project/title-section";
import { StackSection } from "@/components/project/stack-section";
import { GitBranch } from "lucide-react";
import { Badge } from "@/components/ui/badge";

function ProjectPage_GITPMD() {
  return (
    <main className="pt-20 p-4 mx-auto max-w-5xl leading-relaxed whitespace-pre-line">
      <HeaderSection
        title="Github 커밋 정적 분석기"
        titleEng="PMD GitHub Analyzer"
        imgUrl="/images/project/gitpmd/banner.png"
      />

      <section className="mt-16 md:mt-32">
        <TitleSection eyebrow="OVERVIEW" title="프로젝트 소개" />
        <p className="mt-4 md:mt-8">
          PMD를 활용해 GitHub Java 저장소를 커밋 단위로 분석하고, 코드 품질
          변화를 시간 흐름으로 추적하는 CLI 도구를 개발했습니다.
          <br />
          <br />
          기존 정적 분석 도구는 특정 시점의 코드 상태만 분석합니다. 이
          프로젝트는 저장소의 전체 커밋 히스토리를 기준으로 분석을 반복 수행해,
          코드 품질이 어떻게 변해왔는지를 확인할 수 있도록 설계했습니다.
        </p>
      </section>

      <section className="mt-32">
        <TitleSection eyebrow="WHY" title="왜 개발하게 되었는지" />
        <h5 className="mt-8 text-lg md:text-2xl font-semibold">문제 인식</h5>
        <p className="mt-4">
          일반적인 코드 분석 도구는 지금 현재 코드 상태만 기준으로 결과를
          보여줍니다. 그래서 시간이 지나면서 코드가 좋아졌는지 나빠졌는지 흐름을
          파악하기에는 한계가 있습니다.
          <br />
          <br />
          예를 들어, 리팩터링을 한 뒤에 정말 코드가 더 좋아졌는지, 어느 시점부터
          문제가 될 만한 코드가 늘어나기 시작했는지, 또는 나중에 고치기 어려운
          문제가 언제부터 쌓이기 시작했는지를 보려면 단순히 한 시점의 결과만
          가지고는 충분히 알기 어렵습니다.
        </p>

        <h5 className="mt-16 text-lg md:text-2xl font-semibold">해결 방향</h5>
        <p className="mt-4">
          Git 커밋 단위로 정적 분석을 반복 실행하고, 결과를 시계열 데이터로
          누적하는 구조를 만들었습니다. 그 결과, 코드 품질을 단순 상태가 아니라
          “언제 나빠졌고, 언제 개선됐는지” 흐름으로 볼 수 있게 했습니다.
        </p>
      </section>

      <section className="mt-32">
        <TitleSection eyebrow="TECH STACK" title="프로젝트에 사용한 기술" />
        <StackSection
          stack={[
            {
              title: "PMD",
              icon: "/icons/pmd.png",
            },
            {
              title: "Docker",
              icon: "/icons/docker.svg",
            },
            {
              title: "Java",
              icon: "/icons/cloudflare.svg",
            },
          ]}
        />
      </section>

      <section className="mt-32">
        <TitleSection eyebrow="DEEP DIVE" title="성능 개선을 위한 설계" />

        <h5 className="mt-8 text-lg md:text-2xl font-semibold">
          bare clone 기반 Repository 처리
        </h5>
        <p className="mt-4">
          본 프로젝트에서는 반복적인 커밋 분석 과정에서 발생할 수 있는 비용을
          줄이기 위해, <Badge variant={"secondary"}>git clone --bare</Badge>{" "}
          방식을 활용하였습니다. 이를 통해 Git의 object database를 단일
          저장소에서 재사용할 수 있도록 하였으며, 불필요한 작업 디렉터리 생성
          비용을 줄일 수 있었습니다. 또한,{" "}
          <Badge variant={"secondary"}>git worktree</Badge>를 활용하여 각 커밋을
          독립적인 작업 디렉터리로 분리하였습니다. 이 방식은 커밋 간의 충돌 없이
          분석 환경을 명확하게 유지할 수 있도록 하며, 반복적인 checkout 비용을
          줄이는 데에도 도움이 되었습니다.
        </p>

        <h5 className="mt-16 text-lg md:text-2xl font-semibold">
          clone 최소화 전략
        </h5>
        <p className="mt-4">
          커밋마다 저장소를 새로 clone하는 대신, 초기 1회 clone 이후 worktree를
          생성하고 제거하는 방식을 채택하였습니다. 이를 통해 네트워크 비용을
          제거하고 디스크 I/O를 최소화함으로써 전체 분석 성능을 개선할 수
          있었습니다.
        </p>

        <h5 className="mt-16 text-lg md:text-2xl font-semibold">
          PMD 멀티스레드 + Cache 활용
        </h5>
        <p className="mt-4">
          정적 분석 도구로는 PMD를 사용하였으며, 멀티스레드 옵션을 활용하여 CPU
          코어 수에 맞는 병렬 처리를 수행하도록 구성하였습니다. 이를 통해 대규모
          코드베이스에 대한 분석 시간을 단축할 수 있었습니다. 또한 PMD의 분석
          캐시 기능을 적용하여 일부 반복 연산을 줄이고자 하였습니다. 다만,
          커밋마다 분석 대상 경로가 달라지는 구조적 특성상 캐시의 활용 효과는
          제한적이었으며, 주요 성능 개선은 Git 처리 전략과 병렬 처리에서
          이루어졌습니다.
        </p>
      </section>

      <section className="mt-32">
        <TitleSection eyebrow="Trouble Shooting" title="Docker를 도입한 이유" />
        <p className="mt-8">
          Git checkout, PMD 실행, 멀티스레드 처리 등 여러 요소가 얽혀 있어 실행
          환경에 따라 결과가 달라지는 문제가 있었습니다. 특히 로컬 설정
          차이(Java 버전, 스레드 설정 등)로 인해 분석 결과가 일관되지
          않았습니다.
        </p>
        <p className="mt-8">
          해결을 위해 저는 Docker로 실행 환경을 컨테이너 단위로 고정했습니다.
          Git, PMD, 실행 설정을 이미지에 포함시키고, Docker Compose로 전체 실행
          과정을 하나로 묶었습니다. 그 결과, 환경에 관계없이 동일한 분석 결과를
          보장할 수 있게 됐고, 실행 과정도 단순화할 수 있었습니다.
        </p>
      </section>

      <section className="my-32">
        <TitleSection eyebrow="LINK" title="프로젝트 링크" />
        <p className="mt-4 text-muted-foreground">
          소스코드와 실제 서비스 링크를 통해 구현 결과를 직접 확인할 수 있도록
          연결했습니다.
        </p>
        <LinkSection
          links={[
            {
              icon: <GitBranch />,
              url: "https://github.com/mrbonk97/pmd-github-analyzer",
            },
          ]}
        />
      </section>
    </main>
  );
}

export default ProjectPage_GITPMD;
