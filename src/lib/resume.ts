import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { profile } from "@/data/profile";

/** True when the resume PDF has been placed in /public. Evaluated at build/render time. */
export function isResumeAvailable(): boolean {
  try {
    return existsSync(path.join(process.cwd(), "public", profile.resumePath));
  } catch {
    return false;
  }
}
