"use client";

import Matter from "matter-js";
import Link from "next/link";
import { useCurtainNavigation } from "@/components/curtain-navigation";
import { useEffect, useRef } from "react";
import { BASIC_SHAPES, FALLING_SHAPES, SHAPE_COUNT } from "@/constants/falling-shapes";
import {
  createBounds,
  createShapes,
  resizeShapes,
  SHAPE_CORNER_RADIUS,
  releaseShapes,
} from "@/lib/falling-shapes";

// Matter attaches these DOM listeners but its type definitions omit them.
type BoundMouse = Matter.Mouse & {
  mousemove: EventListener;
  mousedown: EventListener;
  mouseup: EventListener;
  mousewheel: EventListener;
};

export function FallingShapes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useCurtainNavigation();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;
    const engine = Matter.Engine.create({ enableSleeping: true, positionIterations: 8, velocityIterations: 8 });
    const runner = Matter.Runner.create({ delta: 1000 / 120 });
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
    render.canvas.style.opacity = "0";
    render.canvas.style.pointerEvents = "none";
    render.canvas.setAttribute("aria-hidden", "true");

    const theme = getComputedStyle(container);
    const palette = {
      100: theme.getPropertyValue("--custom-100").trim(),
      300: theme.getPropertyValue("--custom-300").trim(),
      400: theme.getPropertyValue("--custom-400").trim(),
    };
    const shapes = createShapes(width, height, palette);
    const shapeLinks = new Map(shapes.flatMap((shape, index) => {
      const link = FALLING_SHAPES[index].link;
      return link ? [[shape, link] as const] : [];
    }));
    let bounds = createBounds(width, height);
    Matter.Composite.add(engine.world, [...bounds, ...shapes]);
    let disposed = false;
    let ready = false;
    let introElapsed = 0;
    let introFrame = 0;
    let previousIntroFrame: number | null = null;
    let press: {
      pointerId: number;
      body: Matter.Body;
      x: number;
      y: number;
      startedAt: number;
      dragged: boolean;
    } | null = null;
    function releaseNextShapes() {
      releaseShapes(shapes, engine.timing.timestamp);
    }
    Matter.Events.on(engine, "beforeUpdate", releaseNextShapes);

    const mouse = Matter.Mouse.create(render.canvas) as BoundMouse;
    mouse.pixelRatio = render.options.pixelRatio ?? 1;
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      // Show the spring connecting the pointer to the shape while dragging.
      constraint: {
        stiffness: 0.002,
        render: { visible: true, strokeStyle: "#90ee90", lineWidth: 3 },
      },
    });
    Matter.Composite.add(engine.world, mouseConstraint);
    // Dragging should not capture the page's wheel scrolling.
    render.canvas.removeEventListener("wheel", mouse.mousewheel);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let running = false;

    function stop() {
      Matter.Runner.stop(runner);
      running = false;
    }

    function stopIntro() {
      window.cancelAnimationFrame(introFrame);
      introFrame = 0;
      previousIntroFrame = null;
    }

    function animateIntro(timestamp: number) {
      introFrame = 0;
      if (disposed || document.hidden || reducedMotion.matches) {
        previousIntroFrame = null;
        return;
      }
      if (previousIntroFrame !== null) {
        introElapsed += Math.min(timestamp - previousIntroFrame, 64);
      }
      previousIntroFrame = timestamp;

      // Once the curtain has entered, release the shape under gravity.
      if (introElapsed >= 800) {
        render.canvas.style.opacity = "1";
        render.canvas.style.pointerEvents = "auto";
        ready = true;
        previousIntroFrame = null;
        syncPlayback();
      } else {
        introFrame = window.requestAnimationFrame(animateIntro);
      }
    }

    function syncPlayback() {
      if (document.hidden || reducedMotion.matches) {
        stop();
        stopIntro();
      } else if (!ready) {
        stop();
        if (!introFrame)
          introFrame = window.requestAnimationFrame(animateIntro);
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
        shapes.every((body) => !body.isStatic && body.isSleeping)
      )
        stop();
    }
    Matter.Events.on(runner, "afterTick", paint);

    function paintLabels() {
      const context = render.context;
      context.save();
      const ratio = render.options.pixelRatio ?? 1;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.font = `700 24px ${theme.fontFamily}`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      for (const body of shapes) {
        if (!body.render.visible) continue;
        const link = shapeLinks.get(body);
        if (!link) continue;
        context.save();
        context.translate(body.position.x, body.position.y);
        context.rotate(body.angle);
        context.fillStyle = palette[400];
        // Keep labels inside the smaller polygons, including on mobile.
        context.fillText(link.label, 0, 0, Math.sqrt(body.area) * 0.8);
        context.restore();
      }
      context.restore();
    }
    Matter.Events.on(render, "afterRender", paintLabels);

    function updateCursor() {
      const body = shapeAt(mouse.position);
      render.canvas.style.cursor = mouseConstraint.body
        ? "grabbing"
        : body
          ? shapeLinks.has(body) ? "pointer" : "grab"
          : "default";
      render.canvas.title = body ? shapeLinks.get(body)?.label ?? "" : "";
    }

    function shapeAt(point: Matter.Vector) {
      return Matter.Query.point(shapes, point).filter((body) => body.render.visible).at(-1);
    }

    function pointerPosition(event: PointerEvent) {
      const rect = render.canvas.getBoundingClientRect();
      return {
        x: (event.clientX - rect.left) * width / rect.width,
        y: (event.clientY - rect.top) * height / rect.height,
      };
    }

    function wakeForDrag() {
      // A settled scene has no active runner; wake it before MouseConstraint updates.
      for (const body of Matter.Query.point(shapes, mouse.position)) {
        Matter.Sleeping.set(body, false);
      }
      syncPlayback();
    }

    function releaseDrag() {
      press = null;
      mouse.button = -1;
      // MouseConstraint detaches on the next physics update, preserving velocity.
      syncPlayback();
    }

    function handleVisibility() {
      if (document.hidden || reducedMotion.matches) releaseDrag();
      syncPlayback();
    }

    function onPointerDown(event: PointerEvent) {
      if (!event.isPrimary || event.button !== 0) return;
      const body = shapeAt(pointerPosition(event));
      press = body && shapeLinks.has(body) ? {
        pointerId: event.pointerId,
        body,
        x: event.clientX,
        y: event.clientY,
        startedAt: event.timeStamp,
        dragged: false,
      } : null;
      render.canvas.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      if (!press || event.pointerId !== press.pointerId) return;
      if (Math.hypot(event.clientX - press.x, event.clientY - press.y) > 8) {
        press.dragged = true;
      }
    }

    function onPointerUp(event: PointerEvent) {
      if (!event.isPrimary) return;
      onPointerMove(event);
      const clicked = press
        && press.pointerId === event.pointerId
        && !press.dragged
        && event.timeStamp - press.startedAt < 500
        && shapeAt(pointerPosition(event)) === press.body
        ? press.body : null;
      if (render.canvas.hasPointerCapture(event.pointerId)) {
        render.canvas.releasePointerCapture(event.pointerId);
      }
      releaseDrag();
      if (clicked) navigate(shapeLinks.get(clicked)!.href);
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

    syncPlayback();

    const resizeScene = () => {
      const nextWidth = container.clientWidth;
      const nextHeight = container.clientHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      if (
        !nextWidth ||
        !nextHeight ||
        (nextWidth === width &&
          nextHeight === height &&
          pixelRatio === render.options.pixelRatio)
      )
        return;

      releaseDrag();
      stop();
      // Resize each body independently; a shared fall distance would stack them together.
      bounds = resizeShapes(
        engine,
        shapes,
        bounds,
        { width, height },
        { width: nextWidth, height: nextHeight },
      );
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
      stopIntro();
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
      Matter.Events.off(render, "afterRender", paintLabels);
      Matter.Events.off(engine, "beforeUpdate", releaseNextShapes);
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, [navigate]);

  return (
    <>
      <div
        ref={containerRef}
        aria-hidden="true"
        className="fixed inset-0 z-20 touch-none select-none overflow-hidden motion-reduce:invisible"
      />
      <svg
        className="pointer-events-none fixed inset-x-0 bottom-0 z-20 hidden h-[32svh] w-full motion-reduce:block"
        viewBox={`0 0 1024 ${Math.ceil(SHAPE_COUNT / 8) * 128}`}
        preserveAspectRatio="xMidYMax meet"
      >
        {FALLING_SHAPES.map((definition, index) => {
          const form = BASIC_SHAPES.find(({ kind }) => kind === definition.kind)!;
          const color = `var(--custom-${definition.color})`;
          const size = definition.size / 2;
          const shape = (
            <g
              key={definition.id}
              aria-hidden={definition.link ? undefined : true}
              transform={`translate(${index % 8 * 128 + 64} ${Math.floor(index / 8) * 128 + 64})`}
              fill={color}
            >
              {form.kind === "circle" ? <circle r={size / 2} /> : form.sides ? (
                <polygon
                  stroke={color}
                  strokeWidth={SHAPE_CORNER_RADIUS * 2}
                  strokeLinejoin="round"
                  points={Array.from({ length: form.sides }, (_, vertex) => {
                    const angle = (vertex + 0.5) * Math.PI * 2 / form.sides;
                    return `${Math.cos(angle) * size / 2},${Math.sin(angle) * size / 2}`;
                  }).join(" ")}
                />
              ) : (
                <rect
                  x={-size * form.width / 2}
                  y={-size * form.height / 2}
                  width={size * form.width}
                  height={size * form.height}
                  rx={form.radius ? size * form.radius : SHAPE_CORNER_RADIUS}
                />
              )}
              {definition.link && (
                <text textAnchor="middle" dominantBaseline="central" fill="var(--custom-400)" className="font-bold">
                  {definition.link.label}
                </text>
              )}
            </g>
          );
          const link = definition.link;
          return link ? (
            <Link
              key={definition.id}
              href={link.href}
              onNavigate={(event) => {
                event.preventDefault();
                navigate(link.href);
              }}
              prefetch={false}
              className="pointer-events-auto"
            >
              {shape}
            </Link>
          ) : shape;
        })}
      </svg>
    </>
  );
}
