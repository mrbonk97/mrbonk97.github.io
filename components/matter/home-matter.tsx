"use client";

import gsap from "gsap";
import Matter from "matter-js";
import { useRouter } from "next/navigation";
import { RefObject, useEffect, useRef } from "react";

interface Props {
  mainRef: RefObject<HTMLDivElement | null>;
}

export function HomeMatter({ mainRef }: Props) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  const router = useRouter();

  const init = (height: number, width: number) => {
    const min = Math.min(height, width);
    const fontSize = min * 0.08;
    const base = min * 0.2;

    const engine = Matter.Engine.create();
    engineRef.current = engine;
    engine.gravity.y = 0;

    setTimeout(() => {
      engine.gravity.y = 1;
    }, 1000);

    // create a renderer
    const render = Matter.Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        height: height,
        width: width,
        wireframes: false,
        background: "transparent",
      },
    });
    renderRef.current = render;

    // 벽 4개 생성
    const ground = Matter.Bodies.rectangle(width / 2, height + 12, width, 32, {
      isStatic: true,
      render: { visible: false },
    });
    const ceiling = Matter.Bodies.rectangle(width / 2, -height * 4, width, 32, {
      isStatic: true,
      render: { visible: false },
    });
    const leftWall = Matter.Bodies.rectangle(-12, 0, 32, height * 10, {
      isStatic: true,
      render: { visible: false },
    });

    const rightWall = Matter.Bodies.rectangle(width + 12, 0, 32, height * 10, {
      isStatic: true,
      render: { visible: false },
    });

    const circle = Matter.Bodies.circle(width / 2, -base, base * 0.6, {
      render: { fillStyle: "#FCE38A" },
      restitution: 0.8,
    });

    const pentagon = Matter.Bodies.polygon(width / 2, -384, 5, base * 0.7, {
      chamfer: { radius: 8 },
      render: { fillStyle: "#FA812F" },
      restitution: 0.8,
    });

    const project = Matter.Bodies.rectangle(width / 2, -768, base * 3, base, {
      chamfer: { radius: base / 2 },
      render: { fillStyle: "#FF9494" },
      restitution: 0.8,
    });

    const box = Matter.Bodies.rectangle(width / 2, -1152, base, base, {
      chamfer: { radius: 5 },
      render: { fillStyle: "#BF9270" },
      restitution: 0.8,
    });

    const pill = Matter.Bodies.rectangle(width / 2, -1536, base * 2, base, {
      chamfer: { radius: base / 2 },
      render: { fillStyle: "#dbe2ef" },
      restitution: 0.8,
    });

    const triangle = Matter.Bodies.polygon(width / 2, -1920, 3, base * 0.6, {
      chamfer: { radius: 5 },
      render: { fillStyle: "#B4DEBD" },
      restitution: 0.8,
    });

    Matter.Composite.add(engine.world, [
      ground,
      ceiling,
      leftWall,
      rightWall,
      project,
      pill,
      circle,
      pentagon,
      triangle,
      box,
    ]);

    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;

      ctx.save();
      ctx.translate(project.position.x, project.position.y);
      ctx.rotate(project.angle);
      ctx.font = `700 ${fontSize}px Noto Sans KR`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("살펴보기", 0, 12);
      ctx.restore();
    });

    // Mouse control 추가
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.005 },
    });
    Matter.World.add(engine.world, mouseConstraint);

    // 클릭 감지용 변수
    let mouseDownPosition: { x: number; y: number } | null = null;

    Matter.Events.on(mouseConstraint, "mousedown", (event) => {
      mouseDownPosition = {
        x: event.mouse.position.x,
        y: event.mouse.position.y,
      };
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

      // 이동 거리가 작으면 클릭으로 간주
      if (distance < 5) {
        const bodies = Matter.Query.point([project, pill], mouseUpPosition);

        if (bodies.includes(project)) {
          gsap.to(mainRef.current, {
            scale: 0.9,
            overflow: "hidden",
            borderRadius: "16px",
            duration: 0.6,
            ease: "power2.out",
          });

          gsap.to(mainRef.current, {
            delay: 1,
            y: "-100%",
            ease: "power2.out",
          });

          setTimeout(() => router.push("/about"), 1500);
        }
      }

      mouseDownPosition = null; // 초기화
    });

    // 마우스 이동 시 cursor 변경
    Matter.Events.on(mouseConstraint, "mousemove", (event) => {
      const mousePosition = event.mouse.position;
      const bodies = Matter.Query.point(
        [project, pill, circle, pentagon, triangle, box],
        mousePosition
      );

      if (bodies.length > 0) {
        render.canvas.style.cursor = "pointer";
      } else {
        render.canvas.style.cursor = "default";
      }
    });

    Matter.Render.run(render);
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);
  };

  useEffect(() => {
    if (!sceneRef.current) return;

    const handleResize = () => {
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
        renderRef.current.canvas.remove();
        renderRef.current.textures = {};
      }
      init(window.innerHeight, window.innerWidth);
    };

    document.fonts.ready.then(() => {
      init(window.innerHeight, window.innerWidth);
      window.addEventListener("resize", handleResize);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sceneRef}
      className="absolute h-screen top-0 left-0 right-0"
    />
  );
}
