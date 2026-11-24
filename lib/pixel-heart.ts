// Hand-drawn 16 x 16 heart. R = body, W = the small reflection.
export const HEART_PIXELS = [
  "................",
  "...RRR....RRR...",
  "..RRRRR..RRRRR..",
  ".RRRWRRRRRRRRRR.",
  ".RRWWRRRRRRRRRR.",
  ".RRWRRRRRRRRRRR.",
  ".RRWRRRRRRRRRRR.",
  ".RRRRRRRRRRRRRR.",
  "..RRRRRRRRRRRR..",
  "...RRRRRRRRRR...",
  "....RRRRRRRR....",
  ".....RRRRRR.....",
  "......RRRR......",
  ".......RR.......",
  "................",
  "................",
] as const;

// Continuous silhouettes: no internal rectangle edges to show through when rotated.
export const HEART_PATH = "M3 1H6V2H7V3H9V2H10V1H13V2H14V3H15V8H14V9H13V10H12V11H11V12H10V13H9V14H7V13H6V12H5V11H4V10H3V9H2V8H1V3H2V2H3Z";
export const HEART_HIGHLIGHT_PATH = "M4 3H5V5H4V7H3V4H4Z";

export const HEART_COLOR_TOKENS = ["--custom-300", "--custom-100", "--custom-400"] as const;

export function heartColor(index: number, highlight: boolean, palette: readonly string[]) {
  const colorIndex = index % palette.length;
  return palette[highlight ? (colorIndex === 2 ? 0 : 2) : colorIndex];
}

export const HEART_RUNS = HEART_PIXELS.flatMap((row, y) => {
  const runs: { x: number; y: number; width: number; highlight: boolean }[] = [];
  for (let x = 0; x < row.length;) {
    const pixel = row[x];
    const start = x++;
    while (x < row.length && row[x] === pixel) x++;
    if (pixel === "R" || pixel === "W") {
      runs.push({ x: start, y, width: x - start, highlight: pixel === "W" });
    }
  }
  return runs;
});
