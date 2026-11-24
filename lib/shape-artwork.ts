export const SHAPE_COLOR_TOKENS = ["--custom-300", "--custom-100", "--custom-400"] as const;

// Lightweight collision outlines, including strokes, in each SVG's 24 x 24 viewBox.
export const SHAPE_ARTWORKS = [
  {
    id: "bird",
    outline: [
      { x: 1, y: 20 }, { x: 12, y: 4 }, { x: 14, y: 2 },
      { x: 18, y: 2 }, { x: 21, y: 5 }, { x: 23, y: 7.5 },
      { x: 21, y: 11 }, { x: 18, y: 17 }, { x: 15, y: 22 }, { x: 9, y: 22 },
    ],
  },
  {
    id: "flower",
    outline: [
      { x: 4, y: 2 }, { x: 20, y: 2 }, { x: 22, y: 4 }, { x: 22, y: 20 },
      { x: 20, y: 22 }, { x: 4, y: 22 }, { x: 2, y: 20 }, { x: 2, y: 4 },
    ],
  },
  {
    id: "sparkle",
    outline: [{ x: 12, y: 1 }, { x: 23, y: 12 }, { x: 12, y: 23 }, { x: 1, y: 12 }],
  },
] as const;

export type ShapeArtwork = { id: typeof SHAPE_ARTWORKS[number]["id"]; svg: string };
export type ShapeTexture = {
  id: ShapeArtwork["id"];
  texture: string;
  outline: readonly { x: number; y: number }[];
};

export function paintArtwork(svg: string, color: string) {
  return svg.replace(/currentColor/g, color);
}

export function artworkTextures(artworks: readonly ShapeArtwork[], palette: readonly string[]): ShapeTexture[] {
  return palette.flatMap((color) => artworks.map(({ id, svg }) => {
    const texture = paintArtwork(svg, color)
      .replace(/width="24"/, 'width="128"')
      .replace(/height="24"/, 'height="128"');
    return {
      id,
      texture: `data:image/svg+xml,${encodeURIComponent(texture)}`,
      outline: SHAPE_ARTWORKS.find((artwork) => artwork.id === id)!.outline,
    };
  }));
}
