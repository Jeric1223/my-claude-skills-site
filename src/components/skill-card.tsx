import Link from "next/link";
import type { Plugin } from "@/lib/skills";

export function SkillCard({ plugin, marketplace }: { plugin: Plugin; marketplace: string }) {
  return (
    <Link
      href={`/skills/${plugin.name}`}
      className="group flex flex-col rounded-[var(--radius-card)] border border-border bg-surface p-6 transition-colors hover:border-accent"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-sans text-lg font-semibold tracking-tight text-foreground">
          {plugin.name}
        </h3>
        <span className="label shrink-0">v{plugin.version}</span>
      </div>

      <p className="mt-3 flex-1 text-[15px] leading-7 text-muted">{plugin.description}</p>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
        <code className="font-mono text-xs text-muted">
          {plugin.name}@{marketplace}
        </code>
        <span className="label group-hover:text-accent">자세히 →</span>
      </div>
    </Link>
  );
}
