"use client";

import Matter from "matter-js";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export function HomeMatter() {
  const router = useRouter();
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);

  const init = (height: number, width: number, delay: number) => {
    const min = Math.min(height, width);
    const fontSize = min * 0.08;
    const base = min * 0.2;

    const engine = Matter.Engine.create();
    engineRef.current = engine;
    engine.gravity.y = 0;

    setTimeout(() => {
      engine.gravity.y = 1;
    }, delay);

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

    // ✅ 벽 4개 생성
    const ground = Matter.Bodies.rectangle(width / 2, height + 128, width, 256, {
      isStatic: true,
      restitution: 0.8,
      render: { visible: false },
    });
    const ceiling = Matter.Bodies.rectangle(width / 2, -height * 2, width, 256, {
      isStatic: true,
      restitution: 0.8,
      render: { visible: true },
    });
    const leftWall = Matter.Bodies.rectangle(-128, height / 2, 256, height * 2, {
      isStatic: true,
      restitution: 0.8,
      render: { visible: false },
    });
    const rightWall = Matter.Bodies.rectangle(width + 128, height / 2, 256, height * 2, {
      isStatic: true,
      restitution: 0.8,
      render: { visible: false },
    });

    const project = Matter.Bodies.rectangle(width / 5, -height - 400, base * 3, base, {
      chamfer: { radius: base / 2 },
      render: { fillStyle: "#FF9494" },
      restitution: 0.8,
    });

    const blog = Matter.Bodies.rectangle(width / 2, -height - 200, base * 2.5, base, {
      chamfer: { radius: base / 2 },
      render: { fillStyle: "#DCD6F7" },
      restitution: 0.8,
    });

    const aboutMe = Matter.Bodies.rectangle(width / 1.5, -height - 800, base * 2, base, {
      chamfer: { radius: base / 2 },
      render: { fillStyle: "#3F72AF" },
      restitution: 0.8,
    });

    const circle = Matter.Bodies.circle(width / 3, -height - 700, base * 0.8, {
      render: { fillStyle: "#FCE38A" },
      restitution: 0.8,
    });

    const pentagon = Matter.Bodies.polygon(width / 1.2, -height - 300, 5, base * 0.7, {
      chamfer: { radius: 5 },
      render: { fillStyle: "#F38181" },
      restitution: 0.8,
    });

    const triangle = Matter.Bodies.polygon(width / 5, -height - 100, 5, base * 0.6, {
      chamfer: { radius: 5 },
      render: { fillStyle: "#3b82f6" },
      restitution: 0.8,
    });

    const box = Matter.Bodies.rectangle(width / 2, -height - 600, base, base, {
      chamfer: { radius: 5 },
      render: { fillStyle: "#BF9270" },
      restitution: 0.8,
    });

    Matter.Composite.add(engine.world, [
      project,
      blog,
      aboutMe,
      circle,
      pentagon,
      triangle,
      box,
      ground,
      ceiling,
      leftWall,
      rightWall,
    ]);

    Matter.Events.on(render, "afterRender", () => {
      const ctx = render.context;

      ctx.save();
      ctx.translate(project.position.x, project.position.y);
      ctx.rotate(project.angle);
      ctx.font = `700 ${fontSize}px Asta Sans`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("프로젝트", 0, 12);
      ctx.restore();

      ctx.save();
      ctx.translate(aboutMe.position.x, aboutMe.position.y);
      ctx.rotate(aboutMe.angle);
      ctx.font = `700 ${fontSize}px Asta Sans`;
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("소개", 0, 12);
      ctx.restore();
    });

    // ✅ Mouse control 추가
    const mouse = Matter.Mouse.create(render.canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.005 },
    });
    Matter.World.add(engine.world, mouseConstraint);

    // ✅ 클릭 감지용 변수
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

      console.log("distance:", distance);

      // 👉 이동 거리가 작으면 "클릭"으로 간주
      if (distance < 5) {
        const bodies = Matter.Query.point([project, aboutMe], mouseUpPosition);

        if (bodies.includes(project)) {
          router.push("/projects");
        }

        if (bodies.includes(aboutMe)) {
          router.push("/about-me");
        }
      }

      mouseDownPosition = null; // 초기화
    });

    // ✅ 마우스 이동 시 cursor 변경
    Matter.Events.on(mouseConstraint, "mousemove", (event) => {
      const mousePosition = event.mouse.position;
      const bodies = Matter.Query.point(
        [project, blog, aboutMe, circle, pentagon, triangle, box],
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
      init(window.innerHeight, window.innerWidth, 0.5);
    };

    document.fonts.ready.then(() => {
      init(window.innerHeight, window.innerWidth, 0.5);
      window.addEventListener("resize", handleResize);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      if (renderRef.current) {
        Matter.Render.stop(renderRef.current);
      }
    };
  }, []);

  return <section ref={sceneRef} className="z-20 fixed inset-0 h-full w-full" />;
}
