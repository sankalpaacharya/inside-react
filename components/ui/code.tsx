"use client";

import { HighlightedCode, Pre } from "codehike/code";
import { CopyButton } from "./copy-button";

export function Code({ codeblock }: { codeblock: HighlightedCode }) {
  return (
    <div className="relative my-6 rounded-xl border border-border bg-zinc-950 overflow-hidden shadow-lg">
      {/* Header with filename and copy button */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-zinc-900/50">
        <span className="text-sm text-muted-foreground font-mono">
          {codeblock.meta || codeblock.lang}
        </span>
        <CopyButton text={codeblock.value} />
      </div>

      {/* Code content */}
      <div className="overflow-x-auto">
        <Pre
          code={codeblock}
          className="p-4 text-sm leading-relaxed"
          style={codeblock.style}
        />
      </div>
    </div>
  );
}

// Simple inline code block without header
export function InlineCode({ codeblock }: { codeblock: HighlightedCode }) {
  return (
    <Pre
      code={codeblock}
      className="inline px-1.5 py-0.5 rounded-md bg-zinc-800 text-sm"
      style={codeblock.style}
    />
  );
}
