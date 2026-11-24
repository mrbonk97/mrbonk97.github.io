import Matter from "matter-js";
import { BASIC_SHAPES, FALLING_SHAPES, type FallingShape, type ShapeColor } from "../constants/falling-shapes";

export const SHAPE_CORNER_RADIUS = 4;

export function shapeSize(width: number, height: number) {
  return Math.max(32, Math.floor(Math.min(width / 8, height / 6, 192) / 8) * 8);
}

function bodySize(definition: FallingShape, width: number, height: number) {
  return Math.max(definition.link ? 64 : 24, Math.round(shapeSize(width, height) * definition.size / 128 / 8) * 8);
}

type ShapeSpawn = { definition: FallingShape; angle: number; drift: number; speed: number; spin: number; releaseAt: number; released: boolean };
const shapeSpawns = new WeakMap<Matter.Body, ShapeSpawn>();

function spawnPosition(spawn: ShapeSpawn, width: number, height: number) {
  const scale = shapeSize(width, height) / 128;
  return {
    x: width / 2 + spawn.definition.x * scale,
    y: spawn.definition.y * scale,
  };
}

export function createShapes(width: number, height: number, palette: Record<ShapeColor, string>, startTime = 0) {
  const scale = shapeSize(width, height) / 128;
  return FALLING_SHAPES.map((definition) => {
    const size = bodySize(definition, width, height);
    const form = BASIC_SHAPES.find(({ kind }) => kind === definition.kind)!;
    const spawn: ShapeSpawn = {
      definition,
      angle: definition.angle * Math.PI / 180,
      drift: definition.velocityX * scale,
      speed: definition.velocityY * scale,
      spin: definition.spin * Math.PI / 180,
      releaseAt: startTime + definition.releaseAt,
      released: false,
    };
    const options: Matter.IChamferableBodyDefinition = {
      label: definition.id,
      restitution: 0.12,
      friction: 0.2,
      frictionAir: 0.02,
      render: {
        visible: false,
        fillStyle: palette[definition.color],
        lineWidth: 0,
      },
    };
    const shape = form.kind === "circle"
      ? Matter.Bodies.circle(0, 0, size / 2, options)
      : form.sides
        ? Matter.Bodies.polygon(0, 0, form.sides, size / 2, {
          ...options,
          chamfer: { radius: SHAPE_CORNER_RADIUS, quality: 8 },
        })
        : Matter.Bodies.rectangle(0, 0, size * form.width, size * form.height, {
          ...options,
          chamfer: { radius: form.radius ? size * form.radius : SHAPE_CORNER_RADIUS, quality: 16 },
        });
    shapeSpawns.set(shape, spawn);
    Matter.Body.setPosition(shape, spawnPosition(spawn, width, height));
    Matter.Body.setAngle(shape, spawn.angle);
    Matter.Body.setStatic(shape, true);
    shape.collisionFilter.mask = 0;
    return shape;
  });
}

export function releaseShapes(shapes: Matter.Body[], timestamp: number) {
  for (const shape of shapes) {
    const spawn = shapeSpawns.get(shape)!;
    if (spawn.released || timestamp < spawn.releaseAt) continue;
    // Never turn a waiting body solid inside one that is already falling or being dragged.
    const activeShapes = shapes.filter((body) => body !== shape && shapeSpawns.get(body)!.released);
    if (Matter.Query.collides(shape, activeShapes).length > 0) continue;
    spawn.released = true;
    Matter.Body.setStatic(shape, false);
    shape.collisionFilter.mask = 0xFFFFFFFF;
    shape.render.visible = true;
    Matter.Body.setVelocity(shape, { x: spawn.drift, y: spawn.speed });
    Matter.Body.setAngularVelocity(shape, spawn.spin);
    Matter.Sleeping.set(shape, false);
  }
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
  const worldScale = shapeSize(next.width, next.height)
    / shapeSize(previous.width, previous.height);
  const nextBounds = createBounds(next.width, next.height);
  const worldTop = nextBounds[1].bounds.max.y;
  const floor = nextBounds[0].bounds.min.y;
  const placed: Matter.Body[] = [];

  for (const body of shapes) {
    const spawn = shapeSpawns.get(body)!;
    const scale = bodySize(spawn.definition, next.width, next.height)
      / bodySize(spawn.definition, previous.width, previous.height);
    spawn.drift *= worldScale;
    spawn.speed *= worldScale;
    if (!spawn.released) {
      Matter.Body.setStatic(body, false);
      Matter.Body.scale(body, scale, scale);
      Matter.Body.setPosition(body, spawnPosition(spawn, next.width, next.height));
      Matter.Body.setStatic(body, true);
      continue;
    }
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
    const dy = body.bounds.max.y > floor ? floor - body.bounds.max.y
      : body.bounds.min.y < top ? top - body.bounds.min.y : 0;
    Matter.Body.translate(body, { x: dx, y: dy });
    // A narrower viewport can compress separate shapes into one another.
    // Lift overlapping shapes before restarting physics so none begin interlocked.
    while (placed.some((other) => Matter.Bounds.overlaps(body.bounds, other.bounds))) {
      Matter.Body.translate(body, { x: 0, y: -(body.bounds.max.y - body.bounds.min.y + 8) });
    }
    placed.push(body);
    Matter.Sleeping.set(body, false);
  }

  Matter.Composite.remove(engine.world, bounds);
  Matter.Composite.add(engine.world, nextBounds);
  Matter.Engine.clear(engine);
  return nextBounds;
}
