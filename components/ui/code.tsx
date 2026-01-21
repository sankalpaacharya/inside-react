"use client";

import { HighlightedCode, Pre } from "codehike/code";
import { CodeWindow } from "./code-window";

export function Code({ codeblock }: { codeblock: HighlightedCode }) {
  return (
    <CodeWindow>
      <div className="overflow-x-auto p-4">
        <Pre
          code={codeblock}
          className="text-sm"
          style={{
            ...codeblock.style,
            background: "transparent",
          }}
        />
      </div>
    </CodeWindow>
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
