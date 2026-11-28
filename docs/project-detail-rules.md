# 프로젝트 상세 페이지 작성 규칙

## 적용 범위

- `/projects/*` 상세 페이지와 해당 페이지에서 사용하는 본문, 이미지, 다이어그램, 스크린샷 컴포넌트에 적용한다.
- `/projects` 목록 페이지는 제외한다.
- 상세 페이지를 새로 만들거나 수정할 때 [AGENTS.md](../AGENTS.md)와 이 문서를 함께 따른다.
- 공통 스타일은 이 문서를 기준으로 관리하고, 페이지마다 다른 간격이나 이미지 설명 형식을 만들지 않는다.

## 페이지 구조와 공통 스타일

- `<main>`의 `className`은 아래 값으로 고정한다. 일반적인 크기 단위와 클래스 순서 규칙보다 우선한다.
- 프로젝트 소개는 `ProjectHeader`, 본문 섹션은 `ArticleSection`, 기술 목록은 `TechStack`을 재사용한다.
- 문단 줄간격은 전역 CSS의 `line-height: 1.5`를 따른다. 문단이나 문단을 포함하는 영역에 별도의 `leading-*` 클래스를 추가하지 않는다.
- 단어 유지와 줄바꿈은 전역 CSS의 `word-break: keep-all`, `text-wrap: balance`를 따른다. 개별 요소에 `break-*`, `text-balance`를 추가하지 않는다.
- 글자 크기, 색상, 반응형 클래스 순서와 문장 작성은 `AGENTS.md`의 공통 규칙을 따른다.

```tsx
<main className="p-4 lg:p-4 pt-20 lg:pt-20 mx-auto max-w-3xl">
```

## 문제 해결 항목의 간격

- 문제 해결 본문의 섹션 제목은 `<h3 className="text-2xl font-semibold">`로 통일한다.
- 해결 방법을 제목과 설명으로 나열할 때 `<dl>`, `<dt>`, `<dd>`를 사용한다.
- 목록은 `className="mt-8 space-y-12"`로 작성한다. 항목 간 간격은 `space-y-12`로 통일한다.
- 같은 제목과 설명 구조를 쓰는 주요 기능 목록에도 `space-y-12`를 적용한다. 섹션 제목 바로 다음에 오는 목록에는 추가 `mt-8`을 넣지 않는다.
- 이 용도의 `space-y-12`는 `AGENTS.md`의 일반 크기 단위 규칙에 대한 명시적인 예외다.
- 항목 제목은 `<dt className="font-semibold">`로 작성한다.
- 제목 바로 아래 설명은 `<dd className="mt-2">`로 작성한다. 이 간격을 `mt-4`로 늘리지 않는다.
- 설명 문장은 `<p>`로 감싼다. 첫 문단에는 추가 상단 여백을 넣지 않고, 이어지는 문단에는 `mt-4`를 사용한다.
- `mt-2`는 항목 제목과 설명 사이 간격이다. 섹션 간격이나 본문 내 모든 문단 간격을 `mt-2`로 바꾸는 규칙은 아니다.

```tsx
<dl className="mt-8 space-y-12">
  <div>
    <dt className="font-semibold">권한 판단 순서 통일</dt>
    <dd className="mt-2">
      <p>
        현업과 함께 참여 대상, 제출 완료, 운영 상태 순으로 판단 기준을
        정했습니다. 일시정지 중에도 제출 완료자는 결과를 조회할 수 있고,
        미제출자는 수정과 제출을 제한했습니다.
      </p>
    </dd>
  </div>
</dl>
```

## 본문 이미지와 제목

- 설명용 이미지와 다이어그램은 `<figure>`로 묶고, 앞선 본문과의 간격은 `mt-8`을 기본으로 한다.
- 이미지 영역은 `className="p-4 rounded border"`를 기본으로 한다. 내용이 영역 밖으로 넘칠 수 있으면 `overflow-hidden`을 추가할 수 있다.
- 테두리는 기본 `border` 색상을 사용한다. 별도의 테두리 색상을 지정하지 않는다.
- 이미지에 `h-auto w-full`을 사용해 원본 비율을 유지한다. `next/image`의 실제 크기 정보와 표시 폭에 맞는 `sizes`를 지정한다.
- 이미지 제목은 이미지 영역 아래, 테두리 밖의 `<figcaption>`에 둔다. 이미지 위에 같은 제목을 중복해서 표시하지 않는다.
- 제목은 `[제목]`처럼 대괄호로 감싸고 가운데 정렬한다.
- 이미지와 도표의 캡션에는 `[제목]`만 표시한다. 제목 아래에 부연 설명, 요약 문장이나 예시 안내를 덧붙이지 않는다.
- 이 규칙은 캡션 밖에 별도 문단으로 붙이는 보조 설명에도 적용한다. 수치 환산, 설정값 안내나 표와 도표 아래의 반복 설명도 추가하지 않는다.
- 캡션은 `className="mt-2 text-center font-medium text-muted-foreground"`로 작성한다. 색상 토큰의 정확한 이름은 `text-muted-foreground`다.
- 시각적 캡션과 별개로 이미지 내용에 맞는 `alt`를 유지한다. `aria-label`은 추가하지 않는다.
- 다이어그램 내부의 노드, 시스템 경계와 비교 패널 구분선은 `AGENTS.md`의 시각화 테두리 규칙을 따른다.

```tsx
<figure className="mt-8">
  <div className="p-4 overflow-hidden rounded border">
    <Image
      src={surveyPolicyFlowchart}
      alt="참여 대상, 제출 완료 여부와 운영 상태에 따른 설문 권한 판단 흐름"
      sizes="(min-width: 768px) 702px, calc(100vw - 66px)"
      className="h-auto w-full"
    />
  </div>
  <figcaption className="mt-2 text-center font-medium text-muted-foreground">
    [30개 조합을 처리하는 전체 권한 판단 흐름]
  </figcaption>
</figure>
```

위 예시의 `surveyPolicyFlowchart`는 정적으로 가져온 이미지다. 문자열 경로를 사용할 때는 원본의 `width`와 `height`도 전달한다.

## 여러 스크린샷의 표시

- 여러 상세 이미지는 [ProjectScreenshots](../components/projects/project-screenshots.tsx) 공통 컴포넌트와 shadcn Carousel을 사용한다.
- 기본 슬라이드 폭은 `basis-4/5`로 두어 다음 이미지 일부가 보이게 한다. 한 장이 화면을 완전히 채워 추가 이미지의 존재를 숨기지 않는다.
- 세로 이미지는 넓은 화면에서 `basis-4/5 sm:basis-2/5`로 표시해 두 장과 다음 장 일부가 보이게 한다.
- 스와이프, 이전과 다음 버튼, 방향키 이동을 유지한다. 버튼은 이미지 아래에 배치한다.
- 슬라이드 폭을 변경하면 `Image`의 `sizes`도 실제 표시 폭에 맞춘다.
- 프로젝트별 이미지 경로, 순서와 내용 설명인 `alt`는 해당 페이지에서 전달하고, 표시 방식은 공통 컴포넌트에서 관리한다.
- 스크린샷에는 제목, `[제목]` 캡션이나 별도 설명을 표시하지 않는다. 위의 이미지 제목 규칙에서 스크린샷은 제외하고, 접근성을 위한 `alt`만 유지한다.
