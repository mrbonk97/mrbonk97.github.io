"use client";

import Matter from "matter-js";
import { getShapes } from "@/constants/matter-object";
import { RefObject, useEffect, useRef } from "react";

interface UseMatterSceneParams {
  handleRoute: (url: string) => void;
  containerRef: RefObject<HTMLDivElement | null>;
}

export function useMatterScene({
  handleRoute,
  containerRef,
}: UseMatterSceneParams) {
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);

  const groundRef = useRef<Matter.Body | null>(null);
  const ceilingRef = useRef<Matter.Body | null>(null);
  const leftWallRef = useRef<Matter.Body | null>(null);
  const rightWallRef = useRef<Matter.Body | null>(null);

  const cleanupMatter = () => {
    const render = renderRef.current;
    const runner = runnerRef.current;
    const engine = engineRef.current;

    if (render) {
      Matter.Render.stop(render);
    }

    if (runner) {
      Matter.Runner.stop(runner);
    }

    if (engine) {
      Matter.Composite.clear(engine.world, false);
      Matter.Engine.clear(engine);
    }

    if (render?.canvas && render.canvas.parentNode) {
      render.canvas.parentNode.removeChild(render.canvas);
    }

    if (render) {
      // matter 내부 캐시 정리
      render.textures = {};
    }

    engineRef.current = null;
    renderRef.current = null;
    runnerRef.current = null;

    groundRef.current = null;
    ceilingRef.current = null;
    leftWallRef.current = null;
    rightWallRef.current = null;
  };

  const resizeMatter = () => {
    const render = renderRef.current;
    const ground = groundRef.current;
    const ceiling = ceilingRef.current;
    const leftWall = leftWallRef.current;
    const rightWall = rightWallRef.current;

    if (!render || !ground || !ceiling || !leftWall || !rightWall) {
      return;
    }

    const width = window.innerWidth;
    const height = window.innerHeight;
    const extraTopHeight = height * 2; // 위로 2배 확장
    const worldTop = -extraTopHeight;
    const worldBottom = height;
    const worldHeight = worldBottom - worldTop; // 2배 높이
    const thickness = 100;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    render.options.width = width;
    render.options.height = worldHeight;
    render.options.pixelRatio = pixelRatio;

    render.canvas.width = width * pixelRatio;
    render.canvas.height = worldHeight * pixelRatio;
    render.canvas.style.width = `${width}px`;
    render.canvas.style.height = `${worldHeight}px`;

    // 바닥: 화면 하단 고정
    Matter.Body.setPosition(ground, {
      x: width / 2,
      y: worldBottom + thickness / 2,
    });
    Matter.Body.setVertices(
      ground,
      Matter.Bodies.rectangle(
        width / 2,
        worldBottom + thickness / 2,
        width,
        thickness,
      ).vertices,
    );

    // 천장: 엄청 위로
    Matter.Body.setPosition(ceiling, {
      x: width / 2,
      y: worldTop - thickness / 2,
    });
    Matter.Body.setVertices(
      ceiling,
      Matter.Bodies.rectangle(
        width / 2,
        worldTop - thickness / 2,
        width,
        thickness,
      ).vertices,
    );

    // 왼쪽 벽
    Matter.Body.setPosition(leftWall, {
      x: -thickness / 2,
      y: worldTop + worldHeight / 2,
    });
    Matter.Body.setVertices(
      leftWall,
      Matter.Bodies.rectangle(
        -thickness / 2,
        worldTop + worldHeight / 2,
        thickness,
        worldHeight,
      ).vertices,
    );

    // 오른쪽 벽
    Matter.Body.setPosition(rightWall, {
      x: width + thickness / 2,
      y: worldTop + worldHeight / 2,
    });
    Matter.Body.setVertices(
      rightWall,
      Matter.Bodies.rectangle(
        width + thickness / 2,
        worldTop + worldHeight / 2,
        thickness,
        worldHeight,
      ).vertices,
    );
  };

  useEffect(() => {
    if (!handleRoute) return;

    const container = containerRef.current;
    if (!container) return;

    // Strict Mode 안전 처리
    cleanupMatter();

    const width = window.innerWidth;
    const height = window.innerHeight;
    const extraTopHeight = height * 2; // 위로 2배 확장
    const worldTop = -extraTopHeight;
    const worldBottom = height;
    const worldHeight = worldBottom - worldTop; // 2배 높이
    const thickness = 100;
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

    const engine = Matter.Engine.create();
    engine.gravity.y = 0;

    setTimeout(() => {
      engine.gravity.y = 1;
    }, 800);

    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";

    container.appendChild(canvas);

    const render = Matter.Render.create({
      canvas,
      engine,
      options: {
        width,
        height: height,
        wireframes: false,
        background: "transparent",
        pixelRatio,
      },
    });

    const runner = Matter.Runner.create();

    const ground = Matter.Bodies.rectangle(
      width / 2,
      worldBottom + thickness / 2,
      width,
      thickness,
      {
        isStatic: true,
        render: {
          visible: false,
        },
      },
    );

    const ceiling = Matter.Bodies.rectangle(
      width / 2,
      worldTop - thickness / 2,
      width,
      thickness,
      {
        isStatic: true,
        render: {
          visible: false,
        },
      },
    );

    const leftWall = Matter.Bodies.rectangle(
      -thickness / 2,
      worldTop + worldHeight / 2,
      thickness,
      worldHeight,
      {
        isStatic: true,
        render: {
          visible: false,
        },
      },
    );

    const rightWall = Matter.Bodies.rectangle(
      width + thickness / 2,
      worldTop + worldHeight / 2,
      thickness,
      worldHeight,
      {
        isStatic: true,
        render: {
          visible: false,
        },
      },
    );

    const shapes = getShapes(width / 2, height / 2);

    Matter.Composite.add(engine.world, [
      ground,
      ceiling,
      leftWall,
      rightWall,
      ...shapes,
    ]);

    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;

      ctx.save();
      ctx.font = `700 ${Math.min(width, height) / 20}px Noto Sans KR`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.save();
      ctx.translate(shapes[0].position.x, shapes[0].position.y);
      ctx.rotate(shapes[0].angle);
      ctx.fillText("소개", 0, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(shapes[5].position.x, shapes[5].position.y);
      ctx.rotate(shapes[5].angle);
      ctx.fillText("블로그", 0, 0);
      ctx.restore();

      ctx.save();
      ctx.translate(shapes[9].position.x, shapes[9].position.y);
      ctx.rotate(shapes[9].angle);
      ctx.fillText("프로젝트", 0, 0);
      ctx.restore();
    });

    // Mouse control 추가
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.002 },
    });

    // 마우스 이동 시 cursor 변경
    Matter.Events.on(mouseConstraint, "mousemove", (event) => {
      const mousePosition = event.mouse.position;
      const bodies = Matter.Query.point(shapes, mousePosition);

      if (bodies.length > 0) {
        render.canvas.style.cursor = "pointer";
      } else {
        render.canvas.style.cursor = "default";
      }
    });

    // 클릭 감지용 변수
    let mouseDownPosition: { x: number; y: number } | null = null;
    let clickedBody: Matter.Body | null = null;

    Matter.Events.on(mouseConstraint, "mousedown", (event) => {
      mouseDownPosition = {
        x: event.mouse.position.x,
        y: event.mouse.position.y,
      };

      // 클릭된 바디 저장
      clickedBody = mouseConstraint.body;
    });

    Matter.Events.on(mouseConstraint, "mouseup", (event) => {
      if (!mouseDownPosition) return;

      const mouseUpPosition = {
        x: event.mouse.position.x,
        y: event.mouse.position.y,
      };

      const dx = mouseUpPosition.x - mouseDownPosition.x;
      const dy = mouseUpPosition.y - mouseDownPosition.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 5 && clickedBody) {
        if (clickedBody === shapes[0]) {
          handleRoute("/about-me");
        }

        if (clickedBody === shapes[5]) {
          handleRoute("/blog");
        }

        if (clickedBody === shapes[9]) {
          handleRoute("/projects");
        }
      }
    });

    Matter.World.add(engine.world, mouseConstraint);
    Matter.Runner.run(runner, engine);
    Matter.Render.run(render);

    engineRef.current = engine;
    renderRef.current = render;
    runnerRef.current = runner;

    groundRef.current = ground;
    ceilingRef.current = ceiling;
    leftWallRef.current = leftWall;
    rightWallRef.current = rightWall;

    window.addEventListener("resize", resizeMatter);

    return () => {
      window.removeEventListener("resize", resizeMatter);
      cleanupMatter();
    };
  }, [handleRoute, containerRef]);
}
