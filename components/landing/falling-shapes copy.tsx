"use client";

import Matter from "matter-js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import {
  createBounds,
  createShapes,
  shapeSize,
  resizeShapes,
  SHAPE_LINKS,
} from "@/lib/falling-shapes";
import { createShapeClickTracker } from "@/lib/shape-click";
import { pretendard } from "@/lib/fonts";

// Matter attaches these DOM listeners but its type definitions omit them.
type BoundMouse = Matter.Mouse & {
  mousemove: EventListener;
  mousedown: EventListener;
  mouseup: EventListener;
  mousewheel: EventListener;
};

export function FallingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    const engine = Matter.Engine.create({ enableSleeping: true });
    const runner = Matter.Runner.create({ delta: 1000 / 60 });
    const render = Matter.Render.create({
      element: container,
      engine,
      options: {
        width,
        height,
        pixelRatio: Math.min(window.devicePixelRatio || 1, 2),
        background: "transparent",
        wireframes: false,
        showSleeping: false,
      },
    });
    render.canvas.style.display = "block";
    render.canvas.setAttribute("aria-hidden", "true");

    const shapes = createShapes(width, height);
    let bounds = createBounds(width, height);
    Matter.Composite.add(engine.world, [...bounds, ...shapes]);
    const linkedShapes = SHAPE_LINKS.map((link) => ({
      ...link,
      body: shapes.find((body) => body.label === link.shape)!,
    }));
    const clickTracker = createShapeClickTracker();
    let disposed = false;

    function drawLabels() {
      const context = render.context;
      context.save();
      context.font = `700 ${Math.max(18, shapeSize(width, height) * 0.45)}px ${pretendard.style.fontFamily}`;
      context.fillStyle = "#ffffff";
      context.textAlign = "center";
      context.textBaseline = "middle";
      for (const { body, label } of linkedShapes) {
        context.save();
        context.translate(body.position.x, body.position.y);
        context.rotate(body.angle);
        context.fillText(label, 0, 0);
        context.restore();
      }
      context.restore();
    }
    Matter.Events.on(render, "afterRender", drawLabels);
    void document.fonts
      .load(`700 32px ${pretendard.style.fontFamily}`, "프로젝트 블로그 소개")
      .then(() => {
        if (!disposed) Matter.Render.world(render);
      });

    const mouse = Matter.Mouse.create(render.canvas) as BoundMouse;
    mouse.pixelRatio = render.options.pixelRatio ?? 1;
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      // Match the reference's soft pull and Matter's green spring renderer.
      constraint: {
        stiffness: 0.002,
        render: { visible: true, strokeStyle: "#90ee90", lineWidth: 3 },
      },
    });
    Matter.Composite.add(engine.world, mouseConstraint);
    // Dragging should not capture the page's wheel scrolling.
    render.canvas.removeEventListener("wheel", mouse.mousewheel);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let ready = false;
    let running = false;

    function stop() {
      Matter.Runner.stop(runner);
      running = false;
    }

    function syncPlayback() {
      if (!ready || document.hidden || reducedMotion.matches) {
        stop();
      } else if (
        !running &&
        (mouse.button === 0 || shapes.some((body) => !body.isSleeping))
      ) {
        running = true;
        Matter.Runner.run(runner, engine);
      }
    }

    // Paint on the physics loop and stop it once the pile has settled.
    function paint() {
      Matter.Render.world(render);
      updateCursor();
      if (
        mouse.button !== 0 &&
        !mouseConstraint.body &&
        shapes.every((body) => body.isSleeping)
      )
        stop();
    }
    Matter.Events.on(runner, "afterTick", paint);

    function updateCursor() {
      render.canvas.style.cursor = mouseConstraint.body
        ? "grabbing"
        : Matter.Query.point(shapes, mouse.position).length
          ? "pointer"
          : "default";
    }

    function wakeForDrag() {
      // A settled scene has no active runner; wake it before MouseConstraint updates.
      for (const body of Matter.Query.point(shapes, mouse.position)) {
        Matter.Sleeping.set(body, false);
      }
      syncPlayback();
    }

    function releaseDrag() {
      clickTracker.cancel();
      mouse.button = -1;
      // MouseConstraint detaches on the next physics update, preserving velocity.
      syncPlayback();
    }

    function handleVisibility() {
      if (document.hidden || reducedMotion.matches) releaseDrag();
      syncPlayback();
    }

    function pointerPosition(event: PointerEvent) {
      const rect = render.canvas.getBoundingClientRect();
      return {
        x: ((event.clientX - rect.left) * width) / rect.width,
        y: ((event.clientY - rect.top) * height) / rect.height,
      };
    }

    function hitTarget(point: Matter.Vector) {
      // Last body is painted on top when shapes overlap.
      const hits = Matter.Query.point(shapes, point);
      return hits.at(-1)?.label ?? null;
    }

    function onPointerDown(event: PointerEvent) {
      if (!event.isPrimary || event.button !== 0) return;
      const point = pointerPosition(event);
      clickTracker.start(event.pointerId, hitTarget(point), point);
      render.canvas.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      clickTracker.move(event.pointerId, pointerPosition(event));
    }

    function onPointerUp(event: PointerEvent) {
      const point = pointerPosition(event);
      const target = clickTracker.finish(
        event.pointerId,
        hitTarget(point),
        point,
      );
      if (render.canvas.hasPointerCapture(event.pointerId)) {
        render.canvas.releasePointerCapture(event.pointerId);
      }
      const link = SHAPE_LINKS.find((item) => item.shape === target);
      if (link) {
        releaseDrag();
        router.push(link.href);
      }
    }

    render.canvas.addEventListener("pointerdown", onPointerDown);
    render.canvas.addEventListener("pointermove", onPointerMove);
    render.canvas.addEventListener("pointerup", onPointerUp);
    render.canvas.addEventListener("pointercancel", releaseDrag);
    render.canvas.addEventListener("lostpointercapture", releaseDrag);

    render.canvas.addEventListener("mousemove", updateCursor);
    render.canvas.addEventListener("mousedown", wakeForDrag);
    render.canvas.addEventListener("touchstart", wakeForDrag, {
      passive: true,
    });
    render.canvas.addEventListener("touchcancel", releaseDrag);
    window.addEventListener("mouseup", releaseDrag);
    window.addEventListener("touchend", releaseDrag);
    window.addEventListener("blur", releaseDrag);

    // Like the reference, release the shapes near the end of the 1s curtain.
    const entranceTimer = window.setTimeout(() => {
      ready = true;
      syncPlayback();
    }, 800);

    const resizeScene = () => {
      const nextWidth = container.clientWidth;
      const nextHeight = container.clientHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      if (
        !nextWidth ||
        !nextHeight ||
        (nextWidth === width && nextHeight === height && pixelRatio === render.options.pixelRatio)
      )
        return;

      releaseDrag();
      stop();
      bounds = resizeShapes(engine, shapes, bounds,
        { width, height }, { width: nextWidth, height: nextHeight });
      width = nextWidth;
      height = nextHeight;
      Matter.Render.setSize(render, width, height);
      Matter.Render.setPixelRatio(render, pixelRatio);
      mouse.pixelRatio = render.options.pixelRatio ?? 1;
      Matter.Render.world(render);
      syncPlayback();
    };
    const resizeObserver = new ResizeObserver(resizeScene);
    resizeObserver.observe(container);
    window.addEventListener("resize", resizeScene);
    document.addEventListener("visibilitychange", handleVisibility);
    reducedMotion.addEventListener("change", handleVisibility);

    return () => {
      disposed = true;
      window.clearTimeout(entranceTimer);
      resizeObserver.disconnect();
      window.removeEventListener("resize", resizeScene);
      document.removeEventListener("visibilitychange", handleVisibility);
      reducedMotion.removeEventListener("change", handleVisibility);
      window.removeEventListener("mouseup", releaseDrag);
      window.removeEventListener("touchend", releaseDrag);
      window.removeEventListener("blur", releaseDrag);
      render.canvas.removeEventListener("pointerdown", onPointerDown);
      render.canvas.removeEventListener("pointermove", onPointerMove);
      render.canvas.removeEventListener("pointerup", onPointerUp);
      render.canvas.removeEventListener("pointercancel", releaseDrag);
      render.canvas.removeEventListener("lostpointercapture", releaseDrag);
      render.canvas.removeEventListener("mousemove", updateCursor);
      render.canvas.removeEventListener("mousedown", wakeForDrag);
      render.canvas.removeEventListener("touchstart", wakeForDrag);
      render.canvas.removeEventListener("touchcancel", releaseDrag);
      render.canvas.removeEventListener("mousemove", mouse.mousemove);
      render.canvas.removeEventListener("mousedown", mouse.mousedown);
      render.canvas.removeEventListener("mouseup", mouse.mouseup);
      render.canvas.removeEventListener("touchmove", mouse.mousemove);
      render.canvas.removeEventListener("touchstart", mouse.mousedown);
      render.canvas.removeEventListener("touchend", mouse.mouseup);
      Matter.Mouse.clearSourceEvents(mouse);
      stop();
      Matter.Events.off(runner, "afterTick", paint);
      Matter.Events.off(render, "afterRender", drawLabels);
      Matter.Events.off(engine, "beforeUpdate");
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [router]);

  return (
    <>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed inset-0 z-20 touch-none select-none overflow-hidden motion-reduce:invisible"
      />
      <nav
        aria-label="주요 페이지"
        className="fixed inset-x-0 bottom-8 z-30 flex justify-center gap-3"
      >
        {SHAPE_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            prefetch={false}
            className="sr-only rounded-full bg-custom-400 px-5 py-3 font-bold text-custom-100 focus:not-sr-only focus:outline-2 focus:outline-offset-4 focus:outline-custom-400 motion-reduce:not-sr-only"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
