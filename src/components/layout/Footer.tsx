import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-5 py-8 font-mono text-xs text-subtle sm:flex-row sm:items-center sm:px-8">
        <p>© {new Date().getFullYear()} {profile.name}</p>
        <p>Built with Next.js, TypeScript and Tailwind CSS</p>
      </div>
    </footer>
  );
}
