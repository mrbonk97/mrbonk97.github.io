import { DatabaseZap, FolderGit2, GitBranch, SearchCode } from "lucide-react";
import { Project } from "@/types";
import { CodeBlock } from "@/components/code-block";

export const DATA: Project = {
  title: "PMD GitHub Analyzer",
  subtitle: "GitHub 커밋 기반 Java 정적 분석기",
  banner: "/images/projects/gitpmd/banner.svg",
  metadata: [
    {
      name: "요약",
      content: `PMD를 활용해 GitHub Java 저장소를 커밋 단위로 분석하고,
        코드 품질 변화를 시간 흐름에 따라 추적할 수 있는 CLI 도구를 개발했습니다.
        반복 분석 과정에서 발생하는 clone, checkout, 디스크 I/O 비용을 줄이기 위해
        bare clone과 git worktree 기반의 분석 구조를 설계했습니다.`,
    },
    { name: "기간", content: "2025.08 ~ 2025.09" },
    { name: "인원", content: "1명" },
    { name: "역할", content: "개인 개발" },
  ],

  stacks: [
    {
      name: "PMD",
      iconUrl: "/icons/pmd.png",
    },
    {
      name: "Docker",
      iconUrl: "/icons/docker.svg",
    },
    {
      name: "Java",
      iconUrl: "/icons/java.svg",
    },
  ],

  features: [
    {
      icon: <SearchCode size={48} className="stroke-custom-2" />,
      name: "커밋 단위 정적 분석",
      description:
        "PMD를 이용해 Java 저장소의 각 커밋을 분석하고, 커밋별 정적 분석 결과를 수집하는 CLI 분석 기능을 구현했습니다.",
    },
    {
      icon: <GitBranch size={48} className="stroke-custom-2" />,
      name: "히스토리 기반 품질 변화 추적",
      description:
        "저장소의 커밋 히스토리를 순회하며 분석을 반복 수행해, 시간 흐름에 따른 코드 품질 변화를 추적할 수 있도록 설계했습니다.",
    },
    {
      icon: <DatabaseZap size={48} className="stroke-custom-2" />,
      name: "Bare Clone 기반 저장소 재사용",
      description:
        "최초 1회 bare clone으로 Git object database를 재사용해 반복적인 clone 비용과 중복 저장 비용을 줄였습니다.",
    },
    {
      icon: <FolderGit2 size={48} className="stroke-custom-2" />,
      name: "Worktree 기반 독립 분석 환경",
      description:
        "git worktree로 커밋별 작업 디렉터리를 분리해 checkout 충돌 없이 각 커밋을 독립적으로 분석할 수 있는 구조를 구현했습니다.",
    },
  ],

  content: [
    <>
      <header>
        <h2>[성능 최적화]</h2>
        <h4>반복 커밋 분석을 위한 Git 처리 구조 개선</h4>
      </header>

      <div>
        <h5>문제 상황</h5>

        <p>
          PMD GitHub Analyzer는 하나의 저장소를 현재 시점만 분석하는 도구가
          아니라, 여러 커밋을 순회하며 코드 품질 변화를 추적하는 CLI 도구입니다.
          따라서 분석 대상 커밋이 많아질수록 Git 저장소를 가져오고, 특정
          커밋으로 이동하고, 분석이 끝난 작업 디렉터리를 정리하는 과정이
          반복적으로 발생했습니다.
        </p>

        <p>
          단순하게 구현하면 커밋마다 repository를 새로 clone한 뒤 분석하고
          삭제하는 방식이 됩니다. 하지만 이 방식은 매 커밋마다 네트워크 요청,
          Git object 다운로드, 디스크 쓰기, checkout 비용이 반복되어 분석 시간이
          불필요하게 증가하는 문제가 있었습니다.
        </p>
      </div>

      <div>
        <h5>고민한 지점</h5>

        <p>
          핵심은 각 커밋의 파일 상태는 독립적으로 분석해야 하지만, Git
          object까지 매번 새로 받을 필요는 없다는 점이었습니다. 즉, 분석 단위는
          커밋별로 분리하되 저장소 데이터는 재사용하는 구조가 필요했습니다.
        </p>

        <p>
          일반적인 clone 기반 구조는 구현은 단순하지만 커밋 수가 늘어날수록
          비용이 선형적으로 증가합니다. 반대로 하나의 작업 디렉터리에서
          checkout만 반복하면 디스크 사용량은 줄일 수 있지만, 분석 도중 상태가
          섞이거나 checkout 충돌이 발생할 가능성이 있었습니다.
        </p>

        <p>
          그래서 Git object database는 하나로 공유하고, 커밋별 작업 디렉터리는
          독립적으로 분리하는 방향으로 구조를 잡았습니다.
        </p>
      </div>

      <div>
        <h5>해결 1. Bare Clone으로 Git Object 재사용</h5>

        <p>
          먼저 최초 1회만 git clone --bare를 수행해 작업 디렉터리 없이 Git
          metadata와 object database만 보관했습니다.
        </p>

        <CodeBlock code="git clone --bare <repository-url>" />

        <p>
          bare clone은 실제 소스 파일을 체크아웃하지 않고 Git object만 저장하기
          때문에, 이후 여러 커밋을 분석할 때 같은 object database를 재사용할 수
          있습니다. 이를 통해 커밋마다 저장소를 새로 clone하면서 발생하는
          네트워크 비용과 중복 저장 비용을 제거했습니다.
        </p>
      </div>

      <div>
        <h5>해결 2. Git Worktree로 커밋별 분석 환경 분리</h5>

        <p>
          각 커밋의 실제 파일 상태는 git worktree를 이용해 별도 작업 디렉터리로
          생성했습니다.
        </p>

        <CodeBlock code="git worktree add <worktree-path> <commit-hash>" />

        <p>
          PMD 분석이 끝난 뒤에는 해당 worktree를 제거해 다음 분석에 영향을 주지
          않도록 정리했습니다.
        </p>

        <CodeBlock code="git worktree remove <worktree-path>" />

        <p>
          이 구조에서는 하나의 Git object database를 공유하면서도, 각 커밋은
          독립된 작업 디렉터리에서 분석됩니다. 덕분에 커밋 간 checkout 충돌을
          피하고, 분석 중 파일 상태가 섞이는 문제를 방지할 수 있었습니다.
        </p>
      </div>

      <div>
        <h5>구조 비교</h5>

        <p>기존 방식은 커밋마다 저장소를 새로 복제하는 구조입니다.</p>

        <section className="mt-4 p-8 rounded bg-secondary">
          <p className="mt-0! text-base! font-medium">
            Commit A → clone → analyze → delete
          </p>
          <p className="text-base! font-medium">
            Commit B → clone → analyze → delete
          </p>
          <p className="text-base! font-medium">
            Commit C → clone → analyze → delete
          </p>
        </section>

        <p>
          개선 후에는 최초 1회 bare clone 이후, 커밋별 worktree만 생성하고
          제거하는 방식으로 변경했습니다.
        </p>

        <section className="mt-4 p-8 rounded bg-secondary">
          <p className="mt-0! text-base! font-medium">Initial bare clone</p>
          <p className="text-base! font-medium">↓</p>
          <p className="text-base! font-medium">
            Commit A → worktree 생성 → PMD 분석 → worktree 제거
          </p>
          <p className="text-base! font-medium">
            Commit B → worktree 생성 → PMD 분석 → worktree 제거
          </p>
          <p className="text-base! font-medium">
            Commit C → worktree 생성 → PMD 분석 → worktree 제거
          </p>
        </section>
      </div>

      <div>
        <h5>결과</h5>

        <p>
          반복 커밋 분석 과정에서 가장 큰 비용이었던 clone, checkout, 디스크 I/O
          흐름을 줄일 수 있었습니다. 분석 대상 커밋이 늘어나도 저장소를 매번
          새로 복제하지 않고, Git object를 재사용하면서 필요한 커밋 상태만
          worktree로 분리해 분석하는 구조를 확보했습니다.
        </p>

        <p>
          이 경험을 통해 정적 분석 도구를 만들 때 분석 로직 자체만큼이나, 분석
          대상 소스코드를 어떻게 준비하고 격리할 것인지가 전체 성능과 안정성에
          큰 영향을 준다는 점을 체감했습니다.
        </p>
      </div>
    </>,
  ],

  links: [
    {
      isInside: false,
      name: "GitHub Repository",
      url: "https://github.com/mrbonk97/pmd-github-analyzer",
    },
  ],
};
