import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export const alt = "About Acme";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  // Font loading, process.cwd() is Next.js project directory
  const pretendard = await readFile(
    join(process.cwd(), "lib/fonts/pretendard/Pretendard-SemiBold.otf")
  );

  const imageBuffer = await readFile(join(process.cwd(), "public", "man.png"));
  const imageBase64 = `data:image/png;base64,${imageBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          background: "white",
          color: "#ff6467",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <div style={{ fontSize: 96 }}>行法</div>
        <img src={imageBase64} height={320} width={320} alt="man" />
        <div style={{ fontSize: 48 }}>보안과 개발 중심의 블로그</div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Pretendard",
          data: pretendard,
          style: "normal",
          weight: 600,
        },
      ],
    }
  );
}
