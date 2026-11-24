export const PIZZA_COLOR_TOKENS = ["--custom-300", "--custom-100", "--custom-400"] as const;

// The curved crust and pointed tip, in the original SVG's 24 x 24 viewBox.
// Include the stroke so slices meet at their visible edges.
export const PIZZA_OUTLINE = [
  { x: 1, y: 16 },
  { x: 2, y: 12 },
  { x: 5, y: 7 },
  { x: 7, y: 5 },
  { x: 12, y: 2 },
  { x: 16, y: 1 },
  { x: 18, y: 3 },
  { x: 23, y: 21 },
  { x: 21, y: 23 },
  { x: 3, y: 18 },
];

export function paintPizza(svg: string, index: number, palette: readonly string[]) {
  return svg.replace(/currentColor/g, palette[index % palette.length]);
}

export function pizzaTextures(svg: string, palette: readonly string[]) {
  return palette.map((_, index) => {
    const texture = paintPizza(svg, index, palette)
      .replace(/width="24"/, 'width="128"')
      .replace(/height="24"/, 'height="128"');
    return `data:image/svg+xml,${encodeURIComponent(texture)}`;
  });
}
