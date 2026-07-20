import { CodeBlock } from "@/components/util-component/code-block";
import { Article } from "@/types";
import { HighLight } from "@/components/util-component/high-light";

export const ARTICLE: Article = {
  id: "husky-team-workflow",
  title: "Husky로 Git 작업 자동 검사하기",
  summary:
    "Husky와 lint-staged, commitlint를 활용해 팀의 Git 컨벤션을 자동으로 검증하는 방법을 정리했습니다.",
  banner: "/images/blog/husky-team-workflow/banner.png",
  tags: ["Next.js", "Husky", "Git", "Commitlint"],
  date: "2026.07.09",
  content: [
    <section
      key={`content-1`}
      className={`
    mt-16
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
        <h5>Husky란?</h5>

        <p className="mt-4 rounded bg-custom-2 p-4 text-custom-4 md:p-8">
          Husky는 Git Hook을 손쉽게 설정하고 관리할 수 있게 해주는 도구입니다.
          Commit이나 Push 같은 작업이 실행될 때 ESLint, Prettier, commitlint,
          테스트 등의 명령이 자동으로 실행되도록 구성할 수 있습니다.
        </p>
      </header>

      <div>
        <h5>Husky를 사용하는 이유</h5>

        <p>
          팀에서 코드 스타일이나 커밋 메시지 규칙을 정하더라도 모든 개발자가
          매번 규칙을 기억하고 직접 검사하기는 어렵습니다.
        </p>

        <p>
          Husky를 사용하면 Git Hook을 통해 커밋이나 푸시가 진행되기 전에 필요한
          검사 명령을 자동으로 실행할 수 있습니다.
        </p>

        <CodeBlock
          code={`코드 작성
  ↓
git commit
  ↓
코드 스타일과 커밋 메시지 자동 검사
  ↓
검사 성공 → 커밋 완료
검사 실패 → 커밋 중단 후 문제 수정`}
        />

        <p>
          개발자가 규칙을 기억해 수동으로 검사하는 대신, Git 작업 과정에 검사를
          포함하여 규칙이 자동으로 적용되도록 만드는 것입니다.
        </p>
      </div>

      <div>
        <h3 className="text-2xl font-semibold md:text-4xl">설정 방법</h3>

        <h5>1. 패키지 설치 및 초기화</h5>

        <p>
          Husky와 함께 스테이징된 파일을 검사하는
          <HighLight>lint-staged</HighLight>, 코드 형식을 정리하는
          <HighLight>Prettier</HighLight>, 커밋 메시지를 검사하는
          <HighLight>commitlint</HighLight>를 설치합니다.
        </p>

        <CodeBlock
          code={`pnpm add -D husky lint-staged prettier \\
  @commitlint/cli \\
  @commitlint/config-conventional

pnpm exec husky init`}
        />

        <p>
          초기화가 완료되면 <HighLight>.husky/pre-commit</HighLight> 파일이
          생성되고, <HighLight>package.json</HighLight>에
          <HighLight>prepare</HighLight> 스크립트가 추가됩니다.
        </p>

        <p>
          푸시 전에 전체 코드와 타입을 검사할 수 있도록 프로젝트에 맞는
          스크립트도 준비합니다.
        </p>

        <CodeBlock
          code={`{
  "scripts": {
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "prepare": "husky"
  }
}`}
        />
      </div>

      <div>
        <h5>2. 커밋 전 코드 검사</h5>

        <p>
          커밋할 때마다 프로젝트 전체를 검사하면 검사 시간이 길어질 수 있습니다.
          lint-staged를 사용하면 스테이징된 파일 중 설정한 패턴과 일치하는
          파일만 검사할 수 있습니다.
        </p>

        <p>
          <HighLight>.husky/pre-commit</HighLight> 파일의 내용을 다음과 같이
          설정합니다.
        </p>

        <CodeBlock code={`pnpm exec lint-staged`} />

        <p>
          이후 <HighLight>package.json</HighLight>에 파일 종류별로 실행할 명령을
          추가합니다.
        </p>

        <CodeBlock
          code={`{
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{json,css,scss,md,mdx}": [
      "prettier --write"
    ]
  }
}`}
        />

        <p>
          이제 커밋을 실행하면 스테이징된 파일에만 ESLint와 Prettier가
          적용됩니다. 검사 명령이 실패하면 커밋이 중단됩니다.
        </p>

        <CodeBlock
          code={`git add src/login-form.tsx
git commit -m "feat: 로그인 기능 추가"

→ 스테이징된 login-form.tsx 검사
→ 검사 성공 시 커밋 완료
→ 검사 실패 시 커밋 중단`}
        />
      </div>

      <div>
        <h5>3. 커밋 메시지 검사</h5>

        <p>
          <HighLight>commitlint</HighLight>를 사용하면 커밋 메시지가 정해진
          규칙을 따르는지 검사할 수 있습니다.
        </p>

        <CodeBlock
          code={`feat: 로그인 기능 추가
fix(auth): 토큰 갱신 오류 수정
docs: 설치 방법 추가`}
        />

        <p>
          프로젝트 루트에 <HighLight>commitlint.config.mjs</HighLight> 파일을
          생성하고 Conventional Commits 규칙을 적용합니다.
        </p>

        <CodeBlock
          code={`export default {
  extends: ["@commitlint/config-conventional"],
}`}
        />

        <p>
          다음으로 <HighLight>.husky/commit-msg</HighLight> 파일을 만들고 커밋
          메시지 검사 명령을 추가합니다.
        </p>

        <CodeBlock code={`pnpm exec commitlint --edit "$1"`} />

        <p>
          설정이 완료되면 규칙을 따르지 않는 커밋 메시지는 커밋 단계에서
          차단됩니다.
        </p>

        <CodeBlock
          code={`# 실패
git commit -m "로그인 기능 추가"

# 성공
git commit -m "feat: 로그인 기능 추가"`}
        />
      </div>

      <div>
        <h5>4. 푸시 전 전체 검사</h5>

        <p>
          커밋 단계에서는 스테이징된 파일만 빠르게 검사하고, 푸시 단계에서는
          프로젝트 전체를 검사하도록 구성할 수 있습니다.
        </p>

        <p>
          <HighLight>.husky/pre-push</HighLight> 파일을 만들고 다음 명령을
          추가합니다.
        </p>

        <CodeBlock
          code={`pnpm run lint
pnpm run typecheck`}
        />

        <CodeBlock
          code={`git push
  ↓
전체 ESLint 검사
  ↓
TypeScript 타입 검사
  ↓
검사 성공 → 푸시 진행
검사 실패 → 푸시 중단`}
        />

        <p>
          프로젝트에 따라 이 단계에 테스트 실행, 빌드 검사 또는 브랜치 이름 검사
          등의 명령을 추가할 수 있습니다.
        </p>
      </div>

      <div>
        <h5>설정 후 사용</h5>

        <p>
          설정이 완료된 이후에는 검사 명령을 매번 직접 실행할 필요가 없습니다.
          평소처럼 커밋과 푸시를 실행하면 설정된 Git Hook이 자동으로 동작합니다.
        </p>

        <CodeBlock
          code={`git add .
git commit -m "feat: 회원가입 기능 추가"
git push`}
        />

        <ul>
          <li>
            <HighLight>git commit</HighLight>: 스테이징된 파일과 커밋 메시지를
            검사합니다.
          </li>
          <li>
            <HighLight>git push</HighLight>: 전체 코드와 TypeScript 타입을
            검사합니다.
          </li>
        </ul>
      </div>

      <div>
        <h5>적용 효과</h5>

        <p>
          Husky를 적용하면 코드 스타일이나 커밋 메시지와 관련된 문제를 PR 리뷰
          전에 발견할 수 있습니다.
        </p>

        <CodeBlock
          code={`적용 전

커밋 및 푸시
→ PR 생성
→ 리뷰 중 형식 오류 발견
→ 수정 후 다시 푸시


적용 후

커밋 실행
→ 스테이징된 파일과 커밋 메시지 자동 검사

푸시 실행
→ 전체 코드와 타입 자동 검사

PR 생성
→ 코드의 동작과 설계 중심으로 리뷰`}
        />

        <p>
          개발자는 검사 명령을 따로 기억하지 않아도 되고, 리뷰어는 반복적인 형식
          확인보다 코드의 동작과 설계에 집중할 수 있습니다.
        </p>
      </div>
    </section>,
  ],
};
