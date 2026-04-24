import Matter from "matter-js";

export function getShapes(w: number, h: number) {
  const base = Math.min(w, h) * 2;
  const arr = [];

  const SHAPE = [
    // 1층
    {
      x: w - base * 0.3,
      y: -h * 0.1 - base * 0.1,
      width: base * 0.35,
      height: base * 0.15,
      color: "#79ac78",
    },
    {
      x: w,
      y: -h * 0.1 - base * 0.2,
      width: base * 0.1,
      height: 0,
      color: "#fce38a",
    },
    {
      x: w + base * 0.32,
      y: -h * 0.1 - base * 0.25,
      width: base * 0.12,
      height: 0,
      color: "#ea5455",
    },

    // 2층
    {
      x: w - base * 0.3,
      y: -h * 0.1 - base * 0.4,
      width: base * 0.15,
      height: base * 0.15,
      color: "#55efc4",
    },
    {
      x: w + base * 0.02,
      y: -h * 0.1 - base * 0.45,
      width: base * 0.12,
      height: 0,
      color: "#fd79a8",
    },
    {
      x: w + base * 0.3,
      y: -h * 0.1 - base * 0.5,
      width: base * 0.4,
      height: base * 0.15,
      color: "#74b9ff",
    },

    // 3층
    {
      x: w - base * 0.35,
      y: -h * 0.1 - base * 0.6,
      width: base * 0.2,
      height: base * 0.15,
      color: "#e17055",
    },
    {
      x: w - base * 0.1,
      y: -h * 0.1 - base * 0.65,
      width: base * 0.12,
      height: 0,
      color: "#fab1a0",
    },
    {
      x: w + base * 0.25,
      y: -h * 0.1 - base * 0.75,
      width: base * 0.2,
      height: base * 0.2,
      color: "#a29bfe",
    },

    // 4층
    {
      x: w - base * 0.2,
      y: -h * 0.1 - base * 0.85,
      width: base * 0.42,
      height: base * 0.18,
      color: "#f67280",
    },
    {
      x: w,
      y: -h * 0.1 - base * 1.1,
      width: base * 0.12,
      height: 0,
      color: "#fdcb6e",
    },
    {
      x: w + base * 0.25,
      y: -h * 0.1 - base * 1,
      width: base * 0.2,
      height: base * 0.2,
      color: "#2ecc71",
    },
  ];

  arr.push(
    Matter.Bodies.rectangle(
      SHAPE[0].x,
      SHAPE[0].y,
      SHAPE[0].width,
      SHAPE[0].height,
      {
        restitution: 0.85,
        friction: 0.05,
        frictionAir: 0.02,
        angle: (Math.PI / 8) * 0,
        chamfer: {
          radius: SHAPE[0].height / 2,
        },
        render: {
          fillStyle: SHAPE[0].color,
        },
      },
    ),
  );

  arr.push(
    Matter.Bodies.circle(SHAPE[1].x, SHAPE[1].y, SHAPE[1].width, {
      restitution: 0.85,
      friction: 0.05,
      frictionAir: 0.02,
      angle: (Math.PI / 8) * 1,
      render: {
        fillStyle: SHAPE[1].color,
      },
    }),
  );

  arr.push(
    Matter.Bodies.polygon(SHAPE[2].x, SHAPE[2].y, 5, SHAPE[2].width, {
      restitution: 0.85,
      friction: 0.05,
      frictionAir: 0.02,
      angle: (Math.PI / 8) * 2,
      render: {
        fillStyle: SHAPE[2].color,
      },
    }),
  );

  arr.push(
    Matter.Bodies.rectangle(
      SHAPE[3].x,
      SHAPE[3].y,
      SHAPE[3].width,
      SHAPE[3].height,
      {
        restitution: 0.85,
        friction: 0.05,
        frictionAir: 0.02,
        angle: (Math.PI / 8) * 3,
        chamfer: {
          radius: base * 0.003,
        },
        render: {
          fillStyle: SHAPE[3].color,
        },
      },
    ),
  );

  arr.push(
    Matter.Bodies.polygon(SHAPE[4].x, SHAPE[4].y, 6, SHAPE[4].width, {
      restitution: 0.85,
      friction: 0.05,
      frictionAir: 0.02,
      angle: (Math.PI / 8) * 4,
      render: {
        fillStyle: SHAPE[4].color,
      },
    }),
  );

  arr.push(
    Matter.Bodies.rectangle(
      SHAPE[5].x,
      SHAPE[5].y,
      SHAPE[5].width,
      SHAPE[5].height,
      {
        restitution: 0.85,
        friction: 0.05,
        frictionAir: 0.02,
        angle: (Math.PI / 8) * 1,
        chamfer: {
          radius: SHAPE[5].height / 2,
        },
        render: {
          fillStyle: SHAPE[5].color,
        },
      },
    ),
  );

  arr.push(
    Matter.Bodies.trapezoid(
      SHAPE[6].x,
      SHAPE[6].y,
      SHAPE[6].width,
      SHAPE[6].height,
      0.2,
      {
        restitution: 0.85,
        friction: 0.05,
        frictionAir: 0.02,
        angle: (Math.PI / 8) * 6,
        chamfer: {
          radius: base * 0.003,
        },
        render: {
          fillStyle: SHAPE[6].color,
        },
      },
    ),
  );

  arr.push(
    Matter.Bodies.polygon(SHAPE[7].x, SHAPE[7].y, 3, SHAPE[7].width, {
      restitution: 0.85,
      friction: 0.05,
      frictionAir: 0.02,
      angle: (Math.PI / 8) * 7,
      chamfer: {
        radius: base * 0.002,
      },
      render: {
        fillStyle: SHAPE[7].color,
      },
    }),
  );

  arr.push(
    Matter.Bodies.rectangle(
      SHAPE[8].x,
      SHAPE[8].y,
      SHAPE[8].width * 0.8,
      SHAPE[8].height * 0.8,
      {
        restitution: 0.85,
        friction: 0.05,
        frictionAir: 0.02,
        angle: (Math.PI / 8) * 8,
        render: {
          fillStyle: SHAPE[8].color,
        },
      },
    ),
  );

  arr.push(
    Matter.Bodies.rectangle(
      SHAPE[9].x,
      SHAPE[9].y,
      SHAPE[9].width,
      SHAPE[9].height,
      {
        restitution: 0.85,
        friction: 0.05,
        frictionAir: 0.02,
        angle: (Math.PI / 8) * 0,
        chamfer: {
          radius: SHAPE[9].height / 2,
        },
        render: {
          fillStyle: SHAPE[9].color,
        },
      },
    ),
  );

  arr.push(
    Matter.Bodies.circle(SHAPE[10].x, SHAPE[10].y, SHAPE[10].width, {
      restitution: 0.85,
      friction: 0.05,
      frictionAir: 0.02,
      angle: (Math.PI / 8) * 10,
      render: {
        fillStyle: SHAPE[10].color,
      },
    }),
  );

  arr.push(
    Matter.Bodies.rectangle(
      SHAPE[11].x,
      SHAPE[11].y,
      SHAPE[11].width * 1.1,
      SHAPE[11].height * 0.7,
      {
        restitution: 0.85,
        friction: 0.05,
        frictionAir: 0.02,
        angle: (Math.PI / 8) * 11,
        chamfer: {
          radius: (SHAPE[11].height * 0.7) / 2,
        },
        render: {
          fillStyle: SHAPE[11].color,
        },
      },
    ),
  );

  return arr;
}
