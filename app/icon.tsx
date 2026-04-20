import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          borderRadius: 6,
        }}
      >
        <span
          style={{
            color: "#00E87A",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "monospace",
            letterSpacing: -0.5,
          }}
        >
          WH
        </span>
      </div>
    ),
    { ...size }
  );
}
