import {
  basis,
  clamp,
  item,
  lerp,
  radians,
  spin,
  type Expression,
  type Frame,
  type Vec3,
} from "./types.ts";

export function blend(a: Expression, b: Expression, t: number): Expression {
  return {
    id: b.id,
    split: lerp(a.split, b.split, t),
    gaze: a.gaze.map((v, i) => lerp(v, item(b.gaze, i), t)) as Vec3,
    eyes: a.eyes.map(
      (eye, i) =>
        eye.map((v, j) => lerp(v, item(item(b.eyes, i), j), t)) as [
          number,
          number,
          number,
          number,
        ]
    ),
  };
}

/**
 * `offset` 是整颗球的位移，球半径单位：横向那一条是重音推出来的，竖向那一条是浮动与弹跳。
 * `eyeScale` 只缩眼睛，不缩身体。
 */
export function renderFace(
  expression: Expression,
  gaze: Vec3,
  offset: { x: number; y: number },
  squash: number,
  lid: number,
  eyeScale: number
): Frame {
  const { forward, right, down } = basis(gaze);
  const eyes = [-1, 1].flatMap((side, index) => {
    const [normal, tangent] = spin(
      forward,
      right,
      radians(expression.split * side)
    );
    if (normal[2] <= 0.02) return [];
    const cfg = item(expression.eyes, index),
      angle = radians(cfg[2]);
    const c = Math.cos(angle),
      s = Math.sin(angle);
    const k = 0.06 + 0.94 * clamp(Math.min(lid, cfg[3]));
    return [
      [
        cfg[0] * 100 * eyeScale,
        cfg[1] * 100 * eyeScale,
        tangent[0] * c + down[0] * s,
        (tangent[1] * c + down[1] * s) * k,
        -tangent[0] * s + down[0] * c,
        (-tangent[1] * s + down[1] * c) * k,
        (normal[0] + offset.x) * 100,
        (normal[1] + offset.y) * 100,
        clamp(normal[2] / 0.12),
      ],
    ];
  });
  return { gaze, center: [offset.x, offset.y], stretch: [1, squash], eyes };
}
