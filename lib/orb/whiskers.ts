import { basis, item, type Frame, type OrbModel, type Vec3 } from "./types.ts";

/** Port of OrbCatWhiskers: depth-clip curves before tapering each visible run. */
export function whiskerPaths(model: OrbModel, frame: Frame): number[][][] {
  const b = basis(frame.gaze),
    sy = item(frame.stretch, 1),
    cx = item(frame.center, 0),
    cy = item(frame.center, 1);
  const project = (v: Vec3): Vec3 => {
    const p = [0, 1, 2].map(
      (i) =>
        item(b.right, i) * v[0] +
        item(b.down, i) * v[1] +
        item(b.forward, i) * v[2]
    );
    return [(item(p, 0) + cx) * 100, (item(p, 1) * sy + cy) * 100, item(p, 2)];
  };
  const visible = (p: Vec3): boolean => {
    const radius = (p[0] / 100 - cx) ** 2 + ((p[1] / 100 - cy) / sy) ** 2;
    return radius > 1 || p[2] >= Math.sqrt(Math.max(0, 1 - radius)) - 0.0005;
  };
  const boundary = (from: Vec3, to: Vec3): Vec3 => {
    let a = from,
      b = to;
    const wasVisible = visible(from);
    for (let i = 0; i < 14; i++) {
      const mid = a.map((x, j) => (x + item(b, j)) / 2) as Vec3;
      if (visible(mid) === wasVisible) a = mid;
      else b = mid;
    }
    return a.map((x, i) => (x + item(b, i)) / 2) as Vec3;
  };
  return model.whiskers.flatMap((curve) => {
    const points = curve.map(project),
      runs: Vec3[][] = [];
    let current: Vec3[] = [];
    points.forEach((p, i) => {
      const isVisible = visible(p);
      if (i > 0 && isVisible !== visible(item(points, i - 1)))
        current.push(boundary(item(points, i - 1), p));
      if (!isVisible && current.length) {
        if (current.length > 1) runs.push(current);
        current = [];
      }
      if (isVisible) current.push(p);
    });
    if (current.length > 1) runs.push(current);
    return runs.map(taper);
  });
}

function taper(points: Vec3[]): number[][] {
  const first = item(points, 0),
    last = item(points, points.length - 1);
  const extent = Math.max(
    0.01,
    Math.hypot(last[0] - first[0], last[1] - first[1])
  );
  const left: number[][] = [],
    right: number[][] = [];
  points.forEach((p, i) => {
    const before = item(points, Math.max(0, i - 1)),
      after = item(points, Math.min(points.length - 1, i + 1));
    const dx = after[0] - before[0],
      dy = after[1] - before[1],
      length = Math.max(0.0001, Math.hypot(dx, dy));
    const progress = Math.min(
      1,
      Math.hypot(p[0] - first[0], p[1] - first[1]) / extent
    );
    const half = 1 - 0.8 * progress;
    left.push([p[0] - (dy / length) * half, p[1] + (dx / length) * half]);
    right.push([p[0] + (dy / length) * half, p[1] - (dx / length) * half]);
  });
  return left.concat(right.reverse());
}
