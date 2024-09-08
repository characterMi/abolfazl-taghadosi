export function wait(ms: number) {
  return new Promise((res) => setTimeout(res, ms));
}

export const lerp = (x: number, y: number, t: number) => x * (1 - t) + y * t;
