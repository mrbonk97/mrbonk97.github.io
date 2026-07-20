import { DatabaseZap, FolderGit2, GitBranch, SearchCode } from "lucide-react";
import { Project } from "@/types";
import { CodeBlock } from "@/components/util-component/code-block";
import { HighLight } from "@/components/util-component/high-light";

export const DATA: Project = {
  id: "gitpmd",
  title: "PMD GitHub Analyzer",
  summary:
    "PMD로 Java 저장소의 커밋별 코드 품질 변화를 분석하고, bare clone과 git worktree로 반복 분석 비용을 줄인 CLI 도구입니다.",
  banner: "/images/projects/gitpmd/banner.png",
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
        <h4>성능 최적화</h4>
        <h2>Bare Clone과 Git Worktree를 활용한 반복 커밋 분석 구조</h2>

        <p className="mt-4 p-4 md:p-8 text-lg rounded bg-custom-2 text-custom-4">
          저장소는 한 번만 복제하고 Git object를 재사용해, 커밋마다 발생하던
          네트워크 요청과 저장소 중복 복제 비용을 제거했습니다.
        </p>
      </header>

      <div>
        <h5>1. 문제 상황</h5>

        <p>
          PMD GitHub Analyzer는 저장소의 현재 코드만 검사하는 도구가 아니라,
          여러 커밋을 순회하며 코드 품질 지표의 변화를 추적하는 CLI 도구입니다.
        </p>

        <p>
          따라서 커밋마다 해당 시점의 소스 파일을 준비하고, PMD 분석을 실행한
          뒤, 사용이 끝난 작업 디렉터리를 정리해야 했습니다.
        </p>

        <CodeBlock
          code={`분석 대상 커밋 조회
  ↓
Commit A 소스 준비 → PMD 분석
  ↓
Commit B 소스 준비 → PMD 분석
  ↓
Commit C 소스 준비 → PMD 분석
  ↓
커밋별 분석 결과 비교`}
        />

        <p>
          가장 단순한 방법은 분석할 커밋마다 저장소를 새로 복제하는
          것이었습니다.
        </p>

        <CodeBlock
          code={`for each commit:

  git clone <repository-url>
  git checkout <commit-hash>
  PMD 분석
  저장소 삭제`}
        />

        <p>
          하지만 이 구조에서는 분석할 커밋이 늘어날 때마다 동일한 Git object를
          반복해서 내려받고 저장해야 했습니다.
        </p>

        <CodeBlock
          code={`Commit A
├── 저장소 clone
├── Git object 다운로드
├── 소스 파일 checkout
├── PMD 분석
└── 저장소 삭제

Commit B
├── 저장소 clone
├── 동일한 Git object 다시 다운로드
├── 소스 파일 checkout
├── PMD 분석
└── 저장소 삭제

Commit C
├── 저장소 clone
├── 동일한 Git object 다시 다운로드
├── 소스 파일 checkout
├── PMD 분석
└── 저장소 삭제`}
        />

        <p>
          분석 자체보다 저장소를 준비하는 과정에서 네트워크 요청, Git object
          다운로드와 디스크 쓰기가 반복되는 구조였습니다.
        </p>
      </div>

      <div>
        <h5>2. 분석 단위와 저장소 데이터 분리</h5>

        <p>
          각 커밋은 서로 다른 파일 상태를 가지므로 독립된 작업 디렉터리에서
          분석해야 합니다. 하지만 커밋을 구성하는 Git object까지 매번 새로
          내려받을 필요는 없었습니다.
        </p>

        <CodeBlock
          code={`커밋별로 분리해야 하는 데이터
├── 체크아웃된 소스 파일
├── HEAD
├── index
└── 분석 실행 환경

커밋 간 공유할 수 있는 데이터
├── commit object
├── tree object
├── blob object
└── 저장소 refs`}
        />

        <p>
          이를 기준으로 저장소 데이터와 분석 작업 디렉터리의 생명주기를
          분리했습니다.
        </p>

        <CodeBlock
          code={`Repository Cache
└── 전체 분석 작업 동안 유지
    └── Git object database 공유

Commit Worktree
└── 커밋 분석을 수행하는 동안만 유지
    ├── 특정 커밋의 소스 파일
    ├── PMD 분석
    └── 분석 완료 후 제거`}
        />
      </div>

      <div>
        <h5>3. Bare Clone으로 저장소 캐시 생성</h5>

        <p>
          분석을 시작할 때 최초 한 번만 <HighLight>Bare Clone</HighLight>을
          수행했습니다.
        </p>

        <CodeBlock
          code={`git clone --bare \\
  <repository-url> \\
  <repository-cache-path>`}
        />

        <p>
          Bare repository에는 일반 저장소처럼 체크아웃된 소스 디렉터리가
          존재하지 않습니다. 대신 커밋, 트리, 파일 내용을 구성하는 Git object와
          refs를 저장합니다.
        </p>

        <CodeBlock
          code={`repository.git/
├── HEAD
├── config
├── objects/
│   ├── commit objects
│   ├── tree objects
│   └── blob objects
├── refs/
└── worktrees/`}
        />

        <p>
          이후 모든 커밋 분석은 이 저장소 캐시를 기준으로 수행했습니다. 분석할
          커밋마다 원격 저장소를 다시 복제하지 않기 때문에 동일한 Git object의
          반복 다운로드와 중복 저장을 제거할 수 있었습니다.
        </p>
      </div>

      <div>
        <h5>4. Worktree로 커밋별 작업 공간 생성</h5>

        <p>
          실제 PMD 분석에 필요한 소스 파일은
          <HighLight>Git Worktree</HighLight>로 생성했습니다.
        </p>

        <CodeBlock
          code={`git --git-dir=<repository-cache-path> \\
  worktree add \\
  --detach \\
  <worktree-path> \\
  <commit-hash>`}
        />

        <p>
          분석 대상은 브랜치를 수정하기 위한 작업 공간이 아니므로
          <code>--detach</code>를 사용해 특정 커밋을 detached HEAD 상태로
          체크아웃했습니다.
        </p>

        <CodeBlock
          code={`repository.git
├── objects/              # 모든 worktree가 공유
├── refs/
└── worktrees/
    ├── commit-a          # HEAD와 index 분리
    ├── commit-b
    └── commit-c

analysis-worktrees/
├── commit-a/             # Commit A의 실제 소스 파일
├── commit-b/             # Commit B의 실제 소스 파일
└── commit-c/             # Commit C의 실제 소스 파일`}
        />

        <p>
          각 worktree는 공통 object database를 사용하지만, 체크아웃된 파일과
          <code>HEAD</code>, index는 독립적으로 관리됩니다. 따라서 커밋별 소스
          상태가 섞이지 않으면서도 저장소 데이터는 재사용할 수 있습니다.
        </p>
      </div>

      <div>
        <h5>5. 커밋 분석 실행과 정리</h5>

        <p>
          생성한 worktree 경로를 PMD의 분석 대상으로 전달하고, 분석이 끝나면
          해당 작업 디렉터리를 제거했습니다.
        </p>

        <CodeBlock
          code={`Repository Cache 준비
  ↓
Commit Worktree 생성
  ↓
PMD 분석 실행
  ↓
분석 결과 저장
  ↓
Worktree 제거
  ↓
다음 커밋 분석`}
        />

        <CodeBlock
          code={`git --git-dir=<repository-cache-path> \\
  worktree remove \\
  <worktree-path>`}
        />

        <p>
          분석 도중 오류가 발생해도 임시 작업 공간이 남지 않도록, worktree
          제거는 분석 결과와 관계없이 실행되는 정리 단계에서 처리했습니다.
        </p>

        <CodeBlock
          code={`async function analyzeCommit(commitHash: string) {
  const worktreePath = createWorktreePath(commitHash)

  try {
    await addWorktree({
      repositoryPath,
      worktreePath,
      commitHash,
      detached: true,
    })

    return await runPmdAnalysis({
      sourcePath: worktreePath,
      commitHash,
    })
  } finally {
    await removeWorktree({
      repositoryPath,
      worktreePath,
    })
  }
}`}
        />

        <p>
          분석 결과는 worktree 외부에 저장해 작업 디렉터리를 제거한 뒤에도
          커밋별 품질 지표를 비교할 수 있도록 구성했습니다.
        </p>
      </div>

      <div>
        <h5>6. 처리 구조 비교</h5>

        <p>기존 구조에서는 커밋마다 전체 저장소 복제가 반복됐습니다.</p>

        <CodeBlock
          code={`기존 구조

Commit A
→ clone
→ checkout
→ analyze
→ repository 삭제

Commit B
→ clone
→ checkout
→ analyze
→ repository 삭제

Commit C
→ clone
→ checkout
→ analyze
→ repository 삭제


원격 저장소 접근 횟수: 커밋 수만큼 반복
Git object 다운로드: 커밋 수만큼 중복 발생
작업 공간 격리: 저장소 단위`}
        />

        <p>
          개선 후에는 저장소를 한 번만 복제하고, 커밋별로 필요한 작업 디렉터리만
          생성했습니다.
        </p>

        <CodeBlock
          code={`개선 구조

최초 1회
→ bare clone
→ Git object database 캐시

Commit A
→ detached worktree 생성
→ analyze
→ worktree 제거

Commit B
→ detached worktree 생성
→ analyze
→ worktree 제거

Commit C
→ detached worktree 생성
→ analyze
→ worktree 제거


원격 저장소 접근 횟수: 최초 1회
Git object 다운로드: 최초 1회
작업 공간 격리: worktree 단위`}
        />
      </div>

      <div>
        <h5>7. 결과</h5>

        <p>
          반복 커밋 분석에서 저장소 clone 횟수를 커밋 수만큼 수행하던 구조에서
          최초 한 번만 수행하는 구조로 변경했습니다.
        </p>

        <CodeBlock
          code={`분석 커밋이 N개인 경우

기존
├── clone: N회
├── object database: N개
└── worktree checkout: N회

개선
├── bare clone: 1회
├── object database: 1개 공유
└── worktree checkout: N회`}
        />

        <p>
          커밋별 소스 파일을 준비하는 checkout 과정은 여전히 필요하지만, 동일한
          Git object를 반복해서 내려받고 저장하는 비용은 제거했습니다.
        </p>

        <p>
          또한 각 커밋을 독립된 worktree에서 분석해 하나의 작업 디렉터리에서
          checkout을 반복할 때 발생할 수 있는 파일 상태 혼합과 작업 간 충돌을
          방지했습니다.
        </p>

        <p>
          결과적으로 저장소 데이터의 생명주기와 커밋별 분석 환경의 생명주기를
          분리해, 반복 분석의 준비 비용을 줄이면서도 커밋 간 격리를 유지하는 Git
          처리 구조를 구성했습니다.
        </p>
      </div>
    </section>,
  ],

  links: [
    {
      isInside: false,
      name: "GitHub Repository",
      url: "https://github.com/mrbonk97/pmd-github-analyzer",
    },
  ],
};
