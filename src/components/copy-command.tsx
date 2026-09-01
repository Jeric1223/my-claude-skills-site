"use client";

import { useState } from "react";

export function CopyCommand({ command, label }: { command: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {}
  }

  return (
    <div className="w-full">
      {label && <p className="label mb-2">{label}</p>}
      <button
        onClick={copy}
        className="group flex w-full items-center justify-between gap-4 rounded-[var(--radius-card)] border border-border bg-surface px-4 py-3 text-left transition-colors hover:border-accent"
      >
        <code className="truncate font-mono text-sm text-foreground">{command}</code>
        <span className="label shrink-0 group-hover:text-accent">
          {copied ? "복사됨" : "복사"}
        </span>
      </button>
    </div>
  );
}
