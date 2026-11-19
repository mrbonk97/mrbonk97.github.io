import Matter from "matter-js";

const COLORS = {
  mint: "#87ccaa",
  butter: "#e6ce75",
  periwinkle: "#a6b5eb",
  rose: "#d49ea3",
  peach: "#e5ab89",
  sky: "#7eb7df",
  pink: "#ea91b2",
  oat: "#c9a58b",
  lavender: "#a68ad7",
  sage: "#a4be82",
  lime: "#c8d67b",
  coral: "#e88f86",
  apricot: "#ecb168",
  aqua: "#79c4c0",
  orchid: "#c593cf",
  turquoise: "#79cad5",
};

export const SHAPE_LINKS = [
  { shape: "pink", label: "프로젝트", href: "/projects" },
  { shape: "sky", label: "블로그", href: "/blog" },
  { shape: "mint", label: "소개", href: "/about-me" },
] as const satisfies readonly {
  shape: keyof typeof COLORS;
  label: string;
  href: string;
}[];

type ShapeDefinition = {
  kind: "circle" | "capsule" | "square" | "triangle" | "pentagon" | "hexagon";
  color: keyof typeof COLORS;
  size: number;
  angle: number;
  x: number;
  y: number;
};

// A fixed, non-overlapping figure: head/neck, torso/hips, two arms and two legs.
// Coordinates and sizes are expressed in the same responsive unit.
const SHAPES: readonly ShapeDefinition[] = [
  { kind: "circle", color: "lavender", size: 1.05, angle: 0, x: 0, y: -4.72 },
  { kind: "circle", color: "butter", size: 0.28, angle: 0, x: 0, y: -3.3 },
  { kind: "square", color: "sky", size: 1.35, angle: 0, x: 0, y: -1.7 },
  { kind: "capsule", color: "pink", size: 1.1, angle: 0, x: 0, y: 0.24 },
  { kind: "square", color: "periwinkle", size: 0.62, angle: 18, x: -2.05, y: -2.15 },
  { kind: "square", color: "rose", size: 0.58, angle: 14, x: -2.5, y: -0.8 },
  { kind: "circle", color: "peach", size: 0.43, angle: 0, x: -2.8, y: 0.35 },
  { kind: "square", color: "sage", size: 0.62, angle: -18, x: 2.05, y: -2.15 },
  { kind: "square", color: "orchid", size: 0.58, angle: -14, x: 2.5, y: -0.8 },
  { kind: "circle", color: "turquoise", size: 0.43, angle: 0, x: 2.8, y: 0.35 },
  { kind: "square", color: "apricot", size: 0.7, angle: 0, x: -0.8, y: 1.65 },
  { kind: "square", color: "lime", size: 0.7, angle: 0, x: 0.8, y: 1.65 },
  { kind: "square", color: "oat", size: 0.62, angle: 0, x: -0.84, y: 2.95 },
  { kind: "square", color: "coral", size: 0.62, angle: 0, x: 0.84, y: 2.95 },
  { kind: "capsule", color: "mint", size: 0.65, angle: -6, x: -1.05, y: 4.05 },
  { kind: "capsule", color: "aqua", size: 0.65, angle: 6, x: 1.05, y: 4.05 },
];

export function shapeSize(width: number, height: number) {
  return Math.min(width / 7, height / 10.5);
}

function humanPosition(shape: ShapeDefinition, width: number, height: number) {
  const size = shapeSize(width, height);
  return {
    x: width / 2 + shape.x * size,
    // Even the feet start above the screen; the entire figure falls together.
    y: (shape.y - 4.6) * size - 40,
  };
}

export function createShapes(width: number, height: number) {
  const size = shapeSize(width, height);
  return SHAPES.map((shape) => {
    const radius = size * shape.size;
    const { x, y } = humanPosition(shape, width, height);
    const options: Matter.IChamferableBodyDefinition = {
      label: shape.color,
      angle: (shape.angle * Math.PI) / 180,
      restitution: 0.85,
      friction: 0.05,
      frictionAir: 0.02,
      render: {
        fillStyle: COLORS[shape.color],
        lineWidth: 0,
      },
    };

    switch (shape.kind) {
      case "circle":
        return Matter.Bodies.circle(x, y, radius, options);
      case "capsule":
        return Matter.Bodies.rectangle(x, y, radius * 2.8, radius * 1.2, {
          ...options,
          chamfer: { radius: radius * 0.58 },
        });
      case "square":
        return Matter.Bodies.rectangle(x, y, radius * 1.8, radius * 1.8, {
          ...options,
          chamfer: { radius: radius * 0.18 },
        });
      case "triangle":
        return Matter.Bodies.polygon(x, y, 3, radius * 1.2, {
          ...options,
          chamfer: { radius: radius * 0.08 },
        });
      case "pentagon":
        return Matter.Bodies.polygon(x, y, 5, radius, options);
      case "hexagon":
        return Matter.Bodies.polygon(x, y, 6, radius, options);
    }
  });
}

export function positionHumanShapes(
  shapes: Matter.Body[], width: number, height: number, fallDistance = 0,
) {
  shapes.forEach((body, index) => {
    const position = humanPosition(SHAPES[index], width, height);
    Matter.Body.setPosition(body, { x: position.x, y: position.y + fallDistance });
    Matter.Body.setAngle(body, SHAPES[index].angle * Math.PI / 180);
    Matter.Body.setVelocity(body, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(body, 0);
  });
}

export function humanFallDistance(shapes: Matter.Body[], width: number, height: number) {
  return shapes[0].position.y - humanPosition(SHAPES[0], width, height).y;
}

export function createBounds(width: number, height: number) {
  const options = { isStatic: true, render: { visible: false } };
  const top = -height * 2;
  const wallHeight = height - top + 400;
  const wallCenter = (height + top) / 2;
  // Leave room above the viewport for shapes flung upwards.
  return [
    Matter.Bodies.rectangle(width / 2, height + 100, width + 400, 200, options),
    Matter.Bodies.rectangle(width / 2, top - 100, width + 400, 200, options),
    Matter.Bodies.rectangle(-100, wallCenter, 200, wallHeight, options),
    Matter.Bodies.rectangle(width + 100, wallCenter, 200, wallHeight, options),
  ];
}

type Viewport = { width: number; height: number };

export function resizeShapes(
  engine: Matter.Engine,
  shapes: Matter.Body[],
  bounds: Matter.Body[],
  previous: Viewport,
  next: Viewport,
) {
  const scale = shapeSize(next.width, next.height)
    / shapeSize(previous.width, previous.height);
  const nextBounds = createBounds(next.width, next.height);
  const worldTop = nextBounds[1].bounds.max.y;

  for (const body of shapes) {
    const wasVisible = body.bounds.max.y >= 0 && body.bounds.min.y <= previous.height;
    const position = {
      x: body.position.x * next.width / previous.width,
      // Shapes above the screen scale with the world, not the visible viewport.
      // Keep the visible pile anchored to the floor as its size changes.
      y: body.position.y < 0
        ? body.position.y * scale
        : next.height - (previous.height - body.position.y) * scale,
    };

    // Old momentum and collision contacts don't fit the resized world.
    Matter.Body.setVelocity(body, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(body, 0);
    Matter.Body.scale(body, scale, scale);
    Matter.Body.setPosition(body, position);

    const top = wasVisible ? 0 : worldTop + 1;
    const dx = body.bounds.min.x < 0 ? -body.bounds.min.x
      : body.bounds.max.x > next.width ? next.width - body.bounds.max.x : 0;
    const dy = body.bounds.max.y > next.height ? next.height - body.bounds.max.y
      : body.bounds.min.y < top ? top - body.bounds.min.y : 0;
    Matter.Body.translate(body, { x: dx, y: dy });
    Matter.Sleeping.set(body, false);
  }

  Matter.Composite.remove(engine.world, bounds);
  Matter.Composite.add(engine.world, nextBounds);
  Matter.Engine.clear(engine);
  return nextBounds;
}
