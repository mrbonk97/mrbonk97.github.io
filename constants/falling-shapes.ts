export const BASIC_SHAPES = [
  { kind: "circle", width: 1, height: 1, sides: 0, radius: 0.5 },
  { kind: "pill", width: 1.5, height: 0.75, sides: 0, radius: 0.375 },
  { kind: "box", width: 1, height: 1, sides: 0, radius: 0 },
  { kind: "rectangle", width: 1.5, height: 0.75, sides: 0, radius: 0 },
  { kind: "hexagon", width: 1, height: 1, sides: 6, radius: 0 },
  { kind: "pentagon", width: 1, height: 1, sides: 5, radius: 0 },
  { kind: "triangle", width: 1, height: 1, sides: 3, radius: 0 },
  { kind: "octagon", width: 1, height: 1, sides: 8, radius: 0 },
] as const;

export type ShapeColor = 100 | 300 | 400;
export type ShapeLink = {
  label: string;
  href: "/projects" | "/blog" | "/about-me";
};

export type FallingShape = {
  id: string;
  kind: typeof BASIC_SHAPES[number]["kind"];
  color: ShapeColor;
  size: number;
  x: number;
  y: number;
  releaseAt: number;
  angle: number;
  velocityX: number;
  velocityY: number;
  spin: number;
  link?: ShapeLink;
};

/**
 * 홈 화면의 24개 도형. 배열 순서로 종류나 색을 추측하지 않고 각 항목을 그대로 사용한다.
 * size: 기준 도형 크기 128px 대비 크기. 화면에 맞게 비례 조정하고 8px 단위로 맞춘다.
 * x/y: 화면 상단 중앙을 (0, 0)으로 한 기준 px. x는 좌우, 음수 y는 화면 위쪽이다.
 * releaseAt: 커튼 진입 대기(800ms)가 끝난 뒤 도형을 놓는 시점(ms).
 * angle: 시작 각도(도), velocityX/Y: 60fps 기준 초기 속도(px/프레임), spin: 회전 속도(도/프레임).
 * 위치와 속도도 화면 크기에 비례한다. 난수는 사용하지 않는다.
 * 120~176ms 간격으로 하나씩 놓으며 마지막 낙하는 3152ms에 시작한다.
 * 버튼은 2번째(128ms), 10번째(1184ms), 18번째(2240ms)로 배치해 1056ms씩 간격을 둔다.
 * link가 있는 세 항목만 클릭 가능하다. releaseAt을 기준으로 순서가 결정된다.
 * 출발 위치는 네 경로(-320, -112, 112, 320)로 분산한다.
 * 출발 위치에 다른 도형이 있으면 겹침이 해소될 때까지 잠깐 기다린다.
 */
export const FALLING_SHAPES: readonly FallingShape[] = [
  { id: "projects", kind: "circle", color: 100, size: 144, x: 112, y: -128, releaseAt: 128, angle: -8, velocityX: -0.2, velocityY: 2, spin: -0.12, link: { label: "프로젝트", href: "/projects" } },
  { id: "blog", kind: "pill", color: 100, size: 144, x: -112, y: -128, releaseAt: 1184, angle: 12, velocityX: 0.2, velocityY: 2, spin: 0.12, link: { label: "블로그", href: "/blog" } },
  { id: "about-me", kind: "box", color: 100, size: 144, x: -112, y: -128, releaseAt: 2240, angle: -12, velocityX: 0, velocityY: 2, spin: -0.08, link: { label: "소개", href: "/about-me" } },

  // 일반 도형: 버튼과 교대한 항목은 후반에 등장한다.
  { id: "shape-04", kind: "rectangle", color: 300, size: 128, x: -320, y: -128, releaseAt: 0, angle: -16, velocityX: -0.2, velocityY: 2, spin: -0.24 },
  { id: "shape-05", kind: "hexagon", color: 400, size: 112, x: -112, y: -128, releaseAt: 2800, angle: 16, velocityX: 0.2, velocityY: 2, spin: 0.16 },
  { id: "shape-06", kind: "pentagon", color: 300, size: 128, x: -112, y: -128, releaseAt: 272, angle: -24, velocityX: 0, velocityY: 2, spin: -0.16 },
  { id: "shape-07", kind: "triangle", color: 400, size: 96, x: 320, y: -128, releaseAt: 392, angle: 32, velocityX: -0.2, velocityY: 2, spin: 0.24 },
  { id: "shape-08", kind: "octagon", color: 300, size: 112, x: -320, y: -128, releaseAt: 528, angle: 8, velocityX: 0.2, velocityY: 2, spin: -0.16 },
  { id: "shape-09", kind: "circle", color: 400, size: 96, x: 112, y: -128, releaseAt: 656, angle: 0, velocityX: 0, velocityY: 2, spin: 0.08 },
  { id: "shape-10", kind: "pill", color: 300, size: 96, x: -112, y: -128, releaseAt: 800, angle: -32, velocityX: -0.2, velocityY: 2, spin: 0.16 },

  // 중간 구간의 일반 도형.
  { id: "shape-11", kind: "box", color: 400, size: 104, x: 320, y: -128, releaseAt: 920, angle: 24, velocityX: 0.2, velocityY: 2, spin: -0.24 },
  { id: "shape-12", kind: "rectangle", color: 300, size: 96, x: -320, y: -128, releaseAt: 1056, angle: -8, velocityX: -0.2, velocityY: 2, spin: 0.16 },
  { id: "shape-13", kind: "hexagon", color: 400, size: 96, x: 320, y: -128, releaseAt: 2976, angle: 32, velocityX: 0, velocityY: 2, spin: 0.24 },
  { id: "shape-14", kind: "pentagon", color: 300, size: 104, x: 112, y: -128, releaseAt: 1328, angle: -16, velocityX: 0.2, velocityY: 2, spin: -0.16 },
  { id: "shape-15", kind: "triangle", color: 400, size: 112, x: 320, y: -128, releaseAt: 1448, angle: 16, velocityX: -0.2, velocityY: 2, spin: 0.24 },
  { id: "shape-16", kind: "octagon", color: 300, size: 96, x: -320, y: -128, releaseAt: 1584, angle: -32, velocityX: 0.2, velocityY: 2, spin: -0.16 },
  { id: "shape-17", kind: "circle", color: 400, size: 112, x: -112, y: -128, releaseAt: 1712, angle: 0, velocityX: 0, velocityY: 2, spin: 0.08 },

  // 후반 구간의 일반 도형.
  { id: "shape-18", kind: "pill", color: 300, size: 104, x: 112, y: -128, releaseAt: 1856, angle: 24, velocityX: 0.2, velocityY: 2, spin: -0.16 },
  { id: "shape-19", kind: "box", color: 400, size: 96, x: 320, y: -128, releaseAt: 1976, angle: -16, velocityX: 0.2, velocityY: 2, spin: 0.24 },
  { id: "shape-20", kind: "rectangle", color: 300, size: 112, x: -320, y: -128, releaseAt: 2112, angle: 8, velocityX: -0.2, velocityY: 2, spin: -0.16 },
  { id: "shape-21", kind: "hexagon", color: 400, size: 104, x: 112, y: -128, releaseAt: 3152, angle: -24, velocityX: 0, velocityY: 2, spin: 0.16 },
  { id: "shape-22", kind: "pentagon", color: 300, size: 96, x: 320, y: -128, releaseAt: 2384, angle: 32, velocityX: 0.2, velocityY: 2, spin: -0.24 },
  { id: "shape-23", kind: "triangle", color: 400, size: 104, x: 112, y: -128, releaseAt: 2504, angle: -8, velocityX: -0.2, velocityY: 2, spin: 0.16 },
  { id: "shape-24", kind: "octagon", color: 300, size: 112, x: -320, y: -128, releaseAt: 2640, angle: 16, velocityX: 0, velocityY: 2, spin: -0.16 },
];

export const SHAPE_COUNT = FALLING_SHAPES.length;
export const SHAPE_LINKS = FALLING_SHAPES.flatMap(({ link }) => link ? [link] : []);
