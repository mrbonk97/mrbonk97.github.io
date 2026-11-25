<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

- aria-label 사용 금지
- 사이즈는 -2, -4, -8, -16, -32, -64 단위 사용
- 폰트는 기본, text-lg, text-2xl, text-4xl, text-6xl 사용
- 최대한 tailwind className은 간단하게 사용
- responsive breakpoint는 순서는 언제나 바로 옆에 작성해야함.
  p-4 lg:p-8 h-16 (O)
  p-4 h-16 lg:p-8 (X)
- tailwind 순서 position -> margin -> padding -> height -> width ... -> color

<!-- END:nextjs-agent-rules -->

## 문장 작성 규칙

- 본문, 제목, 라벨, 설명, 응답에서 중간점 기호를 사용하지 않는다.
- 항목을 나열할 때는 문맥에 맞는 쉼표, 접속사, 자연스러운 문장으로 작성한다.

## 시각 스타일 규칙

- 일반 카드와 설명 영역의 테두리는 최소화하고, 섹션 구분선과 표에는 필요한 구분선을 사용한다.
- 모든 다이어그램과 차트의 시각화 영역에는 바깥 테두리를 사용한다. OSS 재진단 도표처럼 비교 패널 사이에도 구분선을 넣는다.
- 다이어그램 내부의 노드, 판단 단계, 시스템 경계, 트랜잭션 범위에도 테두리를 사용해 구조를 드러낸다. 제목과 설명은 시각화 영역 밖에 둔다.
- 테두리는 기본 `border` 색상을 사용한다. `border-custom-*` 등 별도의 테두리 색상을 지정하지 않는다.
- 요소 간 구분은 여백과 배경색을 우선 사용한다.
- 배경색은 `bg-custom-400` 대신 `bg-secondary`를 사용한다. 기존 사용처도 동일하게 변경한다.
- `dark:` 변형 클래스는 사용하지 않는다. 페이지와 공용 컴포넌트 모두 기본 스타일로 작성한다.
- 배경, 글자, 테두리와 포커스 색상에 `/10`, `/20`, `/60` 등의 투명도 수식을 사용하지 않는다. 색상을 연하게 만들 때 투명도를 낮추지 않고 `bg-secondary`, `bg-custom-300` 등 불투명한 색상 토큰을 선택한다.
- 포인트 색상은 `custom-100`, `custom-200`, `custom-300`, `custom-400`을 우선 사용한다. 삭제와 실패를 알리는 `destructive` 등 의미가 필요한 색상만 예외로 사용한다.
- 링크의 밑줄은 기본 장식으로 반복하지 않고, 필요한 상호작용 상태에서 사용한다.

## 전역 줄바꿈 규칙

- `app/globals.css`의 `*` 규칙에 `word-break: keep-all`과 `text-wrap: balance`를 함께 선언해 단어를 유지하면서 줄 길이를 맞춘다.
- 개별 페이지와 컴포넌트에는 `break-all`, `break-keep`, `text-balance` 등 별도의 word-break 또는 text-wrap 설정을 추가하지 않는다.
- 모든 `<p>`의 줄간격은 `app/globals.css`에서 `line-height: 1.5`로 관리한다. 글자 크기 유틸리티보다 우선하도록 CSS 레이어 밖에 선언하며, 개별 문단이나 하위 요소 전체에 적용하는 leading 클래스는 추가하지 않는다.

## 프로젝트 상세 페이지 규칙

- `/projects/*` 프로젝트 상세 페이지의 `<main>`에는 아래 `className`만 사용한다. `/projects` 목록 페이지는 이 규칙에서 제외한다.
- 클래스를 추가, 삭제, 변경하지 않고 고정하며, 새 프로젝트 상세 페이지에도 동일하게 적용한다.
- 문단 줄간격과 `word-break: keep-all`, `text-wrap: balance`는 전역 CSS에서 적용한다.
- 이 고정값은 일반적인 사이즈 및 Tailwind 클래스 순서 규칙보다 우선한다.

```tsx
<main className="p-4 lg:p-4 pt-20 lg:pt-20 mx-auto max-w-3xl">
```
