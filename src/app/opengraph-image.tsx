import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} – ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#0a0b0d", color: "#e8eaed" }}>
        <div style={{ fontSize: 26, color: "#4ade9f", display: "flex" }}>~/manideep $ cat role.txt</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 28, display: "flex" }}>{profile.name}</div>
        <div style={{ fontSize: 42, color: "#4ade9f", marginTop: 12, display: "flex" }}>{profile.title}</div>
        <div style={{ fontSize: 28, color: "#9aa3ad", marginTop: 36, maxWidth: 900, display: "flex" }}>{profile.tagline}</div>
      </div>
    ),
    size,
  );
}
