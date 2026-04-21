import { ImageResponse } from "next/og";

export const size = { width: 192, height: 192 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0A0A0A",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: "#00E87A",
            fontSize: 80,
            fontWeight: 700,
            fontFamily: "monospace",
            letterSpacing: -2,
          }}
        >
          WH
        </span>
      </div>
    ),
    { ...size }
  );
}
