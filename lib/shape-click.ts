type Point = { x: number; y: number };

// Track the full gesture, so dragging away and back never becomes a click.
export function createShapeClickTracker() {
  let press: {
    pointerId: number;
    target: string;
    origin: Point;
    dragged: boolean;
  } | null = null;

  function move(pointerId: number, point: Point) {
    if (!press || press.pointerId !== pointerId) return;
    if (Math.hypot(point.x - press.origin.x, point.y - press.origin.y) >= 6) {
      press.dragged = true;
    }
  }

  return {
    start(pointerId: number, target: string | null, point: Point) {
      press = target ? { pointerId, target, origin: point, dragged: false } : null;
    },
    move,
    finish(pointerId: number, target: string | null, point: Point) {
      if (!press || press.pointerId !== pointerId) return null;
      move(pointerId, point);
      const clicked = !press.dragged && press.target === target ? target : null;
      press = null;
      return clicked;
    },
    cancel() {
      press = null;
    },
  };
}
